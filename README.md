# Kindred Compliance

We are building an AI-powered Employment Law Compliance Platform for companies that employ people internationally.

Companies can upload employment contracts and employee information into the platform. The system monitors employment law changes across countries, determines which employees and contracts could be affected, explains the compliance impact, and helps generate updated contracts for human review.

The interface should make a complicated legal-compliance workflow feel extremely simple.

The core feeling should be:

“I always know what changed, what it affects, and what I need to do.”

Design Direction

Do NOT make the website look like typical AI-generated SaaS.

Avoid:

Purple/blue AI gradients

Excessive glassmorphism

Huge glowing backgrounds

Futuristic robot imagery

Random floating cards

Overly rounded everything

Excessive shadows

Generic “AI-powered” visual clichés

Fake statistics

Fake customer logos

Fake testimonials

Unnecessary animations

Dashboard designs that exist only for decoration

Instead, use a warm editorial enterprise aesthetic.

Visual language

Use a warm color palette such as:

Warm ivory / off-white backgrounds

Soft cream sections

Warm charcoal typography

Deep brown / espresso accents

Muted terracotta or burnt orange for important actions

Subtle sage/olive accents where appropriate

The exact colors can be refined, but the overall palette must feel:

Warm + premium + trustworthy + sophisticated + human.

Think more:

modern legal firm + premium fintech + calm enterprise software

and less:

AI startup landing page template.

Typography

Use a sophisticated typography system.

Headings should feel editorial and confident.

Body text should be highly readable and professional.

Use strong hierarchy between:

Page title

Section heading

Supporting text

Labels

Metadata

Status indicators

Buttons

Avoid unnecessarily oversized typography.

Website Structure

Create a complete product experience rather than only a landing page.

1. Landing Page

Hero

Primary message should communicate the core value immediately.

Suggested positioning:

Employment compliance, without the constant legal chase.

Supporting message:

Monitor employment law changes, identify affected contracts, and prepare compliant updates from one place.

Primary CTA:

See how it works

Secondary CTA:

Book a demo

The hero should feel confident and understated.

Do not use generic AI imagery.

Instead, create a product-focused visual showing a believable compliance workflow.

Example:

Law changed → Contracts affected → AI analysis → Review → Approved

The UI itself should demonstrate the product.

2. Problem Section

Explain the actual problem companies face when managing employees across countries.

Focus on:

Employment laws changing constantly

Contracts becoming outdated

Difficulty tracking changes across countries

Legal teams spending time on repetitive reviews

HR teams lacking visibility into compliance risk

Do not over-explain.

Use concise, strong copy.

3. How It Works

Show the actual workflow in 4–5 steps:

01 — Connect your workforce

Add employees, countries, contracts, and relevant employment information.

02 — Monitor regulations

Continuously track relevant employment-law changes.

03 — Detect impact

Identify which contracts, employees, policies, or locations may be affected.

04 — Review changes

Show exactly what changed and explain why the existing contract may need updating.

05 — Approve & maintain

Generate an updated draft, have HR/legal review it, approve it, and maintain a complete version history.

Make this section highly visual.

4. Product Dashboard

Build a realistic authenticated application dashboard.

The dashboard should feel like an actual enterprise product.

Dashboard overview

Include:

Compliance Status

Countries monitored

Employees covered

Contracts tracked

Open compliance issues

Pending reviews

Example layout:

Compliance Overview

98% Compliant

3 Changes Requiring Review

2 Contracts Affected

14 Countries Monitored

Do not use fake numbers unless clearly labeled as demo data.

5. Compliance Changes

Create a page showing detected legal/regulatory changes.

Each change should show:

Country

Regulation/topic

Date detected

Effective date

Severity

Affected contracts

Affected employees

Review status

Example:

Germany — Working Time Regulation Update

Detected: 12 Aug 2026
Effective: 1 Oct 2026

23 contracts potentially affected

Status:

Needs Review

Clicking the change should open a detailed change-analysis page.

6. Legal Change Detail Page

This is one of the most important screens.

Show:

What changed?

Plain-English explanation of the regulatory change.

Why it matters

Explain the practical employment/compliance impact.

Who is affected?

Employees, contracts, countries, entities, or policies potentially impacted.

Existing clause

Display the current contract clause.

Highlight the relevant section.

Compliance analysis

Explain why the existing wording may no longer satisfy the latest requirements.

Suggested replacement

Display the AI-generated updated clause.

Allow the reviewer to:

Accept

Edit

Reject

Request another draft

7. Contract Management

Create a contracts section where users can:

Upload contracts

Search contracts

Filter by country

Filter by employee

Filter by status

View version history

See compliance status

Each contract should show:

Employee

Country

Contract type

Last reviewed

Compliance status

Current version

Pending issues

8. Contract Review Workspace

Create a professional document-review interface.

Use a split-screen layout:

LEFT: Existing contract

RIGHT: Suggested updated contract

Add visual change tracking.

Example:

Deleted text → highlighted

Added text → highlighted

Changed clause → clearly marked

Also show an explanation panel:

Why this changed

Source of legal change

Effective date

Confidence / review status

The goal is to make this feel like a serious legal-document review tool.

9. Employee Compliance

Create an employee directory.

Each employee profile should contain:

Name

Country

Employment entity

Contract

Contract status

Relevant compliance alerts

Important employment dates

Review history

Do not collect unnecessary personal information.

Only store information required for compliance functionality.

10. Audit Trail

Every important action should be recorded.

Show:

Who uploaded a contract

Who reviewed a change

Who edited a draft

Who approved an update

When the action happened

Previous versions

Current version

Reason for change

This should feel particularly strong because the target audience includes legal and HR teams.

11. Settings

Include:

Organization

Company information and entities.

Users & Roles

Roles such as:

Admin

HR

Legal

Reviewer

Viewer

Countries

Countries currently being monitored.

Notifications

Configure:

Email alerts

Compliance alerts

Contract review reminders

Regulatory-change notifications

12. Responsive Design

The frontend must be fully responsive.

Prioritize:

Desktop → Tablet → Mobile

The authenticated dashboard should be optimized primarily for desktop, while marketing pages should work beautifully on every screen size.

UX PRINCIPLES

The product should always answer three questions:

What changed?

What does it affect?

What should I do now?

Never force users to understand complicated legal terminology before understanding the action they need to take.

Use plain-language explanations wherever possible.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b7787b1e-cb91-44f3-a00c-751d43d90c5f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
