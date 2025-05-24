import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider      from "next-auth/providers/google";
import bcrypt              from "bcryptjs";
import Stripe              from "stripe";

import { connectMongoDB } from "@/lib/mongodb";
import User               from "@/models/user";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion:"2023-10-16" });

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        await connectMongoDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        // Si no ha pagado, bloquea el acceso
        if (!user.subscriptionActive) {
          throw new Error("NEED_PAYMENT");
        }

        const match = await bcrypt.compare(credentials.password, user.password);
        if (!match) return null;

        return {
          email: user.email,
          name:  user.name,
          roles: user.roles,
        };
      },
    }),

    GoogleProvider({
      clientId:     process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: { params: { prompt: "select_account" } },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    /** 1) Intercepta Google: si ya existe y pagó, deja pasar;
     *   si existe y no pagó, redirige a Stripe; si no existe, 
     *   crea registro tras el pago en el webhook. */
    async signIn({ user, account }) {
      if (account.provider !== "google") 
        return true;

      await connectMongoDB();
      const dbUser = await User.findOne({ email: user.email });

      if (dbUser?.subscriptionActive) {
        // Ya pagó → deja pasar
        return true;
      }

      // Nunca estuvo en tu BD o no ha pagado → crea Checkout Session
      const checkout = await stripe.checkout.sessions.create({
        mode:          "subscription",
        line_items:    [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
        customer_email:user.email,
        success_url:   `${process.env.NEXTAUTH_URL}/payment/success`,
        cancel_url:    process.env.NEXTAUTH_URL,
      });

      // NextAuth redirige automáticamente a checkout.url
      return checkout.url;
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
    error:  "/Login?error=NEED_PAYMENT",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
