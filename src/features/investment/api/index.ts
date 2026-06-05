import { apiClient } from "@/api/client";
import { isAxiosError } from "axios";
import type {
  InvestResponse,
  ErrorResponse,
  InvestRequestBody,
} from "@/types/api";

export const submitInvestment = async (
  projectId: string,
  payload: InvestRequestBody,
) => {
  try {
    const { data } = await apiClient.post<InvestResponse>(
      `/projects/${projectId}/invest`,
      payload,
    );
    return data;
  } catch (e) {
    if (isAxiosError<ErrorResponse>(e)) {
      throw new Error(e.response?.data.message, {
        cause: e,
        ...e.response?.data,
      });
    } else {
      throw e;
    }
  }
};
