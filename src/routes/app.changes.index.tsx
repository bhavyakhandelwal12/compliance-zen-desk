import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { CountryTag, DemoTag, ReviewBadge, SeverityBadge } from "@/components/status";
import { legalChanges } from "@/lib/demo-data";

export const Route = createFileRoute("/app/changes/")({
  head: () => ({
    meta: [
      { title: "Compliance changes — Meridian" },
      {
        name: "description",
        content:
          "Detected employment-law changes with effective dates, severity, affected contracts and review status.",
      },
      { property: "og:title", content: "Compliance changes — Meridian" },
      {
        property: "og:description",
        content: "Every detected employment-law change, with what it affects and what to do next.",
      },
    ],
  }),
  component: Changes,
});

const filters = ["All", "Needs review", "In review", "Approved", "Monitoring"] as const;

function Changes() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const rows = legalChanges.filter((c) => {
    if (filter === "All") return true;
    return (
      (filter === "Needs review" && c.status === "needs-review") ||
      (filter === "In review" && c.status === "in-review") ||
      (filter === "Approved" && c.status === "approved") ||
      (filter === "Monitoring" && c.status === "monitoring")
    );
  });

  return (
    <>
      <PageHeader
        eyebrow="Regulatory monitoring"
        title="Compliance changes"
        description="Employment-law changes detected across the countries you employ in. Open a change to see what it affects and the drafted wording."
        actions={<DemoTag />}
      />

      <div className="px-5 py-8 sm:px-8">
        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={
                "rounded-md border px-3 py-1.5 text-sm transition-colors " +
                (filter === f
                  ? "border-espresso bg-espresso text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-accent")
              }
            >
              {f}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-border bg-card">
          <div className="hidden grid-cols-[1.7fr_0.8fr_0.8fr_0.8fr_0.9fr] gap-4 border-b border-border bg-secondary/60 px-5 py-2.5 lg:grid">
            {["Change", "Detected", "Effective", "Affected", "Status"].map((h) => (
              <span key={h} className="label-caps">
                {h}
              </span>
            ))}
          </div>
          <ul className="divide-y divide-border">
            {rows.map((c) => (
              <li key={c.id}>
                <Link
                  to="/app/changes/$changeId"
                  params={{ changeId: c.id }}
                  className="group grid gap-3 px-5 py-4 transition-colors hover:bg-secondary/50 lg:grid-cols-[1.7fr_0.8fr_0.8fr_0.8fr_0.9fr] lg:items-center lg:gap-4"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <CountryTag flag={c.flag} country={c.country} />
                      <SeverityBadge severity={c.severity} />
                    </div>
                    <p className="mt-1.5 font-display text-base text-ink">{c.topic}</p>
                    <p className="mt-1 max-w-lg text-sm leading-relaxed text-muted-foreground">{c.summary}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    <span className="lg:hidden label-caps mr-2">Detected</span>
                    {c.detected}
                  </span>
                  <span className="text-sm text-foreground">
                    <span className="lg:hidden label-caps mr-2">Effective</span>
                    {c.effective}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {c.affectedContracts} contracts
                    <br className="hidden lg:block" /> {c.affectedEmployees} employees
                  </span>
                  <span className="flex items-center justify-between gap-3">
                    <ReviewBadge status={c.status} />
                    <ArrowRight className="hidden h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 lg:block" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {rows.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">No changes in this state.</p>
          )}
        </div>
      </div>
    </>
  );
}
