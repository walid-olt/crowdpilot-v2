import { useUserRole } from "@/features/auth/hooks";
import { lazy } from "react";

const OwnerProjects = lazy(() => import("./OwnerProjects"));
const PublicProjects = lazy(() => import("./PublicProjects"));
export function Component() {
  const userRole = useUserRole();

  switch (userRole) {
    case "OWNER":
      return <OwnerProjects />;

    case "INVESTOR":
      return <PublicProjects />;

    default:
      // propably should never happen, but just in case, we can return null or a fallback UI
      return null;
  }
}
