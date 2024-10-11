/* eslint-disable @typescript-eslint/no-unused-vars */

import NextAuth, { type DefaultSession } from "next-auth";

import type { User } from "@/db/schema";

declare module "next-auth" {
  interface Session {
    user: {
      role?: typeof User.role;
    } & DefaultSession["user"];
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    role?: typeof User.role;
  }
}
