import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "@/layouts/AuthLayout.tsx";
import Dashboard from "@/features/dashboard/Dashboard.tsx";
import PublicLayout from "@/layouts/PublicLayout.tsx";
import LoginPage from "@/features/auth/Login.page";
import RegisterPage from "@/features/auth/Register.page";
import HomePage from "@/features/home/Home.page";
import ProjectsPage from "@/features/projects/pages/Projects.page.tsx";

import ProjectDetailsPage from "@/features/projects/pages/Project-details.page.tsx";
import Notfound from "@/components/Notfound";
import { publicLoader, authLoader } from "./loaders.ts";
import ProjectCreatePage from "@/features/projects/pages/Project-create.page.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    loader: publicLoader,
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
  {
    path: "/app",
    element: <AuthLayout />,
    loader: authLoader,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "projects",
        element: <ProjectsPage />,
      },
      {
        path: "projects/:id",
        element: <ProjectDetailsPage />,
      },
      { path: "projects/create", element: <ProjectCreatePage /> },
    ],
  },
  {
    path: "*",
    element: <Notfound />,
  },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
