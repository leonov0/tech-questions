import { auth } from "@/auth";
import { Header } from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CompleteProfileForm } from "@/features/complete-profile/complete-profile-form";

export default async function CompleteProfile() {
  const session = await auth();

  if (!session || !session.user.username) {
    throw new Error("Not authenticated");
  }

  return (
    <div className="grid min-h-screen grid-rows-[auto,_1fr,_auto]">
      <Header />

      <main className="container max-w-screen-sm py-16">
        <Card>
          <CardHeader>
            <CardTitle>Complete your profile</CardTitle>

            <CardDescription>
              Please fill out the following information to complete your
              profile.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <CompleteProfileForm username={session.user.username} />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
