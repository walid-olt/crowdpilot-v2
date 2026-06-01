import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type ProjectData, projectCreateSchema } from "../schemas";
import { useCreateProjectMutation } from "../hooks";
import { LucideRocket } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ProjectCreateForm = () => {
  const naviagte = useNavigate();
  const { mutate, isPending } = useCreateProjectMutation();
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<ProjectData>({
    resolver: zodResolver(projectCreateSchema),
  });
  const onSubmit = (data: ProjectData) => {
    const tid = toast.loading("Creating project...");
    mutate(data, {
      /*TODO:
       * - handle server errors
       */
      onSuccess: (reponse) => {
        const project = reponse.data!;
        reset();
        toast.dismiss(tid);
        naviagte(`/app/projects/${project._id}`);
      },
    });
  };
  useEffect(() => {
    // focus the title input on mount
    setFocus("title");
  }, [setFocus]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col px-6 ">
        <div className="space-y-3">
          <h1 className="font-serif text-4xl leading-tight">
            Create a new project
          </h1>
        </div>

        <form
          className={`mt-8 space-y-4 ${isPending && "pointer-events-none grayscale"}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground"
            >
              Project title
            </label>
            <Input
              {...register("title")}
              id="title"
              name="title"
              placeholder="Solaris Eco Park"
              autoComplete="off"
              maxLength={64}
              aria-invalid={Boolean(errors.title)} // cast to boolean - same as
            />
            {errors.title && (
              <label className="text-destructive">{errors.title.message}</label>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground"
            >
              Description
            </label>
            <Input
              {...register("description")}
              id="description"
              name="description"
              placeholder="Briefly describe the project..."
              autoComplete="off"
              maxLength={254}
              aria-invalid={!!errors.description}
            />
            {errors.description && (
              <label className="text-destructive">
                {errors.description.message}
              </label>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="targetCapital"
              className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground"
            >
              Target capital
            </label>
            <Input
              {...register("targetCapital", { valueAsNumber: true })}
              id="targetCapital"
              name="targetCapital"
              type="number"
              placeholder="1000000"
              inputMode="decimal"
              aria-invalid={!!errors.targetCapital}
            />
            {errors.targetCapital && (
              <label className="text-destructive">
                {errors.targetCapital.message}
              </label>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="ownerInvestment"
              className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground"
            >
              Owner investment
            </label>
            <Input
              {...register("ownerInvestment", {
                setValueAs: (value) =>
                  value === "" ? undefined : Number(value),
              })}
              id="ownerInvestment"
              name="ownerInvestment"
              type="number"
              placeholder="Your own contribution to the project"
              inputMode="decimal"
              aria-invalid={!!errors.ownerInvestment}
            />
            {errors.ownerInvestment && (
              <label className="text-destructive">
                {errors.ownerInvestment.message}
              </label>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="maxInvestmentPercentage"
              className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground"
            >
              Max investment percentage
            </label>
            <Input
              {...register("maxInvestmentPercentage", { valueAsNumber: true })}
              id="maxInvestmentPercentage"
              name="maxInvestmentPercentage"
              type="number"
              placeholder="50"
              inputMode="decimal"
              aria-invalid={!!errors.maxInvestmentPercentage}
            />
            {errors.maxInvestmentPercentage && (
              <label className="text-destructive">
                {errors.maxInvestmentPercentage.message}
              </label>
            )}
          </div>

          <Button
            type="submit"
            className="h-10 w-full disabled:grayscale"
            disabled={isSubmitting || isPending}
          >
            {isPending ? (
              <LucideRocket className="animate-pulse size-fit" />
            ) : (
              "launch"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};
