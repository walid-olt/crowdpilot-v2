import type { RouteObject } from "react-router-dom";
import Notfound from "@/components/Notfound";
import Unauthorized from "@/components/Unautorized.tsx";

export const miscRoutes: RouteObject[] = [
  {
    path: "*",
    element: <Notfound />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
];
