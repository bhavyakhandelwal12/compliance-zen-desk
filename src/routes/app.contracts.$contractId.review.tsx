import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Pencil, X } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app-shell";
import { ContractBadge, CountryTag, DemoTag } from "@/components/status";
import { getChange, getContract } from "@/lib/demo-data";

export const Route = createFileRoute("/app/contracts/$contractId/review")({
  loader: ({ params }) => {
    const contract = getContract(params.contractId);
    if (!contract) throw notFound();
    return { contract, change: contract.changeId ? getChange(contract.changeId) : undefined };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Review unavailable — Meridian" }, { name: "robots", content: "noindex" }] };
    }
    const t = `Review ${loaderData.contract.employee}'s contract — Meridian`;
    const d = `Side-by-side review of ${loaderData.contract.employee}'s ${loaderData.contract.type} contract in ${loaderData.contract.country}.`;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="px-8 py-16">
      <h1 className="font-display text-2xl text-ink">Contract not found</h1>
      <Link to="/app/contracts" className="mt-3 inline-block text-sm text-terracotta hover:underline">
        Back to contracts
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="px-8 py-16">
      <h1 className="font-display text-2xl text-ink">This review didn't load</h1>
      <Link to="/app/contracts" className="mt-3 inline-block text-sm text-terracotta hover:underline">
        Back to contracts
      </Link>
    </div>
  ),
  component: ReviewWorkspace,
});

function ReviewWorkspace() {
  const { contract, change } = Route.useLoaderData();
  const [decision, setDecision] = useState<string | null>(null);

  return (
    <>
      <PageHeader
        eyebrow={`${contract.id} · ${contract.entity}`}
        title={`${contract.employee} — contract review`}
        description={
          change
            ? `Proposed update following: ${change.title}. Effective ${change.effective}.`
            : "No regulatory change is currently attached to this contract."
        }
        actions={
          <>
            <ContractBadge status={contract.status} />
            <DemoTag />
          </>
        }
      />

      <div className="px-5 py-4 sm:px-8">
        <Link
          to="/app/contracts"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-terracotta"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All contracts
        </Link>
      </div>

      <div className="grid gap-6 px-5 pb-10 sm:px-8 xl:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border lg:grid-cols-2">
            <DocPane
              label="Current contract"
              sub={`${contract.version} · last reviewed ${contract.lastReviewed}`}
              heading={change?.existingClause.heading ?? "Contract body"}
            >
              {change ? (
                <p className="font-mono text-[13px] leading-[1.9] text-foreground">
                  {change.diff.map((d, i) =>
                    d.type === "added" ? null : (
                      <span
                        key={i}
                        className={
                          d.type === "removed"
                            ? "bg-terracotta/12 text-terracotta line-through decoration-terracotta/50"
                            : ""
                        }
                      >
                        {d.text}
                      </span>
                    ),
                  )}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">This contract has no pending clause changes.</p>
              )}
            </DocPane>

            <DocPane
              label="Suggested update"
              sub={`Draft ${bumpVersion(contract.version)} · generated for review`}
              heading={change?.suggestedClause.heading ?? "Contract body"}
              tone="sage"
            >
              {change ? (
                <p className="font-mono text-[13px] leading-[1.9] text-foreground">
                  {change.diff.map((d, i) =>
                    d.type === "removed" ? null : (
                      <span key={i} className={d.type === "added" ? "bg-sage/18 text-foreground" : ""}>
                        {d.text}
                      </span>
                    ),
                  )}
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">Nothing to propose.</p>
              )}
            </DocPane>
          </div>

          <div className="flex flex-wrap items-center gap-4 rounded-lg border border-border bg-card px-5 py-4">
            <Legend className="bg-terracotta/12 text-terracotta line-through" label="Removed text" />
            <Legend className="bg-sage/18 text-foreground" label="Added text" />
            <Legend className="bg-ochre/25 text-foreground" label="Clause under review" />
          </div>

          {decision && (
            <p className="rounded-md border border-border bg-secondary px-4 py-3 text-sm text-foreground">
              {decision}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setDecision(
                  `Approved. ${bumpVersion(contract.version)} becomes the current version and the change is written to the audit trail.`,
                );
                toast.success("Update approved");
              }}
              className="inline-flex items-center gap-2 rounded-md bg-sage px-4 py-2 text-sm font-medium text-sage-foreground transition-colors hover:bg-sage/90"
            >
              <Check className="h-4 w-4" /> Approve update
            </button>
            <button
              onClick={() => {
                setDecision("Sent back for edits — the draft stays open with your comment attached.");
                toast("Sent back for edits");
              }}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <Pencil className="h-4 w-4" /> Send back for edits
            </button>
            <button
              onClick={() => {
                setDecision("Rejected — the contract stays on its current version.");
                toast("Draft rejected");
              }}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
            >
              <X className="h-4 w-4" /> Reject
            </button>
          </div>
        </div>

        <aside className="space-y-6">
          <SideCard title="Why this changed">
            {change ? (
              <>
                <p className="text-sm leading-relaxed text-foreground">{change.whyItMatters}</p>
                <Link
                  to="/app/changes/$changeId"
                  params={{ changeId: change.id }}
                  className="mt-3 inline-block text-sm font-medium text-terracotta hover:underline"
                >
                  Open full change analysis
                </Link>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No linked regulatory change.</p>
            )}
          </SideCard>

          <SideCard title="Source & dates">
            <dl className="space-y-3 text-sm">
              <Row k="Source" v={change?.source ?? "—"} />
              <Row k="Detected" v={change?.detected ?? "—"} />
              <Row k="Effective" v={change?.effective ?? "—"} />
              <Row k="Confidence" v={change ? `${change.confidence}%` : "—"} />
            </dl>
          </SideCard>

          <SideCard title="Contract">
            <dl className="space-y-3 text-sm">
              <Row k="Employee" v={contract.employee} />
              <Row k="Entity" v={contract.entity} />
              <Row k="Type" v={contract.type} />
              <Row k="Version" v={contract.version} />
            </dl>
            <div className="mt-4 border-t border-border pt-4">
              <CountryTag flag={contract.flag} country={contract.country} />
            </div>
          </SideCard>

          <SideCard title="Version history">
            <ol className="space-y-3">
              {contract.versions.map((v) => (
                <li key={v.version} className="text-sm">
                  <span className="font-mono font-semibold text-ink">{v.version}</span>{" "}
                  <span className="text-muted-foreground">{v.date}</span>
                  <p className="text-xs text-muted-foreground">
                    {v.note} · {v.author}
                  </p>
                </li>
              ))}
            </ol>
          </SideCard>
        </aside>
      </div>
    </>
  );
}

function bumpVersion(v: string) {
  const m = v.match(/^v(\d+)\.(\d+)$/);
  return m ? `v${m[1]}.${Number(m[2]) + 1}` : `${v}+1`;
}

function DocPane({
  label,
  sub,
  heading,
  tone,
  children,
}: {
  label: string;
  sub: string;
  heading: string;
  tone?: "sage";
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card">
      <div className="border-b border-border bg-secondary/60 px-5 py-3">
        <p className="label-caps">{label}</p>
        <p className={"mt-0.5 text-xs " + (tone === "sage" ? "text-sage" : "text-muted-foreground")}>{sub}</p>
      </div>
      <div className="px-5 py-5">
        <p className="mb-3 font-display text-sm font-semibold text-ink">{heading}</p>
        {children}
      </div>
    </div>
  );
}

function Legend({ className, label }: { className: string; label: string }) {
  return (
    <span className="flex items-center gap-2 text-xs text-muted-foreground">
      <span className={"rounded-[2px] px-1.5 py-0.5 font-mono text-[11px] " + className}>Aa</span>
      {label}
    </span>
  );
}

function SideCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="border-b border-border bg-secondary/60 px-5 py-3">
        <h2 className="font-display text-sm font-semibold tracking-wide text-ink">{title}</h2>
      </div>
      <div className="px-5 py-5">{children}</div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="shrink-0 text-muted-foreground">{k}</dt>
      <dd className="text-right font-medium text-ink">{v}</dd>
    </div>
  );
}
