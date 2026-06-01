import { PenBoxIcon } from "lucide-react";
import {
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialog,
} from "@/components/ui/alert-dialog";
import { useAppSelector } from "@/store/hooks";
import { useProjectUpdateDialogue } from "../hooks";
import { ProjectUpdateForm } from "./ProjectUpdateForm";

const ProjectUpdateDialogue = () => {
  const project = useAppSelector((s) => s.projects.currentProject);
  const showDialogue = useAppSelector((s) => s.projects.isEditingModalOpen);
  const { close } = useProjectUpdateDialogue(project!);

  return (
    <>
      {project && (
        <AlertDialog open={showDialogue}>
          <AlertDialogContent>
            <AlertDialogHeader className="px-2 ">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <PenBoxIcon className="h-5 w-5 text-primary" />
                </div>
                <div className="space-y-1">
                  <AlertDialogTitle className="text-base font-medium leading-snug">
                    Update project
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-sm text-muted-foreground leading-relaxed">
                    Update details for{" "}
                    <span className="font-medium text-foreground">
                      &quot;{project.title}&quot;
                    </span>
                    .
                  </AlertDialogDescription>
                </div>
              </div>
            </AlertDialogHeader>
            <ProjectUpdateForm project={project} onClose={close} />
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};

export default ProjectUpdateDialogue;
