import axios from "axios";
import { QueryClient } from "@tanstack/react-query";
import type { AppStore } from "@/store/store";
import { redirect } from "react-router-dom";
let store: AppStore | null = null;
// we don't want to import the store directly here because it would create a circular dependency
export function setStore(s: AppStore) {
  store = s;
}

export const apiClient = axios.create({
  baseURL: "/api",
  timeout: 10_000,
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  async (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (error.response?.status === 401) {
      const { logout } = await import("@/features/auth/authSlice");
      store?.dispatch(logout());
      redirect("/login?message=Session expired, please log in again");
    }
    return Promise.reject(error);
  },
);

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 3, throwOnError: true } },
});
