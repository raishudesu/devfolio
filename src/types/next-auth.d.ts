import NextAuth from "next-auth";
import type { User as UserPrisma } from "@prisma/client";
declare module "next-auth" {
  // just extend the User's type from Prisma lol xd
  interface User extends UserPrisma {
    error: string | null;
  }

  interface Session {
    user: User;
    token: User;
  }
}
