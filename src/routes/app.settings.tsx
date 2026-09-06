import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader } from "@/components/app-shell";
import { CountryTag, DemoTag } from "@/components/status";
import { entities, monitoredCountries, teamMembers } from "@/lib/demo-data";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Meridian" },
      {
        name: "description",
        content: "Manage your organisation, entities, users and roles, monitored countries and notifications.",
      },
      { property: "og:title", content: "Settings — Meridian" },
      {
        property: "og:description",
        content: "Organisation, users and roles, monitored countries and notification preferences.",
      },
    ],
  }),
  component: SettingsPage,
});

const tabs = ["Organisation", "Users & roles", "Countries", "Notifications"] as const;

function SettingsPage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Organisation");

  return (
    <>
      <PageHeader eyebrow="Configuration" title="Settings" actions={<DemoTag />} />

      <div className="px-5 py-8 sm:px-8">
        <div className="flex flex-wrap gap-2 border-b border-border pb-4">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={
                "rounded-md px-3 py-1.5 text-sm transition-colors " +
                (tab === t ? "bg-espresso text-primary-foreground" : "text-muted-foreground hover:bg-accent")
              }
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-6">
          {tab === "Organisation" && (
            <>
              <Card title="Company information">
                <dl className="grid gap-4 sm:grid-cols-2">
                  <Row k="Legal name" v="Northbeam Group Holdings" />
                  <Row k="Headquarters" v="Amsterdam, Netherlands" />
                  <Row k="Employees covered" v="268" />
                  <Row k="Plan" v="Enterprise" />
                </dl>
              </Card>
              <Card title="Entities">
                <ul className="divide-y divide-border">
                  {entities.map((e) => (
                    <li key={e.name} className="flex items-center justify-between py-3 text-sm">
                      <span className="font-medium text-ink">{e.name}</span>
                      <span className="text-muted-foreground">
                        {e.country} · {e.employees} employees
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </>
          )}

          {tab === "Users & roles" && (
            <Card title="Users & roles">
              <ul className="divide-y divide-border">
                {teamMembers.map((m) => (
                  <li key={m.email} className="flex flex-wrap items-center justify-between gap-3 py-3">
                    <span>
                      <span className="block text-sm font-medium text-ink">{m.name}</span>
                      <span className="block text-xs text-muted-foreground">{m.email}</span>
                    </span>
                    <span className="flex items-center gap-4">
                      <span className="rounded-sm border border-border bg-secondary px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.07em] text-espresso">
                        {m.role}
                      </span>
                      <span className="text-xs text-muted-foreground">{m.lastActive}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
                Roles: Admin manages settings and users · HR manages employees and contracts · Legal approves
                clause changes · Reviewer comments and drafts · Viewer has read-only access.
              </p>
            </Card>
          )}

          {tab === "Countries" && (
            <Card title="Countries monitored">
              <ul className="grid gap-px bg-border sm:grid-cols-2">
                {monitoredCountries.map((c) => (
                  <li key={c.country} className="flex items-center justify-between bg-card px-1 py-3">
                    <CountryTag flag={c.flag} country={c.country} />
                    <span className="text-xs text-muted-foreground">
                      {c.employees} staff · {c.changes} open change{c.changes === 1 ? "" : "s"}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {tab === "Notifications" && (
            <Card title="Notifications">
              <ul className="divide-y divide-border">
                {[
                  ["Email alerts", "Send compliance emails to my work address", true],
                  ["Compliance alerts", "Notify me when a change affects a contract I own", true],
                  ["Contract review reminders", "Remind reviewers 7 days before an effective date", true],
                  ["Regulatory-change notifications", "Notify me of every detected change, including low severity", false],
                ].map(([title, desc, on]) => (
                  <Toggle key={String(title)} title={String(title)} desc={String(desc)} initial={Boolean(on)} />
                ))}
              </ul>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}

function Toggle({ title, desc, initial }: { title: string; desc: string; initial: boolean }) {
  const [on, setOn] = useState(initial);
  return (
    <li className="flex items-center justify-between gap-4 py-4">
      <span>
        <span className="block text-sm font-medium text-ink">{title}</span>
        <span className="block text-xs text-muted-foreground">{desc}</span>
      </span>
      <button
        role="switch"
        aria-checked={on}
        aria-label={title}
        onClick={() => setOn((v) => !v)}
        className={
          "relative h-6 w-11 shrink-0 rounded-full border transition-colors " +
          (on ? "border-sage bg-sage" : "border-border bg-muted")
        }
      >
        <span
          className={
            "absolute top-0.5 h-4.5 w-4.5 rounded-full bg-card transition-transform " +
            (on ? "translate-x-5.5" : "translate-x-0.5")
          }
          style={{ height: "1.125rem", width: "1.125rem" }}
        />
      </button>
    </li>
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

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-start justify-between gap-3 text-sm">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right font-medium text-ink">{v}</dd>
    </div>
  );
}
