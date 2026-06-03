import {
  MoreHorizontalIcon,
  ExternalLinkIcon,
  HandCoinsIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import type { Project } from "@/types/api";

import {
  useProjectDeleteDialogue,
  useProjectUpdateDialogue,
} from "../hooks/index.tsx";
import Guard from "@/components/Guard.tsx";
import { useNavigate } from "react-router-dom";
import { useUserRole } from "@/features/auth/hooks/index.tsx";

type Props = {
  project: Project;
};

const ProjectActions = ({ project }: Props) => {
  const role = useUserRole();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      {role === "OWNER" ? (
        <OwnerProjectActions project={project} />
      ) : (
        <InviteeProjectActions project={project} />
      )}
    </DropdownMenu>
  );
};

const InviteeProjectActions = ({ project }: Props) => {
  const navigate = useNavigate();
  return (
    <DropdownMenuContent className="*:cursor-pointer w-fit">
      <DropdownMenuItem
        className="group/item"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/app/projects/${project._id}`);
        }}
      >
        view details{" "}
        <ExternalLinkIcon className="group-hover/item:opacity-100 opacity-0" />
      </DropdownMenuItem>
      <Guard
        toolTipSide="bottom"
        when={project.status === "CLOSED"}
        reason="This project has been closed, you can't invest in it anymore"
      >
        <DropdownMenuItem
          variant="default"
          className="group/item "
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/app/projects/${project._id}/invest`);
          }}
        >
          invest
          <HandCoinsIcon className="group-hover/item:opacity-100 opacity-0" />
        </DropdownMenuItem>
      </Guard>
    </DropdownMenuContent>
  );
};

const OwnerProjectActions = ({ project }: Props) => {
  const { open } = useProjectDeleteDialogue(project);
  const { open: openUpdate } = useProjectUpdateDialogue(project);
  const navigate = useNavigate();

  return (
    <DropdownMenuContent className="*:cursor-pointer">
      <DropdownMenuItem
        className="group/item"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/app/projects/${project._id}`);
        }}
      >
        view details{" "}
        <ExternalLinkIcon className="group-hover/item:opacity-100 opacity-0" />
      </DropdownMenuItem>
      <Guard
        toolTipSide="bottom"
        when={project.status === "CLOSED"}
        reason="You can't edit a project that has been closed"
      >
        <DropdownMenuItem
          onClick={(e) => {
            e.stopPropagation();
            openUpdate();
          }}
        >
          edit project
        </DropdownMenuItem>
      </Guard>
      <DropdownMenuSeparator />
      <Guard
        toolTipSide="bottom"
        when={project.status === "CLOSED"}
        reason="You can't delete a project that has been closed"
      >
        <DropdownMenuItem
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation();
            open();
          }}
        >
          delete project
        </DropdownMenuItem>
      </Guard>
    </DropdownMenuContent>
  );
};

export default ProjectActions;
