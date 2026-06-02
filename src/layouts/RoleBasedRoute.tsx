import { useUserRole } from "@/features/auth/hooks";
import type { Role } from "@/types/api";
import { Navigate, Outlet } from "react-router-dom";
type Props = {
  allowedRoles: Role[];
};

function RoleBasedRoute({ allowedRoles }: Props) {
  const userRole = useUserRole();
  if (allowedRoles.includes(userRole)) {
    return <Outlet />;
  } else {
    return <Navigate to={"/unauthorized"} replace />;
  }
}

export default RoleBasedRoute;
