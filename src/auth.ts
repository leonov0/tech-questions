import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextResponse } from "next/server";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { db } from "@/db/db";

const publicPathnames = ["/", "/terms", "/privacy"];

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

      if (!publicPathnames.includes(pathname) && !auth) {
        return false;
      }

      return true;
    },
  },
});
