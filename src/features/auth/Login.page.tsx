import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { loginBodySchema } from "./schemas/login.schema.ts";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUser } from "@/api/service.ts";
import { useLogin } from "./hooks/index.tsx";
type UserData = z.infer<typeof loginBodySchema>;

export default function LoginPage() {
  const login = useLogin();

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,

    onError: (e) => {
      toast.dismiss("loading");
      console.log(e);

      toast.error(e.message, { duration: 3000 });
      if (e.message.includes("email")) {
        setError("email", { message: e.message });
      }
    },
    onSuccess: ({ user, token }) => {
      toast.dismiss("loading");
      toast.success("Welcome back", { duration: 3000 });
      login({ user, token });
    },
  });
  async function onSubmit(formData: UserData) {
    console.log(formData);
    toast.loading("Logging you in, hold on please.", { id: "loading" });
    mutate(formData);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(loginBodySchema),
  });
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col justify-center px-6 py-16">
        <div className="space-y-3">
          <p className="text-xs font-mono uppercase tracking-[] text-muted-foreground">
            Log in
          </p>
          <h1 className="font-serif text-4xl leading-tight">
            Welcome back to Crowdpilot
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in with your email address and password.
          </p>
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground"
            >
              Email address
            </label>
            <Input
              {...register("email")}
              id="email"
              name="email"
              type="email"
              placeholder="john.doe@crowdpilot.com"
              autoComplete="email"
            />
            {errors.email && (
              <label className="text-destructive">{errors.email.message}</label>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground"
            >
              Password
            </label>
            <Input
              {...register("password")}
              id="password"
              name="password"
              type="password"
              placeholder="Minimum 8 characters"
              autoComplete="current-password"
              minLength={8}
              maxLength={128}
            />
            {errors.password && (
              <label className="text-destructive">
                {errors.password.message}
              </label>
            )}
          </div>

          <Button
            type="submit"
            className="w-full disabled:grayscale h-10 cursor-pointer"
            disabled={isPending}
          >
            {isPending ? "..." : "Log in"}
          </Button>
        </form>
        <p className="text-sm text-muted-foreground py-4">
          New to Crowdpilot?{" "}
          <Link
            to="/register"
            className="font-medium  underline underline-offset-4 text-primary transition-colors duration-300"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
