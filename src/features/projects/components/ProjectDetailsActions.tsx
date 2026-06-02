import Guard from "@/components/Guard";
import { Button } from "@/components/ui/button";
import type { Project } from "@/types/api";
import { HandCoins, PenBoxIcon, Trash2Icon } from "lucide-react";
import { useProjectDeleteDialogue, useProjectUpdateDialogue } from "../hooks";
import { useUserRole } from "@/features/auth/hooks";
import { useNavigate } from "react-router-dom";
type Props = {
  project: Project;
};
const ProjectDetailsActions = ({ project }: Props) => {
  const userRole = useUserRole();
  const { open } = useProjectDeleteDialogue(project);
  const { open: openUpdate } = useProjectUpdateDialogue(project);
  const navigate = useNavigate();
  switch (userRole) {
    case "OWNER":
      return (
        <div className="flex items-center gap-2">
          <Guard
            toolTipSide="bottom"
            when={project.status === "CLOSED"}
            reason="You can't edit a project that has been closed"
          >
            <Button
              variant={"secondary"}
              onClick={(e) => {
                e.stopPropagation();
                openUpdate();
              }}
            >
              Edit <PenBoxIcon />
            </Button>
          </Guard>

          <Guard
            toolTipSide="bottom"
            when={project.status === "CLOSED"}
            reason="You can't delete a project that has been closed"
          >
            <Button
              variant={"destructive"}
              onClick={(e) => {
                e.stopPropagation();
                open();
              }}
            >
              {" "}
              Delete <Trash2Icon />
            </Button>
          </Guard>
        </div>
      );
    case "INVESTOR":
      return (
        <Guard
          when={project.status === "CLOSED"}
          reason="This project is closed for investements"
          toolTipSide="bottom"
        >
          <Button
            variant={"default"}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`invest`);
            }}
          >
            Invest <HandCoins />
          </Button>
        </Guard>
      );
  }
};

export default ProjectDetailsActions;
