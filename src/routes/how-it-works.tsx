import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/site-chrome";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How Meridian works — from amendment to approved contract" },
      {
        name: "description",
        content:
          "Five steps: connect your workforce, monitor regulations, detect impact, review changes, approve and maintain a full version history.",
      },
      { property: "og:title", content: "How Meridian works" },
      {
        property: "og:description",
        content: "Connect, monitor, detect impact, review and approve employment contract updates.",
      },
    ],
  }),
  component: HowItWorks,
});

const steps = [
  {
    n: "01",
    title: "Connect your workforce",
    body: "Add employees, countries, entities and their contracts. Clause text is indexed so later matching works on the actual wording, not on tags.",
    points: ["Bulk contract upload", "Entity and country mapping", "Clause-level indexing"],
  },
  {
    n: "02",
    title: "Monitor regulations",
    body: "Official employment-law sources for every country you operate in are tracked continuously. Each detected change keeps a citation and effective date.",
    points: ["Official gazettes and statutes", "Detected and effective dates", "Severity assessment"],
  },
  {
    n: "03",
    title: "Detect impact",
    body: "Each change is compared against your live clauses, so you see the exact contracts, employees and entities in scope — not a country-wide warning.",
    points: ["Clause pattern matching", "Contract and employee counts", "Entity-level breakdown"],
  },
  {
    n: "04",
    title: "Review changes",
    body: "A plain-English explanation of what changed and why the current wording may no longer hold, shown next to the clause itself.",
    points: ["What changed / why it matters", "Existing clause highlighted", "Compliance gap analysis"],
  },
  {
    n: "05",
    title: "Approve & maintain",
    body: "Accept, edit, reject or request another draft. Approved wording becomes a new version, and every step is written to the audit trail.",
    points: ["Side-by-side redline review", "HR and legal sign-off", "Complete version history"],
  },
];

function HowItWorks() {
  return (
    <SiteLayout>
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-20">
          <p className="label-caps">How it works</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.1] text-ink">
            From a published amendment to an approved contract, with a record of every decision.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Meridian is a workflow, not an inbox. Each step narrows the question from "something changed in
            Germany" to "this clause, in these 23 contracts, needs this wording by 1 October".
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:py-20">
          <ol className="space-y-px overflow-hidden rounded-lg border border-border bg-border">
            {steps.map((s) => (
              <li key={s.n} className="grid gap-6 bg-card p-7 sm:p-9 lg:grid-cols-[7rem_1fr_16rem]">
                <span className="font-mono text-sm font-semibold text-terracotta">{s.n}</span>
                <div>
                  <h2 className="font-display text-2xl text-ink">{s.title}</h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
                <ul className="space-y-2 self-center border-l border-border pl-6 lg:pl-6">
                  {s.points.map((p) => (
                    <li key={p} className="text-sm text-foreground">
                      {p}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-14 sm:px-8">
          <h2 className="max-w-lg font-display text-2xl leading-snug text-ink">
            See the workflow running on a real-looking dataset.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/app/changes/$changeId"
              params={{ changeId: "de-working-time-2026" }}
              className="inline-flex items-center gap-2 rounded-md bg-terracotta px-5 py-2.5 text-sm font-medium text-terracotta-foreground transition-colors hover:bg-terracotta/90"
            >
              Open a change analysis <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/demo"
              className="rounded-md border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              Book a demo
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
