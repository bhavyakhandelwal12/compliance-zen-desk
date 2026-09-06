import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app-shell";
import { DemoTag } from "@/components/status";
import { auditTrail } from "@/lib/demo-data";

export const Route = createFileRoute("/app/audit")({
  head: () => ({
    meta: [
      { title: "Audit trail — Meridian" },
      {
        name: "description",
        content:
          "A complete record of who uploaded, reviewed, edited and approved each contract change, with versions and reasons.",
      },
      { property: "og:title", content: "Audit trail — Meridian" },
      {
        property: "og:description",
        content: "Every compliance action recorded with actor, timestamp, versions and reason.",
      },
    ],
  }),
  component: Audit,
});

function Audit() {
  return (
    <>
      <PageHeader
        eyebrow="Evidence"
        title="Audit trail"
        description="Every action on a contract or regulatory change is recorded, in order, with the person responsible and the reason given."
        actions={<DemoTag />}
      />

      <div className="px-5 py-8 sm:px-8">
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="hidden grid-cols-[1fr_1fr_1.2fr_1.4fr_0.9fr] gap-4 border-b border-border bg-secondary/60 px-5 py-2.5 lg:grid">
            {["When", "Who", "Action", "Detail", "Version"].map((h) => (
              <span key={h} className="label-caps">
                {h}
              </span>
            ))}
          </div>
          <ul className="divide-y divide-border">
            {auditTrail.map((a) => (
              <li
                key={a.id}
                className="grid gap-2 px-5 py-4 lg:grid-cols-[1fr_1fr_1.2fr_1.4fr_0.9fr] lg:items-start lg:gap-4"
              >
                <span className="font-mono text-xs text-muted-foreground">{a.timestamp}</span>
                <span>
                  <span className="block text-sm font-medium text-ink">{a.actor}</span>
                  <span className="block text-xs text-muted-foreground">{a.role}</span>
                </span>
                <span className="text-sm text-foreground">{a.action}</span>
                <span>
                  <span className="block text-sm text-foreground">{a.target}</span>
                  <span className="block text-xs text-muted-foreground">{a.detail}</span>
                  {a.reason && (
                    <span className="mt-1 block text-xs text-muted-foreground">Reason: {a.reason}</span>
                  )}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {a.fromVersion && <span>{a.fromVersion} → </span>}
                  {a.toVersion ? <span className="font-semibold text-ink">{a.toVersion}</span> : !a.fromVersion && "—"}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Audit entries are append-only. Previous contract versions stay retrievable from each contract's history.
        </p>
      </div>
    </>
  );
}
