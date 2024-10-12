import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { db } from "@/db/db";
import {
  generateUsernameFromEmail,
  getUser,
  updateUser,
} from "@/features/users/service";

const privateRoutes = ["/complete-profile"];

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [GitHub, Google],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/complete-profile",
  },
  callbacks: {
    async authorized({ auth, request }) {
      if (request.nextUrl.pathname === "/login" && auth) {
        const url = new URL("/", request.nextUrl.origin).toString();

        return NextResponse.redirect(url);
      }

      if (privateRoutes.includes(request.nextUrl.pathname) && !auth) {
        return false;
      }

      return true;
    },
    async jwt({ token, user, trigger }) {
      if (trigger === "signUp") {
        const username = await generateUsernameFromEmail(user.email!);

        await updateUser(user.id!, { username });
      }

      if (user) {
        const { role, username } = await getUser(user.id!);

        token.role = role;
        token.username = username;
      }

      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;
      session.user.username = token.username;

      return session;
    },
  },
});
