import store from "@/store/store.ts";
import { login, logout } from "@/features/auth/authSlice.ts";
import { getLogedInUser } from "@/api/service.ts";
import { redirect } from "react-router-dom";

async function bootstrapAuthFromStorage() {
  const token = localStorage.getItem("token");
  if (!token) {
    return { token: null, user: null };
  }

  const { user } = store.getState().auth;
  if (user) {
    return { token, user };
  }

  try {
    const fetchedUser = await getLogedInUser();
    store.dispatch(login({ user: fetchedUser, token }));
    return { token, user: fetchedUser };
  } catch {
    localStorage.removeItem("token");
    store.dispatch(logout());
    return { token: null, user: null };
  }
}

export async function publicLoader() {
  const { token, user } = await bootstrapAuthFromStorage();
  if (user || token) {
    return redirect("/app/dashboard");
  }
  return null;
}

export async function authLoader() {
  const { token, user } = await bootstrapAuthFromStorage();
  if (!token || !user) {
    return redirect("/login");
  }
  return null;
}
