import { LucideLoader2, Trash2Icon } from "lucide-react";
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialog,
} from "@/components/ui/alert-dialog";
import { useAppSelector } from "@/store/hooks";
import { useProjectDeleteDialogue, useDeleteProjectMutation } from "../hooks";
import toast from "react-hot-toast";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const ProjectDeleteDialogue = () => {
  const project = useAppSelector((s) => s.projects.projectToDelete);
  const showDialogue = useAppSelector((s) => s.projects.isDeleteModalOpen);
  const { close } = useProjectDeleteDialogue(project!);
  const { isPending, mutate } = useDeleteProjectMutation();
  const navigate = useNavigate();
  const deleteProject = useCallback(
    (id: string) => {
      mutate(id, {
        onError: (e) => {
          toast.error(e.message);
          close();

          navigate("/app/projects", { replace: true });
        },

        onSuccess: () => {
          toast.success("Project deleted successfully");
          navigate("/app/projects", { replace: true });
          close();
        },
      });
    },
    [mutate, close, navigate],
  );
  return (
    <>
      {project && (
        <AlertDialog open={showDialogue}>
          <AlertDialogContent>
            <AlertDialogHeader className="px-2 ">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10">
                  <Trash2Icon className="h-5 w-5 text-destructive" />
                </div>
                <div className="space-y-1">
                  <AlertDialogTitle className="text-base font-medium leading-snug">
                    Delete project
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed">
                    You&apos;re about to permanently delete{" "}
                    <span className="font-medium text-foreground">
                      &quot;{project.title}&quot;
                    </span>
                    . This action cannot be undone.
                  </AlertDialogDescription>
                </div>
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction
                variant={"destructive"}
                className="flex items-center justify-center relative min-w-16"
                onClick={() => deleteProject(project._id)}
                disabled={isPending}
              >
                {isPending ? (
                  <LucideLoader2 className="animate-spin" />
                ) : (
                  "delete"
                )}
              </AlertDialogAction>
              <AlertDialogCancel disabled={isPending} onClick={close}>
                cancel
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default ProjectDeleteDialogue;
