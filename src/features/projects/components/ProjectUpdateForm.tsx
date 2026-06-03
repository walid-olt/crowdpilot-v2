import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type UpdatedProject, projectUpdateSchema } from "../schemas";
import { useUpdateProjectMutation } from "../hooks";
import { LucideLoader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import type { Project } from "@/types/api";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";

type Props = {
  project: Project;
  onClose: () => void;
};

export const ProjectUpdateForm = ({ project, onClose }: Props) => {
  const { mutate, isPending } = useUpdateProjectMutation();
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<UpdatedProject>({
    resolver: zodResolver(projectUpdateSchema),
    defaultValues: {
      title: project.title,
      description: project.description,
      targetCapital: project.targetCapital,
      maxInvestmentPercentage: project.maxInvestmentPercentage,
    },
  });

  useEffect(() => {
    reset({
      title: project.title,
      description: project.description,
      targetCapital: project.targetCapital,
      maxInvestmentPercentage: project.maxInvestmentPercentage,
    });
    setFocus("title");
  }, [project, reset, setFocus]);

  const onSubmit = (data: UpdatedProject) => {
    const tid = toast.loading("Updating project...");
    mutate(
      { id: project._id, payload: data },
      {
        onError: (e) => {
          toast.dismiss(tid);
          toast.error(e.message);
        },
        onSuccess: () => {
          toast.dismiss(tid);
          toast.success("Project updated successfully");
          onClose();
        },
      },
    );
  };

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
          aria-invalid={Boolean(errors.title)}
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
          {...register("targetCapital", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
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
          htmlFor="maxInvestmentPercentage"
          className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground"
        >
          Max investment percentage
        </label>
        <Input
          {...register("maxInvestmentPercentage", {
            setValueAs: (value) => (value === "" ? undefined : Number(value)),
          })}
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

      <AlertDialogFooter>
        <AlertDialogAction
          className="flex items-center justify-center relative min-w-20"
          disabled={isSubmitting || isPending}
          type="submit"
        >
          {isPending ? (
            <LucideLoader2 className="animate-spin size-fit" />
          ) : (
            "update"
          )}
        </AlertDialogAction>
        <AlertDialogCancel disabled={isPending} onClick={onClose} type="button">
          cancel
        </AlertDialogCancel>
      </AlertDialogFooter>
    </form>
  );
};
