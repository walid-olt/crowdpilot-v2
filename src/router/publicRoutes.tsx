import type { RouteObject } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout.tsx";
import LoginPage from "@/features/auth/Login.page";
import RegisterPage from "@/features/auth/Register.page";
import HomePage from "@/features/home/Home.page";
import { publicLoader } from "./loaders.ts";

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout />,
    loader: publicLoader,
    // no point in lazy loading public pages since they are small and fast to load
    children: [
      {
        path: "/",
        element: <HomePage />,
        index: true,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
];
