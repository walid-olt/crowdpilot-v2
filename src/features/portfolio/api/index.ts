import { apiClient } from "@/api/client";
import { AxiosError } from "axios";
import type { InvestorPortfolioResponse } from "@/types/api";

export const getInvestorPortfolio = async () => {
  try {
    const { data } =
      await apiClient<InvestorPortfolioResponse>("/portfolio/me");
    return data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new Error(e.response?.data.message, {
        cause: e,
        ...e.response?.data,
      });
    } else {
      throw e;
    }
  }
};
