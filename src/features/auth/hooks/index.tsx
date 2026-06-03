import { login, logout } from "../authSlice.ts";
import { useAppDispatch, useAppSelector } from "@/store/hooks.ts";
import { useTransition } from "react";
import { useNavigate } from "react-router-dom";
export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return ({ user, token }: Parameters<typeof login>[0]) => {
    localStorage.setItem("token", token);
    dispatch(login({ user, token }));
    navigate("/app/dashboard", { replace: true });
  };
}

export function useLogout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // need to use startTransition here just in case to avoid the "Cannot update a component (`Router`)
  // while rendering a different component (`AuthGuard`)"
  // warning that can occur when we dispatch logout and navigate at the same time

  const [, startTransition] = useTransition();
  return () => {
    localStorage.removeItem("token");
    dispatch(logout());
    startTransition(() => {
      navigate("/", { replace: true });
    });
  };
}

export const useUserRole = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  if (!user || !user.role) {
    localStorage.removeItem("token");
    dispatch(logout());

    return null as never; // This will never be reached, but it satisfies the return type
  }
  return user.role;
};
