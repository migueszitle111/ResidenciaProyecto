// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectMongoDB } from "@/lib/mongodb";
import { credentialsSchema, qrLoginCompleteSchema } from "@/lib/api/schemas";
import { isQrLoginExpired, safeCompareQrHash } from "@/lib/api/qr-login";
import WebQrLoginChallenge from "@/models/webQrLoginChallenge";
import User from "@/models/user";

function serializeAuthUser(user) {
  return {
    id: user._id.toString(),
    email: user.email,
    name: user.name,
    lastname: user.lastname,
    specialty: user.specialty,
    idprofessional: user.idprofessional,
    imageUrl: user.imageUrl || "",
    roles: user.roles || "user",
  };
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const rawEmail =
            typeof credentials?.email === "string" ? credentials.email.trim() : "";
          const rawPassword =
            typeof credentials?.password === "string" ? credentials.password : "";

          const parsedCredentials = credentialsSchema.safeParse(
            {
              email: rawEmail,
              password: rawPassword,
            }
          );

          if (!parsedCredentials.success) {
            return null;
          }

          const { email, password } = parsedCredentials.data;

          await connectMongoDB();

          const user = await User.findOne({ email });

          if (!user) return null;

          const match = await bcrypt.compare(password, user.password);

          if (!match) return null;

          return serializeAuthUser(user);
        } catch (err) {
          console.error("Error en authorize:", err);
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "qr-web",
      name: "QR Web",
      credentials: {},
      async authorize(credentials) {
        try {
          const parsedChallenge = qrLoginCompleteSchema.safeParse({
            challengeId:
              typeof credentials?.challengeId === "string"
                ? credentials.challengeId.trim()
                : "",
            browserCode:
              typeof credentials?.browserCode === "string"
                ? credentials.browserCode.trim()
                : "",
          });

          if (!parsedChallenge.success) {
            return null;
          }

          const { challengeId, browserCode } = parsedChallenge.data;

          await connectMongoDB();

          const challenge = await WebQrLoginChallenge.findOne({
            challengeId,
            status: "approved",
          });

          if (!challenge) {
            return null;
          }

          if (
            !safeCompareQrHash(browserCode, challenge.browserCodeHash) ||
            isQrLoginExpired(challenge.expiresAt)
          ) {
            return null;
          }

          const user =
            (challenge.approvedUserId
              ? await User.findById(challenge.approvedUserId)
              : null) ||
            (challenge.approvedEmail
              ? await User.findOne({ email: challenge.approvedEmail })
              : null);

          if (!user) {
            return null;
          }

          challenge.status = "consumed";
          challenge.consumedAt = new Date();
          await challenge.save();

          return { ...serializeAuthUser(user), qrChallengeId: challengeId };
        } catch (err) {
          console.error("Error en authorize qr-web:", err);
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 20 * 60, // 20 minutos máximo absoluto
  },

  // Sin maxAge en el cookie → session cookie que el navegador elimina al cerrar
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        // maxAge ausente = session cookie (se borra al cerrar el navegador)
      },
    },
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
        if (user.qrChallengeId) {
          token.qrChallengeId = user.qrChallengeId;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token.qrChallengeId) {
        session.qrChallengeId = token.qrChallengeId;
      }
      try {
        if (!token.user?.email) {
          return session;
        }

        await connectMongoDB();
        const dbUser = await User.findOne({ email: token.user?.email }).lean();
        if (dbUser) {
          session.user = {
            _id: dbUser._id.toString(),
            email: dbUser.email,
            name: dbUser.name,
            lastname: dbUser.lastname,
            specialty: dbUser.specialty,
            idprofessional: dbUser.idprofessional,
            imageUrl: dbUser.imageUrl || "",
            roles: dbUser.roles || "user",
            subscription: dbUser.subscription || null,
            termsAccepted: dbUser.termsAccepted,
            disclaimerAccepted: dbUser.disclaimerAccepted,
          };
          return session;
        }
      } catch (e) {
        console.error("Error en session callback:", e);
      }
      session.user = token.user || session.user;
      return session;
    },
  },

  pages: {
    signIn: "/Login",
    error: "/Login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
