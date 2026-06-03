import { apiClient } from "@/api/client";
import { AxiosError } from "axios";
import type { UpdateBalanceResponse, BalanceOperation } from "@/types/api";

export const updateUserWallet = async (
  userId: string,
  payload: { amount: number; operation: BalanceOperation },
) => {
  try {
    const { data } = await apiClient.post<UpdateBalanceResponse>(
      `/users/${userId}/balance`,
      payload,
    );
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
