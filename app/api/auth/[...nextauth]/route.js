// app/api/auth/[...nextauth].js
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

     // ¿Este correo tiene derecho a trial?
     const giveTrial = isAllowedForTrial(user.email);

      // —––– FLUJO “Credentials” –––—
      if (account.provider === "credentials") {
        // Si no está activo, creamos sesión de Checkout con trial si aplica
        if (!dbUser?.subscriptionActive) {
         const checkout = await stripe.checkout.sessions.create({
           mode: "subscription",
           payment_method_types: ["card"],
           line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
           customer_email: user.email,
           subscription_data: {
             ...(giveTrial ? { trial_period_days: 90 } : {}),
           },
           success_url: `${process.env.NEXTAUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
           cancel_url: process.env.NEXTAUTH_URL,
         });
         return checkout.url; // NextAuth redirige a Stripe Checkout
        }
        return true;
      }

      // —––– FLUJO “Google” –––—
      if (account.provider === "google") {
        // Si ya pagó / está en trial activo, lo dejamos pasar
        if (dbUser?.subscriptionActive) return true;

       const checkout = await stripe.checkout.sessions.create({
         mode: "subscription",
         payment_method_types: ["card"],
         line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
         customer_email: user.email,
         subscription_data: {
           ...(giveTrial ? { trial_period_days: 90 } : {}),
         },
         success_url: `${process.env.NEXTAUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
         cancel_url: process.env.NEXTAUTH_URL,
       });
       return checkout.url;
      }

      return true;
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
