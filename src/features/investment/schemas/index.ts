import type { Project } from "@/types/api";
import z from "zod";

// generate dynamic schema
export const createInvestmentSchema = (project: Project) => {
  const maxInvestAmount = getMaximumAllowedInvestment(project);
  const schema = z.object({
    amount: z
      .number({ coerce: true })
      .nonnegative("Amount must be positive")
      .min(1, "Amount can't be less than 1")
      .max(maxInvestAmount, "Amount exceeds the maximum allowed investment  "),
  });
  return schema;
};

export const getMaximumAllowedInvestment = (project: Project) => {
  const { maxInvestmentPercentage, currentCapital, targetCapital } = project;

  const remaining = Math.max(0, targetCapital - currentCapital);
  const maxAllowed = Math.floor(
    targetCapital * (maxInvestmentPercentage / 100),
  );

  return Math.min(maxAllowed, remaining);
};
