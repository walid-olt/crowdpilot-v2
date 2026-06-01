import { z } from "zod";

export const loginBodySchema = z
  .object({
    email: z
      .string()
      .trim()
      .toLowerCase()
      .pipe(z.string().email("Invalid email address")),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128),
  })
  .strict();
export type userLoginData = z.infer<typeof loginBodySchema>;
