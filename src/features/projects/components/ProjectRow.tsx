import type { Project } from "@/types/api";
import { TableRow, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { formatter } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

import ProjectActions from "./ProjectActions.tsx";
type Props = {
  project: Project;
};
const ProjectRow = ({ project }: Props) => {
  const {
    _id,
    description,
    targetCapital,
    title,
    currentCapital,
    maxInvestmentPercentage,
    status,
    percentageFunded,
    ownerInvestment,
  } = project;
  const navigate = useNavigate();
  return (
    <TableRow
      key={_id}
      onClick={() => navigate(`/app/projects/${_id}`)}
      className="cursor-pointer"
      title={"click to view details"}
    >
      <TableCell className="font-medium max-w-[15ch] truncate">
        {title}
      </TableCell>
      <TableCell className="max-w-[20ch] truncate" title={description}>
        {description}
      </TableCell>
      <TableCell>
        <Badge
          variant={"secondary"}
          className={status === "OPEN" ? "text-primary" : "text-destructive"}
        >
          {status.toLowerCase()}
        </Badge>
      </TableCell>
      <TableCell>{formatter.currency(Number(targetCapital))}</TableCell>
      <TableCell>{formatter.currency(currentCapital)}</TableCell>
      <TableCell>
        {percentageFunded === undefined ? "—" : `${percentageFunded}%`}
      </TableCell>
      <TableCell>{maxInvestmentPercentage}%</TableCell>
      <TableCell>{formatter.currency(ownerInvestment)}</TableCell>
      <TableCell className="text-right">
        <ProjectActions project={project} />
      </TableCell>
    </TableRow>
  );
};

export default ProjectRow;
