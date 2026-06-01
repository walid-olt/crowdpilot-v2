import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 border-y border-border/60" />
      <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-6 py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="max-w-3xl space-y-8 lg:max-w-none">
          <div className="space-y-4">
            <p className="text-xs font-mono uppercase tracking-[0.4em] text-muted-foreground">
              Crowdfunding studio
            </p>
            <h1 className="font-serif text-6xl leading-[0.9] tracking-tight ">
              CROWDPILOT
            </h1>
            <p className="max-w-xl text-base text-muted-foreground md:text-lg">
              Launch, fund, and back ambitious projects with a quiet, focused
              experience built for bold ideas.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row  *:cursor-pointer">
            <Link
              to="/register?role=owner"
              className="inline-flex items-center justify-center rounded-(--radius) border border-foreground/20 bg-foreground px-6 py-3 text-sm font-medium uppercase tracking-[0.2em] text-background transition hover:bg-primary"
            >
              Launch a project
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            Already a member?{" "}
            <Link
              to="/login"
              className="font-medium  underline underline-offset-4 text-primary transition-colors duration-300"
            >
              Log in
            </Link>
          </p>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute -inset-6 rounded-(--radius) bg-linear-to-br from-primary/15 via-transparent to-foreground/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-4xl border border-foreground/10 bg-muted/40 shadow-[0_30px_120px_-60px_rgba(12,24,32,0.6)]">
            <img
              src="/hero.png"
              alt="Rocket launching through clouds"
              className=" w-full "
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
