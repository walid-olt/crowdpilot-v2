import { LucideFolderClosed } from "lucide-react";
import ProjectsTable from "../components/ProjectsTable.tsx";
import { useSuspenseQuery } from "@tanstack/react-query";
import EmptyResult from "@/components/EmptyResult.tsx";
import type { ProjectsResponse } from "@/types/api.ts";
type Props = {
  loader: () => Promise<ProjectsResponse>;
};
const ProjectsTableContent = ({ loader }: Props) => {
  const { data } = useSuspenseQuery({
    queryFn: () => loader(),
    queryKey: ["projects"],
    staleTime: 1000 * 60 * 5,
  });
  return data.data?.length == 0 ? (
    <EmptyResult
      title="No projects found"
      description="try creating a new project to get started"
      icon={<LucideFolderClosed className="size-full" />}
    />
  ) : (
    <ProjectsTable projects={data.data!} />
  );
};

export default ProjectsTableContent;
