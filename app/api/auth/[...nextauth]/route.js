// File: app/api/auth/[...nextauth]/route.js

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import Stripe from "stripe";

import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/user";

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
    // Al hacer signIn con Google, si no ha pagado lanza Checkout
    async signIn({ user, account }) {
      if (account.provider !== "google") return true;

      await connectMongoDB();
      const dbUser = await User.findOne({ email: user.email });
      // Si ya pagó, pasa
      if (dbUser?.subscriptionActive) return true;

      // Si no, crea sesión de Checkout
      const checkout = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
        customer_email: user.email,
        success_url: `${process.env.NEXTAUTH_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: process.env.NEXTAUTH_URL,
      });
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
    error: "/Login?error=NEED_PAYMENT",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
