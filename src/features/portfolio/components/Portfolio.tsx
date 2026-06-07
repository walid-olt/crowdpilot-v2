import { Link } from "react-router-dom";
import {
  TrendingUp,
  ArrowRight,
  LucideChartBarDecreasing,
  ExternalLinkIcon,
} from "lucide-react";
import { usePortfolioQuery } from "../hooks";
import { formatter } from "@/lib/utils";
import EmptyResult from "@/components/EmptyResult";
import { Button } from "@/components/ui/button";
// claude spent a shit ton of tokens reading the frontend design skill only to come up with this 😭
export function Portfolio() {
  const { data } = usePortfolioQuery();
  const portfolio = data.data;

  if (!portfolio) return null;

  const { investor, totalInvested, portfolio: investments } = portfolio;

  const totalProjects = investments.length;
  const activeProjects = investments.filter(
    (inv) => inv.projectStatus === "OPEN",
  ).length;

  return (
    <div className="mx-auto w-full px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
          Portfolio
        </h1>
        <p className="text-base text-muted-foreground">
          {investor.name} • {activeProjects} active of {totalProjects} projects
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 mb-12">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Total Invested
            </p>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </div>
          <p className="text-3xl font-bold text-foreground">
            {formatter.currency(totalInvested)}
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            Across {totalProjects} projects
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-6">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium mb-2">
            Average Ownership
          </p>
          <p className="text-3xl font-bold text-foreground">
            {investments.length > 0
              ? (
                  investments.reduce(
                    (sum, inv) => sum + inv.ownershipPercentage,
                    0,
                  ) / investments.length
                )
                  .toFixed(1)
                  .concat("%")
              : "-"}
          </p>
          <p className="text-xs text-muted-foreground mt-3">
            Across all investments
          </p>
        </div>
      </div>

      {/* Investments Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-sm font-semibold text-foreground">Investments</h2>
        </div>

        <div className="divide-y divide-border">
          {investments.length === 0 ? (
            <EmptyResult
              title="You haven't invested in any projects yet"
              description="Browse projects and make your first investment to see it here."
              icon={<LucideChartBarDecreasing className="size-full" />}
            >
              <Button
                variant={"secondary"}
                className="group/link flex items-center transition-transform duration-200 ease-in-out"
                size="lg"
              >
                <Link to="/app/projects">Browse projects</Link>

                <ExternalLinkIcon className="group-hover/link:scale-100 scale-0 transform-gpu duration-200" />
              </Button>
            </EmptyResult>
          ) : (
            investments.map((investment) => (
              <Link
                key={investment.projectId}
                to={`/app/projects/${investment.projectId}`}
                className="block px-6 py-4 hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors truncate">
                        {investment.projectTitle}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full whitespace-nowrap ${
                          investment.projectStatus === "OPEN"
                            ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                            : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                        }`}
                      >
                        {investment.projectStatus}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Target: {formatter.currency(investment.targetCapital)}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-foreground">
                      {formatter.currency(investment.amount)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {investment.ownershipPercentage}% stake
                    </p>
                  </div>

                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors opacity-0 group-hover:opacity-100" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
