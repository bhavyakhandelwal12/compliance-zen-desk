// Demo data used to illustrate the product experience.
// All records below are illustrative sample data, not real customer information.

export type Severity = "high" | "medium" | "low";
export type ReviewStatus = "needs-review" | "in-review" | "approved" | "monitoring";
export type ContractStatus = "compliant" | "action-needed" | "in-review" | "draft";

export interface LegalChange {
  id: string;
  country: string;
  flag: string;
  topic: string;
  title: string;
  detected: string;
  effective: string;
  severity: Severity;
  status: ReviewStatus;
  affectedContracts: number;
  affectedEmployees: number;
  summary: string;
  whatChanged: string[];
  whyItMatters: string;
  source: string;
  confidence: number;
  existingClause: { heading: string; text: string; highlight: string };
  analysis: string[];
  suggestedClause: { heading: string; text: string };
  diff: { type: "same" | "added" | "removed"; text: string }[];
}

export interface Contract {
  id: string;
  employee: string;
  employeeId: string;
  country: string;
  flag: string;
  type: string;
  entity: string;
  lastReviewed: string;
  status: ContractStatus;
  version: string;
  pendingIssues: number;
  changeId?: string;
  versions: { version: string; date: string; author: string; note: string }[];
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  country: string;
  flag: string;
  entity: string;
  contractId: string;
  contractType: string;
  status: ContractStatus;
  startDate: string;
  nextReview: string;
  alerts: string[];
  history: { date: string; action: string; actor: string }[];
}

export interface AuditEntry {
  id: string;
  timestamp: string;
  actor: string;
  role: string;
  action: string;
  target: string;
  detail: string;
  fromVersion?: string;
  toVersion?: string;
  reason?: string;
}

export const overview = {
  compliantPercent: 98,
  changesRequiringReview: 3,
  contractsAffected: 31,
  countriesMonitored: 14,
  employeesCovered: 268,
  contractsTracked: 274,
  openIssues: 5,
  pendingReviews: 4,
};

export const legalChanges: LegalChange[] = [
  {
    id: "de-working-time-2026",
    country: "Germany",
    flag: "DE",
    topic: "Working Time Regulation",
    title: "Germany — Working Time Regulation Update",
    detected: "12 Aug 2026",
    effective: "1 Oct 2026",
    severity: "high",
    status: "needs-review",
    affectedContracts: 23,
    affectedEmployees: 23,
    summary:
      "Employers must record the start, end and duration of daily working time electronically, and contracts must state how hours are recorded.",
    whatChanged: [
      "Daily working time must be recorded electronically on the day the work is performed.",
      "The employment contract has to name the recording system and who is responsible for it.",
      "Trust-based working time is still allowed, but only if recording still happens.",
    ],
    whyItMatters:
      "Contracts that only mention a weekly hours figure no longer describe how time is recorded. Without that wording, the employer carries the risk in a labour inspection and cannot rely on the contract as evidence of compliance.",
    source: "Arbeitszeitgesetz (ArbZG) amendment, Bundesgesetzblatt I 2026",
    confidence: 92,
    existingClause: {
      heading: "§ 4 Working Hours",
      text: "The regular weekly working time is 40 hours, distributed from Monday to Friday. The Employee is expected to manage their own working hours in agreement with their manager. Overtime is compensated in accordance with the applicable company policy.",
      highlight: "The Employee is expected to manage their own working hours in agreement with their manager.",
    },
    analysis: [
      "The clause describes trust-based hours but never states that working time is recorded.",
      "No recording system is named, so the contract cannot evidence the new electronic-record duty.",
      "Responsibility for keeping the record is not assigned to either party.",
    ],
    suggestedClause: {
      heading: "§ 4 Working Hours and Time Recording",
      text: "The regular weekly working time is 40 hours, distributed from Monday to Friday. The Employee records the start, end and duration of daily working time on the same working day in the Company's electronic time-recording system. The Employee may arrange their hours flexibly in agreement with their manager, provided the recording obligation is met. The Company remains responsible for storing the records for the statutory retention period. Overtime is compensated in accordance with the applicable company policy.",
    },
    diff: [
      { type: "same", text: "The regular weekly working time is 40 hours, distributed from Monday to Friday. " },
      {
        type: "removed",
        text: "The Employee is expected to manage their own working hours in agreement with their manager. ",
      },
      {
        type: "added",
        text: "The Employee records the start, end and duration of daily working time on the same working day in the Company's electronic time-recording system. The Employee may arrange their hours flexibly in agreement with their manager, provided the recording obligation is met. The Company remains responsible for storing the records for the statutory retention period. ",
      },
      { type: "same", text: "Overtime is compensated in accordance with the applicable company policy." },
    ],
  },
  {
    id: "es-remote-work-allowance",
    country: "Spain",
    flag: "ES",
    topic: "Remote Work Allowance",
    title: "Spain — Remote Work Expense Reimbursement",
    detected: "28 Jul 2026",
    effective: "1 Sep 2026",
    severity: "medium",
    status: "in-review",
    affectedContracts: 6,
    affectedEmployees: 6,
    summary:
      "Remote-work agreements must quantify the expense reimbursement rather than refer to a policy document.",
    whatChanged: [
      "The reimbursable amount for remote work must be stated as a figure in the agreement.",
      "The review cadence for that amount must be written down.",
    ],
    whyItMatters:
      "Referring to an internal policy is no longer enough. Six Spanish contracts point to a policy PDF instead of naming an amount, which makes them challengeable.",
    source: "Ley 10/2021 de trabajo a distancia, implementing decree 2026",
    confidence: 88,
    existingClause: {
      heading: "Clause 9 — Remote Work",
      text: "Where the Employee works remotely, the Company shall reimburse reasonable expenses in accordance with the Company's Remote Work Policy as amended from time to time.",
      highlight: "in accordance with the Company's Remote Work Policy as amended from time to time",
    },
    analysis: [
      "The clause defers entirely to an internal policy that can change without the employee's agreement.",
      "No monetary amount is stated, which the amended decree now requires.",
    ],
    suggestedClause: {
      heading: "Clause 9 — Remote Work",
      text: "Where the Employee works remotely, the Company shall pay a remote-work allowance of EUR 55 per month covering connectivity and energy costs. The amount will be reviewed annually with the Employee's representatives and may not be reduced without written agreement.",
    },
    diff: [
      { type: "same", text: "Where the Employee works remotely, the Company shall " },
      {
        type: "removed",
        text: "reimburse reasonable expenses in accordance with the Company's Remote Work Policy as amended from time to time.",
      },
      {
        type: "added",
        text: "pay a remote-work allowance of EUR 55 per month covering connectivity and energy costs. The amount will be reviewed annually with the Employee's representatives and may not be reduced without written agreement.",
      },
    ],
  },
  {
    id: "nl-probation-limit",
    country: "Netherlands",
    flag: "NL",
    topic: "Probation Periods",
    title: "Netherlands — Probation Period Limits Tightened",
    detected: "3 Aug 2026",
    effective: "1 Jan 2027",
    severity: "medium",
    status: "needs-review",
    affectedContracts: 2,
    affectedEmployees: 2,
    summary: "Fixed-term contracts under two years may no longer carry a two-month probation period.",
    whatChanged: [
      "Maximum probation on contracts shorter than two years drops to one month.",
      "A longer probation clause becomes void, not merely shortened.",
    ],
    whyItMatters:
      "Two Dutch fixed-term contracts still state two months. From January those clauses fall away entirely, removing the probation protection the company assumed it had.",
    source: "Burgerlijk Wetboek Boek 7, art. 652 amendment",
    confidence: 95,
    existingClause: {
      heading: "Article 3 — Probationary Period",
      text: "The first two (2) months of employment constitute a probationary period during which either party may terminate this agreement with immediate effect.",
      highlight: "The first two (2) months of employment constitute a probationary period",
    },
    analysis: [
      "The contract term is 12 months, so the maximum permitted probation becomes one month.",
      "An over-long probation clause is void in full under the amended article.",
    ],
    suggestedClause: {
      heading: "Article 3 — Probationary Period",
      text: "The first one (1) month of employment constitutes a probationary period during which either party may terminate this agreement with immediate effect.",
    },
    diff: [
      { type: "same", text: "The first " },
      { type: "removed", text: "two (2) months" },
      { type: "added", text: "one (1) month" },
      { type: "same", text: " of employment " },
      { type: "removed", text: "constitute" },
      { type: "added", text: "constitutes" },
      {
        type: "same",
        text: " a probationary period during which either party may terminate this agreement with immediate effect.",
      },
    ],
  },
  {
    id: "fr-pay-transparency",
    country: "France",
    flag: "FR",
    topic: "Pay Transparency",
    title: "France — Pay Transparency Reporting",
    detected: "19 Jun 2026",
    effective: "1 Mar 2027",
    severity: "low",
    status: "monitoring",
    affectedContracts: 0,
    affectedEmployees: 41,
    summary:
      "Employers above 100 staff must publish pay bands per role family. No contract wording change is required yet.",
    whatChanged: [
      "Annual pay-band reporting per role family.",
      "Candidates must be told the band before the first interview.",
    ],
    whyItMatters:
      "This affects hiring process and reporting rather than existing contract clauses, so no contract updates are queued.",
    source: "Transposition of EU Pay Transparency Directive 2023/970",
    confidence: 90,
    existingClause: {
      heading: "Article 5 — Remuneration",
      text: "The Employee receives an annual gross salary of EUR 62,000 paid in twelve monthly instalments.",
      highlight: "annual gross salary of EUR 62,000",
    },
    analysis: ["No clause change required. Reporting and hiring processes are affected instead."],
    suggestedClause: {
      heading: "Article 5 — Remuneration",
      text: "No change proposed. This regulation is tracked for reporting obligations only.",
    },
    diff: [
      {
        type: "same",
        text: "The Employee receives an annual gross salary of EUR 62,000 paid in twelve monthly instalments.",
      },
    ],
  },
  {
    id: "ie-sick-leave",
    country: "Ireland",
    flag: "IE",
    topic: "Statutory Sick Leave",
    title: "Ireland — Statutory Sick Leave Extended",
    detected: "5 Aug 2026",
    effective: "1 Jan 2027",
    severity: "medium",
    status: "approved",
    affectedContracts: 4,
    affectedEmployees: 4,
    summary: "Paid statutory sick leave rises from five to seven days per year.",
    whatChanged: ["Entitlement increases to seven days.", "Daily cap adjusted in line with earnings threshold."],
    whyItMatters:
      "Contracts quoting the five-day entitlement would understate the minimum. Updated wording was approved on 22 Aug 2026.",
    source: "Sick Leave Act 2022, Commencement Order 2026",
    confidence: 96,
    existingClause: {
      heading: "Clause 12 — Sick Leave",
      text: "The Employee is entitled to five (5) days of statutory sick pay in each calendar year, subject to certification.",
      highlight: "five (5) days of statutory sick pay",
    },
    analysis: ["The stated entitlement falls below the new statutory minimum from 1 January 2027."],
    suggestedClause: {
      heading: "Clause 12 — Sick Leave",
      text: "The Employee is entitled to seven (7) days of statutory sick pay in each calendar year, subject to certification, or such greater entitlement as the law requires from time to time.",
    },
    diff: [
      { type: "same", text: "The Employee is entitled to " },
      { type: "removed", text: "five (5) days" },
      { type: "added", text: "seven (7) days" },
      { type: "same", text: " of statutory sick pay in each calendar year, subject to certification" },
      { type: "added", text: ", or such greater entitlement as the law requires from time to time" },
      { type: "same", text: "." },
    ],
  },
];

export const contracts: Contract[] = [
  {
    id: "c-1042",
    employee: "Lena Hoffmann",
    employeeId: "e-201",
    country: "Germany",
    flag: "DE",
    type: "Permanent — Full time",
    entity: "Northbeam GmbH",
    lastReviewed: "14 Mar 2026",
    status: "action-needed",
    version: "v3.1",
    pendingIssues: 1,
    changeId: "de-working-time-2026",
    versions: [
      { version: "v3.1", date: "14 Mar 2026", author: "Priya Raman", note: "Annual salary review" },
      { version: "v2.4", date: "02 Sep 2025", author: "Tomás Neves", note: "Remote work addendum" },
      { version: "v1.0", date: "11 Jan 2024", author: "Priya Raman", note: "Initial contract" },
    ],
  },
  {
    id: "c-1043",
    employee: "Jonas Weber",
    employeeId: "e-202",
    country: "Germany",
    flag: "DE",
    type: "Permanent — Full time",
    entity: "Northbeam GmbH",
    lastReviewed: "09 Feb 2026",
    status: "action-needed",
    version: "v2.0",
    pendingIssues: 1,
    changeId: "de-working-time-2026",
    versions: [
      { version: "v2.0", date: "09 Feb 2026", author: "Priya Raman", note: "Role change to Senior Engineer" },
      { version: "v1.0", date: "20 Jun 2024", author: "Priya Raman", note: "Initial contract" },
    ],
  },
  {
    id: "c-1078",
    employee: "Marta Ruiz",
    employeeId: "e-214",
    country: "Spain",
    flag: "ES",
    type: "Permanent — Remote",
    entity: "Northbeam Iberia SL",
    lastReviewed: "30 Jul 2026",
    status: "in-review",
    version: "v1.6",
    pendingIssues: 1,
    changeId: "es-remote-work-allowance",
    versions: [
      { version: "v1.6", date: "30 Jul 2026", author: "Anneke de Vries", note: "Remote allowance draft" },
      { version: "v1.0", date: "04 Apr 2025", author: "Priya Raman", note: "Initial contract" },
    ],
  },
  {
    id: "c-1091",
    employee: "Sanne Bakker",
    employeeId: "e-220",
    country: "Netherlands",
    flag: "NL",
    type: "Fixed term — 12 months",
    entity: "Northbeam BV",
    lastReviewed: "12 May 2026",
    status: "action-needed",
    version: "v1.2",
    pendingIssues: 1,
    changeId: "nl-probation-limit",
    versions: [
      { version: "v1.2", date: "12 May 2026", author: "Anneke de Vries", note: "Extension to 12 months" },
      { version: "v1.0", date: "12 Nov 2025", author: "Anneke de Vries", note: "Initial contract" },
    ],
  },
  {
    id: "c-1105",
    employee: "Cormac Doyle",
    employeeId: "e-231",
    country: "Ireland",
    flag: "IE",
    type: "Permanent — Full time",
    entity: "Northbeam Ireland Ltd",
    lastReviewed: "22 Aug 2026",
    status: "compliant",
    version: "v2.2",
    pendingIssues: 0,
    changeId: "ie-sick-leave",
    versions: [
      { version: "v2.2", date: "22 Aug 2026", author: "Julia Fenn", note: "Sick leave entitlement updated" },
      { version: "v2.0", date: "17 Jan 2026", author: "Julia Fenn", note: "Pension provider change" },
      { version: "v1.0", date: "03 Mar 2023", author: "Priya Raman", note: "Initial contract" },
    ],
  },
  {
    id: "c-1112",
    employee: "Amélie Laurent",
    employeeId: "e-244",
    country: "France",
    flag: "FR",
    type: "CDI — Full time",
    entity: "Northbeam France SAS",
    lastReviewed: "18 Jun 2026",
    status: "compliant",
    version: "v1.4",
    pendingIssues: 0,
    versions: [
      { version: "v1.4", date: "18 Jun 2026", author: "Julia Fenn", note: "Annual review" },
      { version: "v1.0", date: "09 Sep 2024", author: "Julia Fenn", note: "Initial contract" },
    ],
  },
  {
    id: "c-1120",
    employee: "Oskar Lind",
    employeeId: "e-252",
    country: "Sweden",
    flag: "SE",
    type: "Permanent — Full time",
    entity: "Northbeam Nordics AB",
    lastReviewed: "02 Apr 2026",
    status: "compliant",
    version: "v1.1",
    pendingIssues: 0,
    versions: [{ version: "v1.1", date: "02 Apr 2026", author: "Tomás Neves", note: "Initial contract" }],
  },
  {
    id: "c-1133",
    employee: "Beatriz Alves",
    employeeId: "e-260",
    country: "Portugal",
    flag: "PT",
    type: "Permanent — Remote",
    entity: "Northbeam Iberia SL",
    lastReviewed: "27 Aug 2026",
    status: "draft",
    version: "v0.9",
    pendingIssues: 0,
    versions: [{ version: "v0.9", date: "27 Aug 2026", author: "Tomás Neves", note: "Draft awaiting signature" }],
  },
];

export const employees: Employee[] = [
  {
    id: "e-201",
    name: "Lena Hoffmann",
    role: "Product Designer",
    country: "Germany",
    flag: "DE",
    entity: "Northbeam GmbH",
    contractId: "c-1042",
    contractType: "Permanent — Full time",
    status: "action-needed",
    startDate: "11 Jan 2024",
    nextReview: "1 Oct 2026",
    alerts: ["Working Time Regulation Update — clause replacement pending"],
    history: [
      { date: "12 Aug 2026", action: "Flagged by working-time change", actor: "System" },
      { date: "14 Mar 2026", action: "Contract updated to v3.1", actor: "Priya Raman" },
    ],
  },
  {
    id: "e-202",
    name: "Jonas Weber",
    role: "Senior Engineer",
    country: "Germany",
    flag: "DE",
    entity: "Northbeam GmbH",
    contractId: "c-1043",
    contractType: "Permanent — Full time",
    status: "action-needed",
    startDate: "20 Jun 2024",
    nextReview: "1 Oct 2026",
    alerts: ["Working Time Regulation Update — clause replacement pending"],
    history: [
      { date: "12 Aug 2026", action: "Flagged by working-time change", actor: "System" },
      { date: "09 Feb 2026", action: "Contract updated to v2.0", actor: "Priya Raman" },
    ],
  },
  {
    id: "e-214",
    name: "Marta Ruiz",
    role: "Account Executive",
    country: "Spain",
    flag: "ES",
    entity: "Northbeam Iberia SL",
    contractId: "c-1078",
    contractType: "Permanent — Remote",
    status: "in-review",
    startDate: "04 Apr 2025",
    nextReview: "1 Sep 2026",
    alerts: ["Remote work allowance must be stated as an amount"],
    history: [{ date: "30 Jul 2026", action: "Draft clause generated", actor: "Compliance engine" }],
  },
  {
    id: "e-220",
    name: "Sanne Bakker",
    role: "Data Analyst",
    country: "Netherlands",
    flag: "NL",
    entity: "Northbeam BV",
    contractId: "c-1091",
    contractType: "Fixed term — 12 months",
    status: "action-needed",
    startDate: "12 Nov 2025",
    nextReview: "1 Jan 2027",
    alerts: ["Probation clause becomes void from 1 Jan 2027"],
    history: [{ date: "03 Aug 2026", action: "Flagged by probation change", actor: "System" }],
  },
  {
    id: "e-231",
    name: "Cormac Doyle",
    role: "Support Lead",
    country: "Ireland",
    flag: "IE",
    entity: "Northbeam Ireland Ltd",
    contractId: "c-1105",
    contractType: "Permanent — Full time",
    status: "compliant",
    startDate: "03 Mar 2023",
    nextReview: "1 Mar 2027",
    alerts: [],
    history: [{ date: "22 Aug 2026", action: "Sick leave clause approved", actor: "Julia Fenn" }],
  },
  {
    id: "e-244",
    name: "Amélie Laurent",
    role: "Finance Manager",
    country: "France",
    flag: "FR",
    entity: "Northbeam France SAS",
    contractId: "c-1112",
    contractType: "CDI — Full time",
    status: "compliant",
    startDate: "09 Sep 2024",
    nextReview: "1 Mar 2027",
    alerts: ["Pay transparency reporting from 1 Mar 2027 (no contract change)"],
    history: [{ date: "18 Jun 2026", action: "Annual review completed", actor: "Julia Fenn" }],
  },
  {
    id: "e-252",
    name: "Oskar Lind",
    role: "Engineering Manager",
    country: "Sweden",
    flag: "SE",
    entity: "Northbeam Nordics AB",
    contractId: "c-1120",
    contractType: "Permanent — Full time",
    status: "compliant",
    startDate: "02 Apr 2026",
    nextReview: "1 Apr 2027",
    alerts: [],
    history: [{ date: "02 Apr 2026", action: "Contract uploaded", actor: "Tomás Neves" }],
  },
  {
    id: "e-260",
    name: "Beatriz Alves",
    role: "Customer Researcher",
    country: "Portugal",
    flag: "PT",
    entity: "Northbeam Iberia SL",
    contractId: "c-1133",
    contractType: "Permanent — Remote",
    status: "draft",
    startDate: "15 Sep 2026",
    nextReview: "15 Mar 2027",
    alerts: ["Contract draft awaiting signature"],
    history: [{ date: "27 Aug 2026", action: "Draft created", actor: "Tomás Neves" }],
  },
];

export const auditTrail: AuditEntry[] = [
  {
    id: "a-1",
    timestamp: "22 Aug 2026 · 16:04",
    actor: "Julia Fenn",
    role: "Legal",
    action: "Approved clause update",
    target: "Cormac Doyle — c-1105",
    detail: "Sick leave entitlement raised to seven days",
    fromVersion: "v2.0",
    toVersion: "v2.2",
    reason: "Sick Leave Act commencement order 2026",
  },
  {
    id: "a-2",
    timestamp: "22 Aug 2026 · 15:41",
    actor: "Julia Fenn",
    role: "Legal",
    action: "Edited generated draft",
    target: "Cormac Doyle — c-1105",
    detail: "Added 'or such greater entitlement as the law requires'",
    fromVersion: "v2.1-draft",
    toVersion: "v2.2-draft",
    reason: "Future-proof wording",
  },
  {
    id: "a-3",
    timestamp: "13 Aug 2026 · 09:12",
    actor: "Compliance engine",
    role: "System",
    action: "Generated replacement clause",
    target: "Lena Hoffmann — c-1042",
    detail: "Draft created for § 4 Working Hours",
    fromVersion: "v3.1",
    toVersion: "v3.2-draft",
    reason: "ArbZG amendment effective 1 Oct 2026",
  },
  {
    id: "a-4",
    timestamp: "12 Aug 2026 · 07:30",
    actor: "Compliance engine",
    role: "System",
    action: "Detected legal change",
    target: "Germany — Working Time Regulation",
    detail: "23 contracts matched by clause pattern",
    reason: "Bundesgesetzblatt I 2026 publication",
  },
  {
    id: "a-5",
    timestamp: "30 Jul 2026 · 11:58",
    actor: "Anneke de Vries",
    role: "HR",
    action: "Opened review",
    target: "Marta Ruiz — c-1078",
    detail: "Remote work allowance clause",
  },
  {
    id: "a-6",
    timestamp: "27 Aug 2026 · 10:22",
    actor: "Tomás Neves",
    role: "HR",
    action: "Uploaded contract",
    target: "Beatriz Alves — c-1133",
    detail: "Draft contract, Portugal",
    toVersion: "v0.9",
  },
];

export const monitoredCountries = [
  { country: "Germany", flag: "DE", employees: 62, changes: 1 },
  { country: "France", flag: "FR", employees: 41, changes: 1 },
  { country: "Spain", flag: "ES", employees: 28, changes: 1 },
  { country: "Netherlands", flag: "NL", employees: 24, changes: 1 },
  { country: "Ireland", flag: "IE", employees: 19, changes: 1 },
  { country: "Sweden", flag: "SE", employees: 17, changes: 0 },
  { country: "Portugal", flag: "PT", employees: 14, changes: 0 },
  { country: "Poland", flag: "PL", employees: 13, changes: 0 },
  { country: "Italy", flag: "IT", employees: 11, changes: 0 },
  { country: "Belgium", flag: "BE", employees: 10, changes: 0 },
  { country: "Denmark", flag: "DK", employees: 9, changes: 0 },
  { country: "Finland", flag: "FI", employees: 8, changes: 0 },
  { country: "Austria", flag: "AT", employees: 7, changes: 0 },
  { country: "Czechia", flag: "CZ", employees: 5, changes: 0 },
];

export const teamMembers = [
  { name: "Priya Raman", email: "priya@northbeam.example", role: "Admin", lastActive: "Today" },
  { name: "Julia Fenn", email: "julia@northbeam.example", role: "Legal", lastActive: "Today" },
  { name: "Anneke de Vries", email: "anneke@northbeam.example", role: "HR", lastActive: "Yesterday" },
  { name: "Tomás Neves", email: "tomas@northbeam.example", role: "Reviewer", lastActive: "3 days ago" },
  { name: "Marcus Bell", email: "marcus@northbeam.example", role: "Viewer", lastActive: "2 weeks ago" },
];

export const entities = [
  { name: "Northbeam GmbH", country: "Germany", employees: 62 },
  { name: "Northbeam France SAS", country: "France", employees: 41 },
  { name: "Northbeam Iberia SL", country: "Spain", employees: 42 },
  { name: "Northbeam BV", country: "Netherlands", employees: 24 },
  { name: "Northbeam Ireland Ltd", country: "Ireland", employees: 19 },
  { name: "Northbeam Nordics AB", country: "Sweden", employees: 34 },
];

export function getChange(id: string) {
  return legalChanges.find((c) => c.id === id);
}
export function getContract(id: string) {
  return contracts.find((c) => c.id === id);
}
export function getEmployee(id: string) {
  return employees.find((e) => e.id === id);
}
