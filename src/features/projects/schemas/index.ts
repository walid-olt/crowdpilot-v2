import { z } from "zod";

const baseProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(64, "Title must be 64 characters or less"),
  description: z
    .string()
    .trim()
    .min(1, "Description is required")
    .max(254, "Description must be 254 characters or less"),
  targetCapital: z
    .number({
      coerce: true,
      invalid_type_error: "Target capital must be a valid number",
    })
    .positive("Target capital must be greater than 0")
    .finite()
    .min(200),
  ownerInvestment: z
    .number({
      coerce: true,
      invalid_type_error: "Owner investment must be a valid number",
    })
    .nonnegative("Investment cannot be negative")
    .finite(),
  maxInvestmentPercentage: z
    .number({
      coerce: true,
      invalid_type_error: "Percentage must be a valid number",
    })
    .min(0.01, "Percentage must be at least 0.01")
    .max(50, "One investor cannot invest more than 50% of the project")
    .finite(),
});

export const projectCreateSchema = baseProjectSchema.refine(
  (data) => data.ownerInvestment < data.targetCapital,
  {
    message: "Owner investment must be less than the target capital",
    path: ["ownerInvestment"],
  },
);

export type ProjectData = z.infer<typeof projectCreateSchema>;

export const projectUpdateSchema = baseProjectSchema
  .extend({
    status: z.enum(["OPEN", "CLOSED"]).optional().default("OPEN"),
  })
  .partial()
  .refine(
    (data) => {
      if (
        data.ownerInvestment !== undefined &&
        data.targetCapital !== undefined
      ) {
        return data.ownerInvestment < data.targetCapital;
      }
      return true;
    },
    {
      message: "Owner investment must be less than the target capital",
      path: ["ownerInvestment"],
    },
  );
export type UpdatedProject = z.infer<typeof projectUpdateSchema>;
