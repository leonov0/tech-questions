import { type ClassValue, clsx } from "clsx";
import { eq } from "drizzle-orm";
import { twMerge } from "tailwind-merge";

import { db } from "@/db/db";
import { User, users } from "@/db/schema";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getRole(
  userId: typeof User.id,
): Promise<typeof User.role> {
  const result = await db
    .select({ role: users.role })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (result.length === 0) {
    throw new Error(`User with ID ${userId} not found`);
  }

  return result[0].role;
}
