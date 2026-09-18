import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { logger } from "@/lib/monitoring/logger";

/**
 * NextAuth.js configuration for Zerobet.
 *
 * Providers:
 * 1. Google OAuth — primary, frictionless sign-in
 * 2. Credentials — email + password fallback (bcrypt hashed)
 *
 * Session strategy: JWT (stateless, 30-day expiry)
 */
export const authOptions: NextAuthOptions = {
  providers: [
    // ---- Google OAuth (primary) ----
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),

    // ---- Credentials (email + password) ----
    CredentialsProvider({
      name: "Zerobet",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const email = credentials.email.trim().toLowerCase().slice(0, 255);
        const password = credentials.password.slice(0, 500);

        try {
          // Look up user by email
          const user = await db.user.findUnique({
            where: { email },
          });

          if (!user || !user.passwordHash) {
            // User doesn't exist or hasn't set a password — reject
            // (sign-up is handled via a dedicated flow, not auto-create)
            return null;
          }

          // Verify password
          const valid = await bcrypt.compare(password, user.passwordHash);
          if (!valid) return null;

          logger.info("User signed in (credentials)", { userId: user.id });
          return {
            id: user.id,
            email: user.email ?? undefined,
            name: user.name ?? undefined,
          };
        } catch (error) {
          logger.error("Auth error (credentials)", error, { email });
          return null;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  callbacks: {
    // ---- JWT callback: store userId in token ----
    async jwt({ token, user, account }) {
      // On first sign-in (user is defined), store the userId
      if (user) {
        token.userId = user.id;
      }

      // If Google OAuth, link or create user in DB
      if (account?.provider === "google" && user?.email) {
        try {
          const existing = await db.user.findUnique({
            where: { email: user.email },
          });

          if (existing) {
            // User already exists — use their DB id
            token.userId = existing.id;
          } else {
            // Create new user from Google profile
            const newUser = await db.user.create({
              data: {
                email: user.email,
                name: user.name || user.email.split("@")[0],
                // No passwordHash — they signed in with Google
              },
            });
            token.userId = newUser.id;
            logger.info("User created (Google OAuth)", { userId: newUser.id });
          }
        } catch (error) {
          logger.error("Google OAuth user creation error", error, { email: user.email });
        }
      }

      return token;
    },

    // ---- Session callback: expose userId to client ----
    async session({ session, token }) {
      if (session.user && token.userId) {
        (session.user as { id?: string }).id = token.userId as string;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
