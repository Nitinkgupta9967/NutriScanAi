import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db";
import User from "@/models/User";

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

async function ensureUserRecord({ name, email }) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return null;
  }

  await connectDB();

  return User.findOneAndUpdate(
    { email: normalizedEmail },
    {
      $setOnInsert: {
        name: name?.trim() || normalizedEmail.split("@")[0],
        email: normalizedEmail,
        password: "",
      },
    },
    {
      new: true,
      upsert: true,
    }
  );
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const normalizedEmail = normalizeEmail(credentials?.email);
        const password = String(credentials?.password || "");

        if (!normalizedEmail || !password) {
          throw new Error("Email and password are required.");
        }

        await connectDB();

        const user = await User.findOne({ email: normalizedEmail });
        if (!user || !user.password) {
          throw new Error("No user found");
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: String(user._id),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user?.email) {
        return false;
      }

      if (account?.provider !== "credentials") {
        const dbUser = await ensureUserRecord({
          name: user.name,
          email: user.email,
        });

        if (!dbUser) {
          return false;
        }

        user.id = String(dbUser._id);
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user?.id) {
        token.userId = String(user.id);
      }

      if (!token.userId && token.email) {
        const dbUser = await ensureUserRecord({
          name: token.name,
          email: token.email,
        });

        if (dbUser) {
          token.userId = String(dbUser._id);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user && token.userId) {
        session.user.id = token.userId;
      }

      return session;
    },
  },
};
