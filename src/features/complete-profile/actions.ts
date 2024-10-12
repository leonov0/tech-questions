"use server";

import { auth } from "@/auth";
import { updateUser } from "@/features/users/service";

import type { FormValues } from "./schemas";

export async function completeProfile(
  data: FormValues,
): Promise<{ success: true } | { success: false; error: string }> {
  const session = await auth();

  if (!session) {
    return { success: false, error: "Not authorized" };
  }

  if (session.user.username === data.username) {
    return { success: true };
  }

  try {
    await updateUser(session.user.id!, data);
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "An unknown error occurred" };
  }
}
