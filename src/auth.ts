import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { db } from "@/db/db";
import { getRole } from "@/lib/user-service";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [GitHub, Google],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async authorized({ auth, request }) {
      const pathname = request.nextUrl.pathname;

      if (pathname === "/login") {
        if (auth) {
          const url = new URL("/", request.nextUrl.origin).toString();

          return NextResponse.redirect(url);
        }

        return true;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = await getRole(user.id!);
      }

      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;

      return session;
    },
  },
});
