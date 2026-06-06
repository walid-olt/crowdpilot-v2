import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FolderClosedIcon as EmptyIcon } from "lucide-react";
import QueryContainer from "@/components/QueryContainer";
import EmptyResult from "@/components/EmptyResult";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getOwnerProjects } from "@/features/projects/api";
import { formatter } from "@/lib/utils";

const DashboardContent = () => {
  const { data } = useSuspenseQuery({
    queryFn: () => getOwnerProjects(),
    queryKey: ["projects"],
    staleTime: 1000 * 60 * 5,
  });

  const projects = data.data ?? [];
  const totalRaised = projects.reduce(
    (sum, project) => sum + project.currentCapital,
    0,
  );
  const totalTarget = projects.reduce(
    (sum, project) => sum + project.targetCapital,
    0,
  );
  const averageFunded = totalTarget
    ? Math.round((totalRaised / totalTarget) * 100)
    : 0;
  const activeProjects = projects.filter(
    (project) => project.status === "OPEN",
  ).length;
  const recentProjects = projects.slice(0, 3);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Track funding progress and keep projects moving.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline">
            <Link to="/app/projects">View projects</Link>
          </Button>
          <Button asChild>
            <Link to="/app/projects/create">New project</Link>
          </Button>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card px-4 py-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Active projects
          </p>
          <p className="mt-2 text-2xl font-semibold text-foreground">
            {activeProjects}
          </p>
          <p className="text-xs text-muted-foreground">
            {projects.length} total projects
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-card px-4 py-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Total raised
          </p>
          <p className="mt-2 text-2xl font-semibold text-foreground">
            {formatter.currency(totalRaised)}
          </p>
          <p className="text-xs text-muted-foreground">Across all campaigns</p>
        </div>
        <div className="rounded-2xl border border-border bg-card px-4 py-4 shadow-sm">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Average funded
          </p>
          <p className="mt-2 text-2xl font-semibold text-foreground">
            {totalTarget ? `${averageFunded}%` : "N/A"}
          </p>
          <p className="text-xs text-muted-foreground">Based on active goals</p>
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-card px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-foreground">
            Recent projects
          </h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/app/projects">See all</Link>
          </Button>
        </div>

        {projects.length === 0 ? (
          <EmptyResult
            title="No projects yet"
            description="Create your first project to start raising funds."
            icon={<EmptyIcon className="h-8 w-8" />}
            className="mt-4"
          >
            <Button asChild size="sm">
              <Link to="/app/projects/create">Create project</Link>
            </Button>
          </EmptyResult>
        ) : (
          <ul className="mt-4 divide-y divide-border">
            {recentProjects.map((project) => {
              const funded = project.targetCapital
                ? Math.round(
                    (project.currentCapital / project.targetCapital) * 100,
                  )
                : 0;
              return (
                <li
                  key={project._id}
                  className="flex items-center justify-between py-3"
                >
                  <div className="space-y-1">
                    <Link
                      to={`/app/projects/${project._id}`}
                      className="text-sm font-medium text-foreground hover:underline"
                    >
                      {project.title}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {formatter.currency(project.currentCapital)} raised •{" "}
                      {funded}%
                    </p>
                  </div>
                  <Badge
                    variant={
                      project.status === "OPEN" ? "secondary" : "outline"
                    }
                  >
                    {project.status}
                  </Badge>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
};

const OwnerDashboard = () => {
  return (
    <main className="px-4 py-6">
      <QueryContainer loadingMessage="Loading dashboard">
        <DashboardContent />
      </QueryContainer>
    </main>
  );
};

export default OwnerDashboard;
