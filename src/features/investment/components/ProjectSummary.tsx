import { formatter } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";

export const ProjectSummary = () => {
  const project = useAppSelector((s) => s.investments.currentProject);
  if (!project) return null;

  const percentageFunded = project.percentageFunded
    ? project.percentageFunded
    : ((project.currentCapital / project.targetCapital) * 100).toFixed(2);

  return (
    <div className="space-y-4 py-4 ">
      <div className="text-xl">
        <span>Project : </span>
        <span className="font-semibold">{project.title}</span>
      </div>

      <div className="rounded-lg border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Funded
          </span>
          <span className="text-sm font-medium">{percentageFunded}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden mb-3">
          <div
            className="h-full bg-primary transition-all"
            style={{ width: `${Number(percentageFunded)}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {formatter.currency(project.currentCapital)}
          </span>
          <span>of {formatter.currency(project.targetCapital)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border p-3">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Status
          </p>
          <p className="font-semibold">{project.status}</p>
        </div>
        <div className="rounded-lg border border-border p-3">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            Max per investor
          </p>
          <p className="font-semibold">{project.maxInvestmentPercentage}%</p>
        </div>
      </div>
    </div>
  );
};
