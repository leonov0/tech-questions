import { z } from "zod";

export const userUpdatePayload = z.object({
  name: z.string().min(3).max(32).optional(),
  image: z.string().optional(),
  role: z.enum(["user", "admin"]).optional(),
  username: z
    .string()
    .min(3, "Username must be 3 characters or more")
    .max(32, "Username must be 32 characters or less")
    .regex(/^[a-z0-9_]+$/, "Username must be lowercase alphanumeric")
    .optional(),
});

export type UserUpdatePayload = z.infer<typeof userUpdatePayload>;
