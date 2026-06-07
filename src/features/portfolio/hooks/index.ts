import { useSuspenseQuery } from "@tanstack/react-query";
import { getInvestorPortfolio } from "../api";

export function usePortfolioQuery() {
  return useSuspenseQuery({
    queryFn: () => getInvestorPortfolio(),
    queryKey: ["portfolio", "projects"],
  });
}
