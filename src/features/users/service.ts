import { eq, isNotNull } from "drizzle-orm";

import { db } from "@/db/db";
import { type User, users } from "@/db/schema";

import { type UserUpdatePayload, userUpdatePayload } from "./schemas";

export async function getUser(userId: User["id"]) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (result.length === 0) {
    throw new Error(`User with ID ${userId} not found`);
  }

  return result[0];
}

export async function isUsernameTaken(username: string) {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.username, username))
    .limit(1);

  return result.length > 0;
}

export async function getTakenUsernames() {
  const result = await db
    .select({ username: users.username })
    .from(users)
    .where(isNotNull(users.username));

  return result.map((user) => user.username!);
}

export async function updateUser(
  userId: User["id"],
  payload: UserUpdatePayload,
) {
  const userData = await userUpdatePayload.parseAsync(payload);

  if (userData.username && (await isUsernameTaken(userData.username))) {
    throw new Error(`Username ${payload.username} is already taken`);
  }

  await db.update(users).set(userData).where(eq(users.id, userId));
}

export async function generateUsernameFromEmail(email: string) {
  let usernameBase = email
    .split("@")[0]
    .replace(/[^a-z0-9_]/g, "")
    .slice(0, 32);

  if (usernameBase.length < 3) {
    usernameBase += "user";
  }

  const takenUsernames = await getTakenUsernames();

  let username = usernameBase;

  while (takenUsernames.includes(username)) {
    username = usernameBase.slice(0, 28) + Math.floor(Math.random() * 10000);
  }

  return username;
}
