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
        // Conecta a MongoDB
        await connectMongoDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) return null;

        // Si es usuario Google, comprueba que haya pagado
        if (user.provider === "google" && !user.subscriptionActive) {
          throw new Error("NEED_PAYMENT");
        }

        // Si es credencial normal, valida la contraseña
        if (user.provider === "credentials") {
          const match = await bcrypt.compare(credentials.password, user.password);
          if (!match) return null;
        }

        // Devuelve los datos necesarios para el token
        return {
          email: user.email,
          name: user.name,
          roles: user.roles,
        };
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
    // Intercepta el login de Google para lanzar Stripe Checkout si hace falta
    async signIn({ user, account }) {
      if (account.provider !== "google") {
        return true;
      }

      // Conecta a MongoDB y comprueba si ya existe y pagó
      await connectMongoDB();
      const dbUser = await User.findOne({ email: user.email });
      if (dbUser?.subscriptionActive) {
        return true;
      }

      // Si no pagó aún, inicia Checkout
      const checkout = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: process.env.STRIPE_PRICE_ID, quantity: 1 }],
        customer_email: user.email,
        success_url: `${process.env.NEXTAUTH_URL}/payment/success`,
        cancel_url: process.env.NEXTAUTH_URL,
      });
      // NextAuth redirige automáticamente a checkout.url
      return checkout.url;
    },

    // Adjunta user al JWT
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },

    // Adjunta toda la info del user a la sesión
    async session({ session, token }) {
      await connectMongoDB();
      const dbUser = await User.findOne({ email: token.user.email });
      if (dbUser) session.user = dbUser;
      return session;
    },
  },

  // Páginas personalizadas
  pages: {
    signIn: "/",
    error: "/Login?error=NEED_PAYMENT",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
