import { formatter } from "@/lib/utils";
import { useParams } from "react-router-dom";
import { useProjectDetailsQuery } from "../hooks";
import ProjectDetailsActions from "./ProjectDetailsActions";
import ProjectDetail from "./ProjectDetail.tsx";
const ProjectDetails = () => {
  const { id } = useParams();
  const { data } = useProjectDetailsQuery(String(id));

  const project = data!;

  const percentageFunded = project.percentageFunded
    ? project.percentageFunded
    : ((project.currentCapital / project.targetCapital) * 100).toFixed(2);
  if (!project) return null;
  return (
    <>
      <ProjectDetail>
        <ProjectDetail.Header>
          <ProjectDetail.HeadingGroup>
            <ProjectDetail.Label>Project</ProjectDetail.Label>
            <ProjectDetail.Title>{project.title}</ProjectDetail.Title>
            <ProjectDetail.Sub>ID {project._id}</ProjectDetail.Sub>
          </ProjectDetail.HeadingGroup>
          <ProjectDetailsActions project={project} />
        </ProjectDetail.Header>

        <ProjectDetail.Content>
          <p className="text-base leading-relaxed text-foreground">
            {project.description}
          </p>

          <ProjectDetail.Card>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                <span>Funded</span>
                <span>{percentageFunded}%</span>
              </div>

              <ProjectDetail.Progress value={Number(percentageFunded)} />

              <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  {formatter.currency(project.currentCapital)}
                </span>
                <span>of {formatter.currency(project.targetCapital)} goal</span>
              </div>
            </div>
          </ProjectDetail.Card>

          <ProjectDetail.StatsGrid>
            <ProjectDetail.StatCard>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Status
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                {project.status}
              </p>
            </ProjectDetail.StatCard>

            <ProjectDetail.StatCard>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Owner stake
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                {formatter.currency(project.ownerInvestment)}
              </p>
            </ProjectDetail.StatCard>

            <ProjectDetail.StatCard>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Max per investor
              </p>
              <p className="mt-2 text-lg font-semibold text-foreground">
                {project.maxInvestmentPercentage}%
              </p>
            </ProjectDetail.StatCard>
          </ProjectDetail.StatsGrid>
        </ProjectDetail.Content>
      </ProjectDetail>
      )
    </>
  );
};

export default ProjectDetails;
