import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "./db";
import { loginUser } from "@/services/user.service";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const existingUser = await loginUser(
            credentials.email,
            credentials.password
          );

          return {
            ...existingUser,
            error: null,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token, trigger, session }) => {
      if (user) {
        return {
          ...token,
          username: user.username,
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          imageLink: user.imageLink,
          bio: user.bio,
          links: user.links,
          isAvailableForWork: user.isAvailableForWork,
        };
      }

      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          firstName: token.firstName,
          lastName: token.lastName,
          username: token.username,
          id: token.id,
          imageLink: token.imageLink,
          bio: token.bio,
          links: token.links,
          isAvailableForWork: token.isAvailableForWork,
        },
      };
    },
  },
};
