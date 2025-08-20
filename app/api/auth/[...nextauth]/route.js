import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import Stripe from "stripe";

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";
import { isAllowedForTrial } from "@/lib/allowedTrials";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",
});

const TRIAL_DAYS = Number(process.env.TRIAL_DAYS || 30);

// Helpers locales
async function getOrCreateCustomerByEmail(email, metadata = {}) {
  const list = await stripe.customers.list({ email, limit: 1 });
  if (list.data.length > 0) return list.data[0];
  return await stripe.customers.create({ email, metadata });
}

async function hasActiveOrTrialingSubscription(customerId) {
  const subs = await stripe.subscriptions.list({
    customer: customerId,
    status: "all",
    limit: 10,
  });
  return subs.data.some((s) =>
    ["trialing", "active", "past_due", "unpaid"].includes(s.status)
  );
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        await connectMongoDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        // Si vino por Google y no ha pagado, bloquea
        if (user.provider === "google" && !user.subscriptionActive) {
          throw new Error("NEED_PAYMENT");
        }
        // Si vino por credentials, valida contraseña
        if (user.provider === "credentials") {
          const match = await bcrypt.compare(credentials.password, user.password);
          if (!match) return null;
        }
        return { email: user.email, name: user.name, roles: user.roles };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: { params: { prompt: "select_account" } },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async signIn({ user, account }) {
      await connectMongoDB();
      const dbUser = await User.findOne({ email: user.email });

      // ¿Tiene derecho a trial?
      const giveTrial = isAllowedForTrial(user.email);
      const trialDays = giveTrial ? TRIAL_DAYS : 0;

      // Obtener/crear Customer en Stripe
      const customer = await getOrCreateCustomerByEmail(user.email, {
        appUserId: dbUser?._id?.toString() || "",
      });

      // Guardar customerId si no lo teníamos
      if (dbUser && !dbUser.stripeCustomerId) {
        dbUser.stripeCustomerId = customer.id;
        await dbUser.save();
      }

      // Si ya tiene subscripción válida, no lo envíes a Checkout
      const alreadySubbed = await hasActiveOrTrialingSubscription(customer.id);
      if (alreadySubbed || dbUser?.subscriptionActive) {
        return true;
      }

      // —––– FLUJO “Credentials” y “Google” (unificado): crear Checkout SOLO si hace falta –––—
      const checkout = await stripe.checkout.sessions.create({
        mode: "subscription",
        customer: customer.id, // evita duplicados vs customer_email
        payment_method_types: ["card"],
        line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
        subscription_data: {
          ...(trialDays > 0 ? { trial_period_days: trialDays } : {}),
        },
        success_url: `${process.env.NEXTAUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: process.env.NEXTAUTH_URL,
        metadata: {
          provider: account.provider, // "credentials" | "google"
          email: user.email,
          roles: dbUser?.roles || "user",
          imageUrl: dbUser?.imageUrl || "",
          name: dbUser?.name || user.name || "",
          lastname: dbUser?.lastname || "",
          cedula: dbUser?.cedula || "",
          especialidad: dbUser?.especialidad || "",
        },
        // allow_promotion_codes: true, // opcional
      });

      return checkout.url; // NextAuth redirige a Stripe Checkout
    },

    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },

    async session({ session, token }) {
      await connectMongoDB();
      const dbUser = await User.findOne({ email: token.user.email });
      if (dbUser) session.user = dbUser;
      return session;
    },
  },

  pages: {
    signIn: "/",
    error: "/Login?error=NEED_PAYMENT",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
