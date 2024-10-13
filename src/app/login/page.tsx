import Link from "next/link";

import { Header } from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LoginForm } from "@/features/login/login-form";

export default function Login({
  searchParams,
}: {
  searchParams: { callbackUrl: string | undefined };
}) {
  return (
    <div className="grid min-h-screen grid-rows-[auto,_1fr,_auto]">
      <Header />

      <main className="container max-w-screen-sm py-16">
        <Card>
          <CardHeader>
            <CardTitle>Sign in to your account</CardTitle>

            <CardDescription>
              Sign in with your Google or GitHub account to continue.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <LoginForm
              callbackUrl={searchParams.callbackUrl}
              className="mx-auto grid gap-4 sm:grid-cols-2"
            />
          </CardContent>

          <CardFooter>
            <p className="w-full text-center text-sm text-muted-foreground">
              By signing in, you agree to our{" "}
              <Link
                href="/terms"
                className="font-medium underline-offset-4 hover:underline"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="font-medium underline-offset-4 hover:underline"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
