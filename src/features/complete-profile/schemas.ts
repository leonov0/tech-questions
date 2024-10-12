import { z } from "zod";

export const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be 3 characters or more")
    .max(32, "Username must be 32 characters or less")
    .regex(/^[a-z0-9_]+$/, "Username must be lowercase alphanumeric"),
});

export type FormValues = z.infer<typeof formSchema>;
