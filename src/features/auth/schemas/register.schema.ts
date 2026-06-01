import { z } from "zod";
export const userRoleSchema = z.enum(["OWNER", "INVESTOR"]).default("OWNER");
const finiteNumberMessage = "Value must be a finite number";

export const userRegisterSchema = z
  .object({
    name: z.string().trim().min(6, "Name is required").max(100),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .pipe(z.string().email("Invalid email address")),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128),
    role: userRoleSchema,
    balance: z
      .number()
      .nonnegative()
      .refine(Number.isFinite, { message: finiteNumberMessage })
      .optional()
      .default(10_000), // just for testing purposes, in production this should be handled differently
  })
  .strict();

export type userRegisterData = z.infer<typeof userRegisterSchema>;
