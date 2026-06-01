import type { Project } from "@/types/api";
import { LucideCircleQuestionMark } from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ProjectRow from "./ProjectRow";
type Props = {
  projects: Project[];
};

const ProjectsTable = ({ projects }: Props) => {
  return (
    <div className="overflow-x-auto mx-4 rounded-md outline outline-secondary shadow-xl">
      <Table className="rounded-md!">
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Target</TableHead>
            <TableHead>Current</TableHead>
            <TableHead>Funded</TableHead>
            <Tooltip>
              <TooltipTrigger className="cursor-help" asChild>
                <TableHead className="flex items-center gap-1">
                  <LucideCircleQuestionMark size={14} /> MIP
                </TableHead>
              </TooltipTrigger>
              <TooltipContent>
                Max Investment Percentage. The maximum percentage of the target
                amount that a single investor can contribute to the project.
              </TooltipContent>
            </Tooltip>
            <TableHead>Owner</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <ProjectRow key={project._id} project={project} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProjectsTable;
