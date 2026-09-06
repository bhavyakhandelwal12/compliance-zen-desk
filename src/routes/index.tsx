import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { SiteLayout } from "@/components/site-chrome";
import { DemoTag } from "@/components/status";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Meridian — Employment compliance without the legal chase" },
      {
        name: "description",
        content:
          "Monitor employment law changes, identify affected contracts, and prepare compliant updates for review — from one place.",
      },
      { property: "og:title", content: "Meridian — Employment compliance without the legal chase" },
      {
        property: "og:description",
        content:
          "Monitor employment law changes, identify affected contracts, and prepare compliant updates for review.",
      },
    ],
  }),
  component: Landing,
});

const workflow = [
  { label: "Law changed", detail: "Germany · Working time", tone: "terracotta" },
  { label: "Contracts affected", detail: "23 contracts matched", tone: "ochre" },
  { label: "Analysis", detail: "Clause gap explained", tone: "neutral" },
  { label: "Review", detail: "HR + Legal sign-off", tone: "neutral" },
  { label: "Approved", detail: "v3.2 published", tone: "sage" },
];

const problems = [
  {
    title: "Laws move faster than contracts",
    body: "A single employment-law amendment can invalidate wording you signed two years ago in a country you visit twice a year.",
  },
  {
    title: "Nobody owns the tracking",
    body: "Local counsel watches their own jurisdiction. Nobody keeps one list of what changed across all fourteen.",
  },
  {
    title: "Legal repeats itself",
    body: "The same clause gets reviewed dozens of times because there is no record of which contracts already carry the fix.",
  },
  {
    title: "HR is flying blind",
    body: "Without a view of which employees sit behind a risky clause, the honest answer to 'are we compliant?' is 'probably'.",
  },
];

const steps = [
  {
    n: "01",
    title: "Connect your workforce",
    body: "Add employees, countries, entities and contracts. Clauses are indexed so they can be matched later.",
  },
  {
    n: "02",
    title: "Monitor regulations",
    body: "Employment-law sources in every country you operate in are tracked continuously, with the source cited.",
  },
  {
    n: "03",
    title: "Detect impact",
    body: "Each change is matched against real clause text to show which contracts, employees and entities it touches.",
  },
  {
    n: "04",
    title: "Review changes",
    body: "Read a plain-English explanation of what changed, why it matters, and where the current wording falls short.",
  },
  {
    n: "05",
    title: "Approve & maintain",
    body: "Generate an updated draft, route it to HR and legal, approve it, and keep a full version history.",
  },
];

function Landing() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:py-24">
          <div>
            <p className="label-caps">Employment law compliance</p>
            <h1 className="mt-4 font-display text-4xl leading-[1.08] text-ink sm:text-5xl">
              Employment compliance, without the constant legal chase.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Monitor employment law changes, identify affected contracts, and prepare compliant updates from
              one place.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 rounded-md bg-terracotta px-5 py-2.5 text-sm font-medium text-terracotta-foreground transition-colors hover:bg-terracotta/90"
              >
                See how it works <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/demo"
                className="rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                Book a demo
              </Link>
            </div>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
              Every draft is prepared for a named human reviewer. Meridian never files a change on its own.
            </p>
          </div>

          <WorkflowVisual />
        </div>
      </section>

      {/* Problem */}
      <section className="border-b border-border bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="max-w-2xl">
            <p className="label-caps">The problem</p>
            <h2 className="mt-3 font-display text-3xl leading-tight text-ink">
              Hiring in fourteen countries means fourteen sets of rules that change without telling you.
            </h2>
          </div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
            {problems.map((p) => (
              <div key={p.title} className="bg-card p-7">
                <h3 className="font-display text-lg text-ink">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="label-caps">How it works</p>
              <h2 className="mt-3 font-display text-3xl leading-tight text-ink">
                From published amendment to approved contract.
              </h2>
            </div>
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-terracotta hover:underline"
            >
              See the full workflow <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-5">
            {steps.map((s) => (
              <li key={s.n} className="bg-card p-6">
                <span className="font-mono text-xs font-semibold text-terracotta">{s.n}</span>
                <h3 className="mt-3 font-display text-base text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Three questions */}
      <section className="border-b border-border bg-espresso">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-20">
          <h2 className="max-w-2xl font-display text-3xl leading-tight text-primary-foreground">
            Every screen answers the same three questions.
          </h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              { q: "What changed?", a: "The amendment in plain language, with the official source and dates." },
              { q: "What does it affect?", a: "The exact contracts, employees, entities and countries in scope." },
              { q: "What should I do now?", a: "A drafted replacement clause waiting for accept, edit or reject." },
            ].map((item) => (
              <div key={item.q} className="border-t border-primary-foreground/20 pt-5">
                <h3 className="font-display text-xl text-primary-foreground">{item.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-primary-foreground/70">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-16 sm:px-8">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl leading-tight text-ink">
              Walk through the product with your own jurisdictions.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Or open the interactive tour first — it runs on sample data so you can click through the whole
              review workflow.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/demo"
              className="rounded-md bg-terracotta px-5 py-2.5 text-sm font-medium text-terracotta-foreground transition-colors hover:bg-terracotta/90"
            >
              Book a demo
            </Link>
            <Link
              to="/app"
              className="rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Open product tour
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function WorkflowVisual() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-[0_1px_2px_rgba(60,40,25,0.05)]">
      <div className="flex items-center justify-between border-b border-border bg-secondary px-5 py-3">
        <p className="label-caps">Change pipeline</p>
        <DemoTag />
      </div>
      <div className="divide-y divide-border">
        {workflow.map((w, i) => (
          <div key={w.label} className="flex items-center gap-4 px-5 py-4">
            <span
              className={
                "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold " +
                (w.tone === "terracotta"
                  ? "border-terracotta/30 bg-terracotta/10 text-terracotta"
                  : w.tone === "sage"
                    ? "border-sage/30 bg-sage/12 text-sage"
                    : w.tone === "ochre"
                      ? "border-ochre/40 bg-ochre/15 text-espresso"
                      : "border-border bg-muted text-muted-foreground")
              }
            >
              {w.tone === "sage" ? <Check className="h-3.5 w-3.5" /> : i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-ink">{w.label}</p>
              <p className="text-xs text-muted-foreground">{w.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-border bg-cream px-5 py-4">
        <p className="text-xs leading-relaxed text-muted-foreground">
          Germany — Working Time Regulation Update · detected 12 Aug 2026 · effective 1 Oct 2026
        </p>
        <Link
          to="/app/changes/$changeId"
          params={{ changeId: "de-working-time-2026" }}
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-terracotta hover:underline"
        >
          Open this change <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
