import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { ContractBadge, CountryTag, DemoTag } from "@/components/status";
import { employees } from "@/lib/demo-data";

export const Route = createFileRoute("/app/employees/")({
  head: () => ({
    meta: [
      { title: "Employee compliance — Meridian" },
      {
        name: "description",
        content:
          "Directory of employees with their country, entity, contract status and open compliance alerts.",
      },
      { property: "og:title", content: "Employee compliance — Meridian" },
      {
        property: "og:description",
        content: "Who is covered, where, and which compliance alerts affect them.",
      },
    ],
  }),
  component: Employees,
});

function Employees() {
  const [query, setQuery] = useState("");
  const rows = employees.filter((e) =>
    `${e.name} ${e.country} ${e.entity} ${e.role}`.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <>
      <PageHeader
        eyebrow="Workforce"
        title="Employee compliance"
        description="Only the employment details needed for compliance checks are stored — no personal data beyond that."
        actions={<DemoTag />}
      />

      <div className="px-5 py-8 sm:px-8">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, country or entity"
            className="w-full rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none focus:border-terracotta"
          />
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-border bg-card">
          <div className="hidden grid-cols-[1.3fr_1fr_1.2fr_1fr_1fr] gap-4 border-b border-border bg-secondary/60 px-5 py-2.5 lg:grid">
            {["Employee", "Country", "Entity", "Contract", "Status"].map((h) => (
              <span key={h} className="label-caps">
                {h}
              </span>
            ))}
          </div>
          <ul className="divide-y divide-border">
            {rows.map((e) => (
              <li key={e.id}>
                <Link
                  to="/app/employees/$employeeId"
                  params={{ employeeId: e.id }}
                  className="grid gap-2 px-5 py-4 transition-colors hover:bg-secondary/50 lg:grid-cols-[1.3fr_1fr_1.2fr_1fr_1fr] lg:items-center lg:gap-4"
                >
                  <span>
                    <span className="block text-sm font-medium text-ink">{e.name}</span>
                    <span className="block text-xs text-muted-foreground">{e.role}</span>
                  </span>
                  <CountryTag flag={e.flag} country={e.country} />
                  <span className="text-sm text-muted-foreground">{e.entity}</span>
                  <span className="text-sm text-muted-foreground">{e.contractType}</span>
                  <span className="flex items-center gap-2">
                    <ContractBadge status={e.status} />
                    {e.alerts.length > 0 && (
                      <span className="text-xs font-semibold text-terracotta">{e.alerts.length} alert</span>
                    )}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          {rows.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">No employees match that search.</p>
          )}
        </div>
      </div>
    </>
  );
}
