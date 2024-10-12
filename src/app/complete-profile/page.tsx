import { auth } from "@/auth";
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
    <main className="container max-w-screen-sm py-16">
      <Card>
        <CardHeader>
          <CardTitle>Complete your profile</CardTitle>

          <CardDescription>
            Please fill out the following information to complete your profile.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <CompleteProfileForm username={session.user.username} />
        </CardContent>
      </Card>
    </main>
  );
}
