import { apiClient } from "./client.ts";
import type {
  RegisterSuccessResponse,
  AuthResponse,
  AuthMeResponse,
} from "@/types/api.ts";
import type { userRegisterData } from "@/features/auth/schemas/register.schema.ts";
import { isAxiosError } from "axios";
import type { userLoginData } from "@/features/auth/schemas/login.schema.ts";
export async function registerUser(payload: userRegisterData) {
  try {
    const { data } = await apiClient.post<RegisterSuccessResponse>(
      "/auth/register",
      payload,
    );

    return data;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data.message, {
        cause: e,
        ...e.response?.data,
      });
    } else {
      throw new Error(
        "An unkown error happended, check your internet and try again!",
        { cause: e },
      );
    }
  }
}

export async function loginUser(payload: userLoginData) {
  try {
    const { data } = await apiClient.post<AuthResponse>("/auth/login", payload);

    if (!data || !data.data) {
      throw new Error("Something went wrong");
    }
    const { token, user } = data.data;
    return { token, user }; // just for clarity
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data.message, {
        cause: e,
        ...e.response?.data,
      });
    } else {
      throw new Error(
        "An unkown error happended, check your internet and try again!",
        { cause: e },
      );
    }
  }
}

export async function getLogedInUser() {
  try {
    const { data } = await apiClient.get<AuthMeResponse>("/auth/me");
    if (!data || !data.data) {
      throw new Error("Something went wrong");
    }
    const { user } = data.data;
    return user;
  } catch (e) {
    if (isAxiosError(e)) {
      throw new Error(e.response?.data.message, {
        cause: e,
        ...e.response?.data,
      });
    } else {
      throw new Error(
        "An unkown error happended, check your internet and try again!",
        { cause: e },
      );
    }
  }
}
