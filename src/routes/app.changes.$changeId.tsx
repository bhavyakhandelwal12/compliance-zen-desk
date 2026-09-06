import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Check, Pencil, RefreshCw, X } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app-shell";
import { ContractBadge, CountryTag, DemoTag, ReviewBadge, SeverityBadge } from "@/components/status";
import { contracts, getChange } from "@/lib/demo-data";

export const Route = createFileRoute("/app/changes/$changeId")({
  loader: ({ params }) => {
    const change = getChange(params.changeId);
    if (!change) throw notFound();
    return { change };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Change unavailable — Meridian" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.change.title} — Meridian`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.change.summary },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.change.summary },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="px-8 py-16">
      <h1 className="font-display text-2xl text-ink">Change not found</h1>
      <Link to="/app/changes" className="mt-3 inline-block text-sm text-terracotta hover:underline">
        Back to compliance changes
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="px-8 py-16">
      <h1 className="font-display text-2xl text-ink">This change didn't load</h1>
      <Link to="/app/changes" className="mt-3 inline-block text-sm text-terracotta hover:underline">
        Back to compliance changes
      </Link>
    </div>
  ),
  component: ChangeDetail,
});

function ChangeDetail() {
  const { change } = Route.useLoaderData();
  const [decision, setDecision] = useState<string | null>(null);
  const [draft, setDraft] = useState(change.suggestedClause.text);
  const [editing, setEditing] = useState(false);

  const affected = contracts.filter((c) => c.changeId === change.id);

  return (
    <>
      <PageHeader
        eyebrow={`${change.country} · ${change.topic}`}
        title={change.title}
        description={change.summary}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <SeverityBadge severity={change.severity} />
            <ReviewBadge status={change.status} />
            <DemoTag />
          </div>
        }
      />

      <div className="px-5 py-4 sm:px-8">
        <Link
          to="/app/changes"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-terracotta"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All changes
        </Link>
      </div>

      <div className="grid gap-6 px-5 pb-10 sm:px-8 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          <Card title="What changed?">
            <ul className="space-y-3">
              {change.whatChanged.map((w) => (
                <li key={w} className="flex gap-3 text-sm leading-relaxed text-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                  {w}
                </li>
              ))}
            </ul>
            <p className="mt-5 border-t border-border pt-4 text-xs text-muted-foreground">
              Source: {change.source}
            </p>
          </Card>

          <Card title="Why it matters">
            <p className="text-sm leading-relaxed text-foreground">{change.whyItMatters}</p>
          </Card>

          <Card title="Existing clause">
            <p className="label-caps">{change.existingClause.heading}</p>
            <p className="mt-3 font-mono text-[13px] leading-[1.8] text-foreground">
              {highlight(change.existingClause.text, change.existingClause.highlight)}
            </p>
          </Card>

          <Card title="Compliance analysis">
            <ul className="space-y-3">
              {change.analysis.map((a) => (
                <li key={a} className="flex gap-3 text-sm leading-relaxed text-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ochre" />
                  {a}
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Suggested replacement">
            <p className="label-caps">{change.suggestedClause.heading}</p>
            {editing ? (
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                rows={8}
                className="mt-3 w-full rounded-md border border-border bg-background p-3 font-mono text-[13px] leading-[1.8] outline-none focus:border-terracotta"
              />
            ) : (
              <p className="mt-3 rounded-md border border-sage/25 bg-sage/8 p-4 font-mono text-[13px] leading-[1.8] text-foreground">
                {draft}
              </p>
            )}

            {decision && (
              <p className="mt-4 rounded-md border border-border bg-secondary px-4 py-2.5 text-sm text-foreground">
                {decision}
              </p>
            )}

            <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-5">
              <button
                onClick={() => {
                  setEditing(false);
                  setDecision("Accepted — queued for HR and legal sign-off, then published as a new version.");
                  toast.success("Clause accepted");
                }}
                className="inline-flex items-center gap-2 rounded-md bg-sage px-4 py-2 text-sm font-medium text-sage-foreground transition-colors hover:bg-sage/90"
              >
                <Check className="h-4 w-4" /> Accept
              </button>
              <button
                onClick={() => setEditing((v) => !v)}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                <Pencil className="h-4 w-4" /> {editing ? "Done editing" : "Edit"}
              </button>
              <button
                onClick={() => {
                  setDecision("Rejected — the change stays open and the existing clause is unchanged.");
                  toast("Draft rejected");
                }}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                <X className="h-4 w-4" /> Reject
              </button>
              <button
                onClick={() => {
                  setDecision("Another draft requested — a new wording proposal will appear here for review.");
                  toast("New draft requested");
                }}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                <RefreshCw className="h-4 w-4" /> Request another draft
              </button>
            </div>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card title="Key dates">
            <dl className="space-y-3 text-sm">
              <Row k="Detected" v={change.detected} />
              <Row k="Effective" v={change.effective} />
              <Row k="Confidence" v={`${change.confidence}%`} />
              <Row k="Country" v={change.country} />
            </dl>
          </Card>

          <Card title="Who is affected">
            <dl className="space-y-3 text-sm">
              <Row k="Contracts" v={String(change.affectedContracts)} />
              <Row k="Employees" v={String(change.affectedEmployees)} />
              <Row k="Country" v={change.country} />
            </dl>
            <div className="mt-4 space-y-2 border-t border-border pt-4">
              {affected.length === 0 && (
                <p className="text-sm text-muted-foreground">No contract wording changes are required.</p>
              )}
              {affected.map((c) => (
                <Link
                  key={c.id}
                  to="/app/contracts/$contractId/review"
                  params={{ contractId: c.id }}
                  className="flex items-center justify-between gap-2 rounded-md border border-border px-3 py-2 transition-colors hover:bg-accent"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-ink">{c.employee}</span>
                    <span className="block text-xs text-muted-foreground">
                      {c.entity} · {c.version}
                    </span>
                  </span>
                  <ContractBadge status={c.status} />
                </Link>
              ))}
            </div>
          </Card>

          <Card title="Countries in scope">
            <CountryTag flag={change.flag} country={change.country} />
          </Card>
        </aside>
      </div>
    </>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="font-medium text-ink">{v}</dd>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="overflow-hidden rounded-lg border border-border bg-card">
      <div className="border-b border-border bg-secondary/60 px-5 py-3">
        <h2 className="font-display text-sm font-semibold tracking-wide text-ink">{title}</h2>
      </div>
      <div className="px-5 py-5">{children}</div>
    </section>
  );
}

function highlight(text: string, part: string) {
  const i = text.indexOf(part);
  if (i === -1) return text;
  return (
    <>
      {text.slice(0, i)}
      <mark className="rounded-[2px] bg-ochre/30 px-0.5 text-foreground">{part}</mark>
      {text.slice(i + part.length)}
    </>
  );
}
