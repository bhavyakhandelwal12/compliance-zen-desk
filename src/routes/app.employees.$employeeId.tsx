import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { PageHeader } from "@/components/app-shell";
import { ContractBadge, CountryTag, DemoTag } from "@/components/status";
import { getContract, getEmployee } from "@/lib/demo-data";

export const Route = createFileRoute("/app/employees/$employeeId")({
  loader: ({ params }) => {
    const employee = getEmployee(params.employeeId);
    if (!employee) throw notFound();
    return { employee, contract: getContract(employee.contractId) };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Employee unavailable — Meridian" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.employee.name} — employee compliance — Meridian`;
    const d = `Contract status, compliance alerts and review history for ${loaderData.employee.name} in ${loaderData.employee.country}.`;
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
      <h1 className="font-display text-2xl text-ink">Employee not found</h1>
      <Link to="/app/employees" className="mt-3 inline-block text-sm text-terracotta hover:underline">
        Back to employees
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="px-8 py-16">
      <h1 className="font-display text-2xl text-ink">This profile didn't load</h1>
      <Link to="/app/employees" className="mt-3 inline-block text-sm text-terracotta hover:underline">
        Back to employees
      </Link>
    </div>
  ),
  component: EmployeeDetail,
});

function EmployeeDetail() {
  const { employee, contract } = Route.useLoaderData();

  return (
    <>
      <PageHeader
        eyebrow={`${employee.role} · ${employee.entity}`}
        title={employee.name}
        description="Compliance-relevant employment details only."
        actions={
          <>
            <ContractBadge status={employee.status} />
            <DemoTag />
          </>
        }
      />

      <div className="px-5 py-4 sm:px-8">
        <Link
          to="/app/employees"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-terracotta"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All employees
        </Link>
      </div>

      <div className="grid gap-6 px-5 pb-10 sm:px-8 lg:grid-cols-[1fr_20rem]">
        <div className="space-y-6">
          <Card title="Compliance alerts">
            {employee.alerts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No open alerts. This contract is up to date.</p>
            ) : (
              <ul className="space-y-3">
                {employee.alerts.map((a) => (
                  <li key={a} className="flex gap-3 text-sm leading-relaxed text-foreground">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-terracotta" />
                    {a}
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card title="Contract">
            {contract ? (
              <>
                <dl className="grid gap-4 sm:grid-cols-2">
                  <Row k="Contract" v={`${contract.id} · ${contract.version}`} />
                  <Row k="Type" v={contract.type} />
                  <Row k="Last reviewed" v={contract.lastReviewed} />
                  <Row k="Open issues" v={String(contract.pendingIssues)} />
                </dl>
                <Link
                  to="/app/contracts/$contractId/review"
                  params={{ contractId: contract.id }}
                  className="mt-5 inline-block rounded-md bg-terracotta px-4 py-2 text-sm font-medium text-terracotta-foreground transition-colors hover:bg-terracotta/90"
                >
                  Open review workspace
                </Link>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No contract on file.</p>
            )}
          </Card>

          <Card title="Review history">
            <ol className="space-y-3">
              {employee.history.map((h) => (
                <li key={h.date + h.action} className="flex flex-wrap items-baseline gap-x-3 text-sm">
                  <span className="font-mono text-xs text-muted-foreground">{h.date}</span>
                  <span className="text-foreground">{h.action}</span>
                  <span className="text-xs text-muted-foreground">by {h.actor}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>

        <aside className="space-y-6">
          <Card title="Employment details">
            <div className="mb-4">
              <CountryTag flag={employee.flag} country={employee.country} />
            </div>
            <dl className="space-y-3 text-sm">
              <Row k="Entity" v={employee.entity} />
              <Row k="Start date" v={employee.startDate} />
              <Row k="Next review" v={employee.nextReview} />
            </dl>
          </Card>
        </aside>
      </div>
    </>
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
    <div className="flex items-start justify-between gap-3">
      <dt className="shrink-0 text-muted-foreground">{k}</dt>
      <dd className="text-right font-medium text-ink">{v}</dd>
    </div>
  );
}
