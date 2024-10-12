import { eq } from "drizzle-orm";

import { db } from "@/db/db";
import { User, users } from "@/db/schema";

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
