import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site-chrome";
import { toast } from "sonner";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: "Book a demo — Meridian employment compliance" },
      {
        name: "description",
        content:
          "Walk through Meridian with your own jurisdictions and contract types in a 30-minute guided session.",
      },
      { property: "og:title", content: "Book a demo — Meridian" },
      {
        property: "og:description",
        content: "A 30-minute walkthrough of employment compliance monitoring, impact detection and review.",
      },
    ],
  }),
  component: DemoPage,
});

function DemoPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <section className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:px-8 lg:grid-cols-[1fr_1.1fr] lg:py-20">
        <div>
          <p className="label-caps">Book a demo</p>
          <h1 className="mt-3 font-display text-4xl leading-[1.1] text-ink">
            Thirty minutes, your jurisdictions, your contract types.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            We'll load a sample of the countries you employ in and walk the full loop: a detected change, the
            contracts it touches, and the drafted replacement clause going through review.
          </p>
          <ul className="mt-8 space-y-3 border-t border-border pt-6">
            {[
              "Bring one contract template — we'll show clause matching against it",
              "Includes a walkthrough of the audit trail for legal teams",
              "No installation; contracts can stay in your systems during evaluation",
            ].map((i) => (
              <li key={i} className="text-sm leading-relaxed text-muted-foreground">
                {i}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-card p-7 sm:p-9">
          {sent ? (
            <div>
              <h2 className="font-display text-2xl text-ink">Request received</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                This is a sample form, so nothing was actually sent. Give me the real destination address and I
                can wire it up to send properly.
              </p>
            </div>
          ) : (
            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                toast.success("Demo request captured (sample form)");
              }}
            >
              <h2 className="font-display text-xl text-ink">Request a walkthrough</h2>
              <Field label="Full name" name="name" placeholder="Priya Raman" />
              <Field label="Work email" name="email" type="email" placeholder="priya@company.com" />
              <Field label="Company" name="company" placeholder="Northbeam Group" />
              <div>
                <label className="label-caps" htmlFor="countries">
                  Countries you employ in
                </label>
                <textarea
                  id="countries"
                  rows={3}
                  placeholder="Germany, Spain, Netherlands…"
                  className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-espresso px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-ink"
              >
                Request demo
              </button>
              <p className="text-xs leading-relaxed text-muted-foreground">
                We only ask for what's needed to prepare the session.
              </p>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="label-caps" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-terracotta focus:ring-1 focus:ring-terracotta"
      />
    </div>
  );
}
