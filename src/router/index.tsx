import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { publicRoutes } from "./publicRoutes.tsx";
import { appRoutes } from "./appRoutes.tsx";
import { miscRoutes } from "./miscRoutes.tsx";

const router = createBrowserRouter([
  ...publicRoutes,
  ...appRoutes,
  ...miscRoutes,
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
