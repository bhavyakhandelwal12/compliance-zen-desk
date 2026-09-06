import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { ContractBadge, CountryTag, DemoTag, ReviewBadge, SeverityBadge } from "@/components/status";
import { contracts, legalChanges, monitoredCountries, overview } from "@/lib/demo-data";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Compliance overview — Meridian" },
      {
        name: "description",
        content:
          "Compliance status across every country you employ in: changes requiring review, affected contracts and pending approvals.",
      },
      { property: "og:title", content: "Compliance overview — Meridian" },
      {
        property: "og:description",
        content: "Compliance status, changes requiring review and affected contracts in one view.",
      },
    ],
  }),
  component: Overview,
});

function Overview() {
  const needsAttention = legalChanges.filter((c) => c.status !== "approved" && c.status !== "monitoring");

  return (
    <>
      <PageHeader
        eyebrow="Monday, 6 September 2026"
        title="Compliance overview"
        description="Three regulatory changes need a decision this week. Everything else is monitored and up to date."
        actions={<DemoTag />}
      />

      <div className="space-y-8 px-5 py-8 sm:px-8">
        <section className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          <Stat value={`${overview.compliantPercent}%`} label="Compliant" tone="sage" sub="248 of 254 active contracts" />
          <Stat value={String(overview.changesRequiringReview)} label="Changes requiring review" tone="terracotta" sub="Earliest deadline 1 Oct 2026" />
          <Stat value={String(overview.contractsAffected)} label="Contracts affected" tone="ochre" sub="Across 4 entities" />
          <Stat value={String(overview.countriesMonitored)} label="Countries monitored" sub={`${overview.employeesCovered} employees covered`} />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <Panel
            title="Needs your decision"
            action={
              <Link to="/app/changes" className="text-sm font-medium text-terracotta hover:underline">
                All changes
              </Link>
            }
          >
            <ul className="divide-y divide-border">
              {needsAttention.map((c) => (
                <li key={c.id}>
                  <Link
                    to="/app/changes/$changeId"
                    params={{ changeId: c.id }}
                    className="group flex flex-wrap items-start gap-4 px-5 py-4 transition-colors hover:bg-secondary/60"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <CountryTag flag={c.flag} country={c.country} />
                        <SeverityBadge severity={c.severity} />
                      </div>
                      <p className="mt-2 font-display text-base text-ink">{c.topic}</p>
                      <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted-foreground">{c.summary}</p>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Effective {c.effective} · {c.affectedContracts} contracts · {c.affectedEmployees} employees
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <ReviewBadge status={c.status} />
                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>

          <div className="space-y-6">
            <Panel title="Pending reviews">
              <ul className="divide-y divide-border">
                {contracts
                  .filter((c) => c.pendingIssues > 0)
                  .map((c) => (
                    <li key={c.id} className="flex items-center justify-between gap-3 px-5 py-3.5">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-ink">{c.employee}</p>
                        <p className="text-xs text-muted-foreground">
                          {c.country} · {c.version} · {c.id}
                        </p>
                      </div>
                      <ContractBadge status={c.status} />
                    </li>
                  ))}
              </ul>
              <div className="rule-top px-5 py-3">
                <Link to="/app/contracts" className="text-sm font-medium text-terracotta hover:underline">
                  Open contracts
                </Link>
              </div>
            </Panel>

            <Panel title="Coverage">
              <dl className="divide-y divide-border">
                {[
                  ["Employees covered", overview.employeesCovered],
                  ["Contracts tracked", overview.contractsTracked],
                  ["Open compliance issues", overview.openIssues],
                  ["Pending reviews", overview.pendingReviews],
                ].map(([k, v]) => (
                  <div key={String(k)} className="flex items-center justify-between px-5 py-3">
                    <dt className="text-sm text-muted-foreground">{k}</dt>
                    <dd className="font-mono text-sm font-semibold text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </Panel>
          </div>
        </section>

        <Panel title="Countries monitored">
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {monitoredCountries.map((c) => (
              <div key={c.country} className="flex items-center justify-between bg-card px-5 py-3.5">
                <CountryTag flag={c.flag} country={c.country} />
                <span className="text-xs text-muted-foreground">
                  {c.employees} staff
                  {c.changes > 0 && <span className="ml-2 font-semibold text-terracotta">{c.changes} change</span>}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </>
  );
}

function Stat({
  value,
  label,
  sub,
  tone,
}: {
  value: string;
  label: string;
  sub?: string;
  tone?: "sage" | "terracotta" | "ochre";
}) {
  const color =
    tone === "sage"
      ? "text-sage"
      : tone === "terracotta"
        ? "text-terracotta"
        : tone === "ochre"
          ? "text-ochre"
          : "text-ink";
  return (
    <div className="bg-card px-6 py-6">
      <p className="label-caps">{label}</p>
      <p className={`mt-2 font-display text-4xl ${color}`}>{value}</p>
      {sub && <p className="mt-1.5 text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border bg-secondary/60 px-5 py-3">
        <h2 className="font-display text-sm font-semibold tracking-wide text-ink">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
