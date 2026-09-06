import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Upload } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/app-shell";
import { ContractBadge, CountryTag, DemoTag } from "@/components/status";
import { contracts, type ContractStatus } from "@/lib/demo-data";

export const Route = createFileRoute("/app/contracts/")({
  head: () => ({
    meta: [
      { title: "Contracts — Meridian" },
      {
        name: "description",
        content:
          "Search and filter employment contracts by country, employee and compliance status, with full version history.",
      },
      { property: "og:title", content: "Contracts — Meridian" },
      {
        property: "og:description",
        content: "Every tracked employment contract with its compliance status and version history.",
      },
    ],
  }),
  component: Contracts,
});

const statuses: (ContractStatus | "all")[] = ["all", "action-needed", "in-review", "compliant", "draft"];

function Contracts() {
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("all");
  const [status, setStatus] = useState<ContractStatus | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);

  const countries = useMemo(() => ["all", ...new Set(contracts.map((c) => c.country))], []);

  const rows = contracts.filter(
    (c) =>
      (country === "all" || c.country === country) &&
      (status === "all" || c.status === status) &&
      (query === "" ||
        `${c.employee} ${c.id} ${c.entity} ${c.type}`.toLowerCase().includes(query.toLowerCase())),
  );

  return (
    <>
      <PageHeader
        eyebrow="Document library"
        title="Contracts"
        description="Every employment contract Meridian tracks, with its current version, last review and any open compliance issues."
        actions={
          <>
            <DemoTag />
            <button
              onClick={() => toast("Upload is disabled in the sample tour")}
              className="inline-flex items-center gap-2 rounded-md bg-espresso px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-ink"
            >
              <Upload className="h-4 w-4" /> Upload contract
            </button>
          </>
        }
      />

      <div className="px-5 py-8 sm:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-56 flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search employee, entity or contract ID"
              className="w-full rounded-md border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none focus:border-terracotta"
            />
          </div>
          <Select value={country} onChange={setCountry} options={countries} label="Country" />
          <Select
            value={status}
            onChange={(v) => setStatus(v as ContractStatus | "all")}
            options={statuses}
            label="Status"
          />
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-border bg-card">
          <div className="hidden grid-cols-[1.3fr_1fr_1.1fr_0.8fr_0.9fr_0.7fr] gap-4 border-b border-border bg-secondary/60 px-5 py-2.5 lg:grid">
            {["Employee", "Country", "Contract type", "Last reviewed", "Status", "Version"].map((h) => (
              <span key={h} className="label-caps">
                {h}
              </span>
            ))}
          </div>
          <ul className="divide-y divide-border">
            {rows.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                  className="grid w-full gap-2 px-5 py-4 text-left transition-colors hover:bg-secondary/50 lg:grid-cols-[1.3fr_1fr_1.1fr_0.8fr_0.9fr_0.7fr] lg:items-center lg:gap-4"
                >
                  <span>
                    <span className="block text-sm font-medium text-ink">{c.employee}</span>
                    <span className="block text-xs text-muted-foreground">
                      {c.id} · {c.entity}
                    </span>
                  </span>
                  <CountryTag flag={c.flag} country={c.country} />
                  <span className="text-sm text-muted-foreground">{c.type}</span>
                  <span className="text-sm text-muted-foreground">{c.lastReviewed}</span>
                  <span className="flex items-center gap-2">
                    <ContractBadge status={c.status} />
                    {c.pendingIssues > 0 && (
                      <span className="text-xs font-semibold text-terracotta">{c.pendingIssues} issue</span>
                    )}
                  </span>
                  <span className="font-mono text-sm text-ink">{c.version}</span>
                </button>

                {expanded === c.id && (
                  <div className="grid gap-6 border-t border-border bg-secondary/40 px-5 py-5 lg:grid-cols-[1fr_16rem]">
                    <div>
                      <p className="label-caps">Version history</p>
                      <ol className="mt-3 space-y-3">
                        {c.versions.map((v) => (
                          <li key={v.version} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
                            <span className="font-mono font-semibold text-ink">{v.version}</span>
                            <span className="text-muted-foreground">{v.date}</span>
                            <span className="text-foreground">{v.note}</span>
                            <span className="text-xs text-muted-foreground">by {v.author}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="space-y-2">
                      <Link
                        to="/app/contracts/$contractId/review"
                        params={{ contractId: c.id }}
                        className="block rounded-md bg-terracotta px-4 py-2 text-center text-sm font-medium text-terracotta-foreground transition-colors hover:bg-terracotta/90"
                      >
                        Open review workspace
                      </Link>
                      <Link
                        to="/app/employees/$employeeId"
                        params={{ employeeId: c.employeeId }}
                        className="block rounded-md border border-border bg-card px-4 py-2 text-center text-sm font-medium text-foreground transition-colors hover:bg-accent"
                      >
                        View employee
                      </Link>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
          {rows.length === 0 && (
            <p className="px-5 py-10 text-center text-sm text-muted-foreground">No contracts match these filters.</p>
          )}
        </div>
      </div>
    </>
  );
}

function Select({
  value,
  onChange,
  options,
  label,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  label: string;
}) {
  return (
    <label className="flex items-center gap-2">
      <span className="label-caps">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-border bg-card px-3 py-2 text-sm outline-none focus:border-terracotta"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o === "all" ? "All" : o.replace("-", " ")}
          </option>
        ))}
      </select>
    </label>
  );
}
