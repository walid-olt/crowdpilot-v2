import { lazy } from "react";
import { useUserRole } from "../auth/hooks";

const OwnerDashboard = lazy(() => import("./OwnerDashboard"));
const InvestorDashboard = lazy(() => import("./InvestorDashBoard"));
// declare as `Component` and not `Dashboard` so that react router can lazy load it without issues
export function Component() {
  const userRole = useUserRole();

  switch (userRole) {
    case "OWNER":
      return <OwnerDashboard />;

    case "INVESTOR":
      return <InvestorDashboard />;

    default:
      // propably should never happen, but just in case, we can return null or a fallback UI
      return null;
  }
}
