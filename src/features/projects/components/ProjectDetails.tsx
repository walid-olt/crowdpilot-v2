import { formatter } from "@/lib/utils";
import { useParams } from "react-router-dom";
import { useProjectDetailsQuery } from "../hooks";
import ProjectDetailsActions from "./ProjectDetailsActions";
const ProjectDetails = () => {
  const { id } = useParams();
  const { data } = useProjectDetailsQuery(String(id));

  const project = data!;

  let percentageFunded;
  if (project && project.currentCapital && project.targetCapital) {
    percentageFunded = (
      (project.currentCapital / project.targetCapital) *
      100
    ).toFixed(2);
  } else if (project && project.percentageFunded) {
    percentageFunded = project.percentageFunded.toFixed(2);
  }
  return (
    <>
      {project && (
        <main className="px-4 py-10">
          <section className="mx-auto w-full max-w-5xl">
            <header className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                  Project
                </p>
                <h1 className="text-3xl font-semibold text-foreground sm:text-4xl">
                  {project.title}
                </h1>
                <p className="text-sm text-muted-foreground">
                  ID {project._id}
                </p>
              </div>
              <ProjectDetailsActions project={project} />
            </header>

            <div className="mx-auto mt-10 flex w-full max-w-2xl flex-col items-center gap-8 text-center">
              <p className="text-base leading-relaxed text-foreground">
                {project.description}
              </p>

              <div className="w-full rounded-2xl border border-border bg-card px-6 py-5 shadow-sm">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    <span>Funded</span>
                    <span>{percentageFunded}%</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${percentageFunded}%` }}
                    />
                  </div>
                  <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {formatter.currency(project.currentCapital)}
                    </span>
                    <span>
                      of {formatter.currency(project.targetCapital)} goal
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border bg-muted/20 px-4 py-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Status
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    {project.status}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/20 px-4 py-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Owner stake
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    {formatter.currency(project.ownerInvestment)}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-muted/20 px-4 py-5">
                  <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                    Max per investor
                  </p>
                  <p className="mt-2 text-lg font-semibold text-foreground">
                    {project.maxInvestmentPercentage}%
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default ProjectDetails;
