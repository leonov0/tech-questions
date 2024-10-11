import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { signIn } from "@/auth";
import { GoogleLogoIcon } from "@/components/icons/google-logo-icon";
import { Button } from "@/components/ui/button";

export function LoginForm({
  callbackUrl,
  className,
}: {
  callbackUrl?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <form
        action={async () => {
          "use server";

          await signIn("github", {
            redirectTo: callbackUrl,
          });
        }}
      >
        <Button className="w-full">
          <GitHubLogoIcon />
          <span className="ml-2">GitHub</span>
        </Button>
      </form>

      <form
        action={async () => {
          "use server";

          await signIn("google", {
            redirectTo: callbackUrl,
          });
        }}
      >
        <Button className="w-full">
          <GoogleLogoIcon />
          <span className="ml-2">Google</span>
        </Button>
      </form>
    </div>
  );
}
