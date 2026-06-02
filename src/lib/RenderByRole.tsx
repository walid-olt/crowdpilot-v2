import React, { Suspense } from "react";
import { useAuth } from "@/features/auth/hooks";
import Loading from "@/components/Loading";
import type { Role } from "@/types/api";
import Unauthorized from "@/components/Unautorized";
import { Link } from "react-router-dom";
type Component = React.LazyExoticComponent<() => React.JSX.Element>;
type RoleComponent = Partial<Record<Role, Component>>;
type Props = {
  allowedRoles: Role[];
  roleComponents: RoleComponent;
  loadingMessage?: string;
};

export default function RenderByRole({
  loadingMessage,
  allowedRoles,
  roleComponents,
}: Props) {
  const { user, isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Link to={"/login"} />;
  }
  if (!user?.role || !allowedRoles.includes(user.role)) {
    return <Unauthorized />;
  }

  const ComponentToRender = roleComponents[user.role];
  if (!ComponentToRender) {
    console.error("roleComponents didn't match any role");
    throw new Error("Application error");
  }

  return (
    <Suspense fallback={<Loading message={loadingMessage} />}>
      <ComponentToRender />
    </Suspense>
  );
}
