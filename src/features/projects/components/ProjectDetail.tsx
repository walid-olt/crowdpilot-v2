import * as React from "react";
import { cn } from "@/lib/utils";
type ProjectDetailProps = React.HTMLAttributes<HTMLElement>;

const ProjectDetail = ({ className, ...props }: ProjectDetailProps) => (
  <main className="px-4 py-10">
    <section className={cn("mx-auto w-full max-w-5xl", className)} {...props} />
  </main>
);
ProjectDetail.displayName = "ProjectDetail";

const ProjectDetailHeader = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <header
    ref={ref}
    className={cn(
      "flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6",
      className,
    )}
    {...props}
  />
));
ProjectDetailHeader.displayName = "ProjectDetailHeader";

const ProjectDetailHeadingGroup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("space-y-2", className)} {...props} />
));
ProjectDetailHeadingGroup.displayName = "ProjectDetailHeadingGroup";

const ProjectDetailLabel = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      "text-xs uppercase tracking-[0.3em] text-muted-foreground",
      className,
    )}
    {...props}
  />
));
ProjectDetailLabel.displayName = "ProjectDetailLabel";

const ProjectDetailTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h1
    ref={ref}
    className={cn(
      "text-3xl font-semibold text-foreground sm:text-4xl",
      className,
    )}
    {...props}
  />
));
ProjectDetailTitle.displayName = "ProjectDetailTitle";

const ProjectDetailSub = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
ProjectDetailSub.displayName = "ProjectDetailSub";

const ProjectDetailContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "mx-auto mt-10 flex w-full max-w-2xl flex-col items-center gap-8 text-center",
      className,
    )}
    {...props}
  />
));
ProjectDetailContent.displayName = "ProjectDetailContent";

const ProjectDetailCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "w-full rounded-2xl border border-border bg-card px-6 py-5 shadow-sm",
      className,
    )}
    {...props}
  />
));
ProjectDetailCard.displayName = "ProjectDetailCard";

const ProjectDetailStatsGrid = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("grid w-full grid-cols-1 gap-4 sm:grid-cols-3", className)}
    {...props}
  />
));
ProjectDetailStatsGrid.displayName = "ProjectDetailStatsGrid";

const ProjectDetailStatCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-2xl border border-border bg-muted/20 px-4 py-5",
      className,
    )}
    {...props}
  />
));
ProjectDetailStatCard.displayName = "ProjectDetailStatCard";

interface ProjectProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

const ProjectProgress = React.forwardRef<HTMLDivElement, ProjectProgressProps>(
  ({ className, value, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "h-2 w-full overflow-hidden rounded-full bg-muted",
        className,
      )}
      {...props}
    >
      <div
        className="h-full rounded-full bg-primary transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  ),
);
ProjectProgress.displayName = "ProjectProgress";

ProjectDetail.Header = ProjectDetailHeader;
ProjectDetail.HeadingGroup = ProjectDetailHeadingGroup;
ProjectDetail.Label = ProjectDetailLabel;
ProjectDetail.Title = ProjectDetailTitle;
ProjectDetail.Sub = ProjectDetailSub;
ProjectDetail.Content = ProjectDetailContent;
ProjectDetail.Card = ProjectDetailCard;
ProjectDetail.StatsGrid = ProjectDetailStatsGrid;
ProjectDetail.StatCard = ProjectDetailStatCard;
ProjectDetail.Progress = ProjectProgress;
ProjectDetail.StatCard = ProjectDetailStatCard;

export {
  ProjectDetail,
  ProjectDetailHeader,
  ProjectDetailHeadingGroup,
  ProjectDetailLabel,
  ProjectDetailTitle,
  ProjectDetailSub,
  ProjectDetailContent,
  ProjectDetailCard,
  ProjectDetailStatsGrid,
  ProjectDetailStatCard,
  ProjectProgress,
};

export default ProjectDetail;
