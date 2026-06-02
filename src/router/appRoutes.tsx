import type { RouteObject } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import RoleBasedRoute from "@/layouts/RoleBasedRoute.tsx";
import Loading from "@/components/Loading.tsx";
import { authLoader } from "./loaders.ts";

export const appRoutes: RouteObject[] = [
  {
    path: "/app",
    element: <AuthLayout />,
    hydrateFallbackElement: <Loading />,
    loader: authLoader,
    children: [
      {
        index: true,
        path: "dashboard",
        lazy: () => import("@/features/dashboard/Dashboard.tsx"),
      },
      {
        path: "projects",
        lazy: () => import("@/features/projects/pages/Projects.tsx"),
      },
      {
        path: "projects/:id",
        lazy: () => import("@/features/projects/pages/ProjectDetails.tsx"),
      },
      {
        element: <RoleBasedRoute allowedRoles={["OWNER"]} />,
        children: [
          {
            path: "projects/create",
            lazy: () => import("@/features/projects/pages/ProjectCreate.tsx"),
          },
        ],
      },
      {
        element: <RoleBasedRoute allowedRoles={["INVESTOR"]} />,
        children: [
          {
            path: "wallet",
            lazy: () => import("@/features/wallet/Wallet.tsx"),
          },
          {
            path: "portfolio",
            lazy: () => import("@/features/portfolio/Portfolio.tsx"),
          },
          {
            path: "projects/:id/invest",
            lazy: () => import("@/features/investment/Investment.tsx"),
          },
        ],
      },
    ],
  },
];
