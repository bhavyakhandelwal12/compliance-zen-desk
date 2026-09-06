import { cn } from "@/lib/utils";
import type { ContractStatus, ReviewStatus, Severity } from "@/lib/demo-data";

const base =
  "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.07em]";

const dot = "h-1.5 w-1.5 rounded-full";

const reviewMap: Record<ReviewStatus, { label: string; cls: string; dotCls: string }> = {
  "needs-review": {
    label: "Needs review",
    cls: "border-terracotta/30 bg-terracotta/10 text-terracotta",
    dotCls: "bg-terracotta",
  },
  "in-review": { label: "In review", cls: "border-ochre/40 bg-ochre/15 text-espresso", dotCls: "bg-ochre" },
  approved: { label: "Approved", cls: "border-sage/30 bg-sage/12 text-sage", dotCls: "bg-sage" },
  monitoring: {
    label: "Monitoring",
    cls: "border-border bg-muted text-muted-foreground",
    dotCls: "bg-muted-foreground",
  },
};

const contractMap: Record<ContractStatus, { label: string; cls: string; dotCls: string }> = {
  compliant: { label: "Compliant", cls: "border-sage/30 bg-sage/12 text-sage", dotCls: "bg-sage" },
  "action-needed": {
    label: "Action needed",
    cls: "border-terracotta/30 bg-terracotta/10 text-terracotta",
    dotCls: "bg-terracotta",
  },
  "in-review": { label: "In review", cls: "border-ochre/40 bg-ochre/15 text-espresso", dotCls: "bg-ochre" },
  draft: { label: "Draft", cls: "border-border bg-muted text-muted-foreground", dotCls: "bg-muted-foreground" },
};

const severityMap: Record<Severity, { label: string; cls: string }> = {
  high: { label: "High impact", cls: "border-terracotta/30 bg-terracotta/10 text-terracotta" },
  medium: { label: "Medium", cls: "border-ochre/40 bg-ochre/15 text-espresso" },
  low: { label: "Low", cls: "border-border bg-muted text-muted-foreground" },
};

export function ReviewBadge({ status, className }: { status: ReviewStatus; className?: string }) {
  const s = reviewMap[status];
  return (
    <span className={cn(base, s.cls, className)}>
      <span className={cn(dot, s.dotCls)} />
      {s.label}
    </span>
  );
}

export function ContractBadge({ status, className }: { status: ContractStatus; className?: string }) {
  const s = contractMap[status];
  return (
    <span className={cn(base, s.cls, className)}>
      <span className={cn(dot, s.dotCls)} />
      {s.label}
    </span>
  );
}

export function SeverityBadge({ severity, className }: { severity: Severity; className?: string }) {
  const s = severityMap[severity];
  return <span className={cn(base, s.cls, className)}>{s.label}</span>;
}

export function CountryTag({ flag, country }: { flag: string; country: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-foreground">
      <span className="inline-flex h-5 w-7 items-center justify-center rounded-[3px] border border-border bg-secondary font-mono text-[10px] font-semibold tracking-wide text-espresso">
        {flag}
      </span>
      {country}
    </span>
  );
}

export function DemoTag() {
  return (
    <span className="inline-flex items-center rounded-sm border border-border bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.09em] text-muted-foreground">
      Demo data
    </span>
  );
}
