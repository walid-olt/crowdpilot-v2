import { login, logout } from "../authSlice.ts";
import { useAppDispatch } from "@/store/hooks.ts";
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
  return () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/", { replace: true });
  };
}
