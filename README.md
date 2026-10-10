# Project 1 — Payment Provider Comparison Tool

## Objective
Build a repeatable, transparent first-pass scorecard for comparing hypothetical payment providers against a set of operational requirements. The tool demonstrates the structure a Product Operations team could use before starting formal partner diligence.

## Deliverables
- `provider_comparison_tool.xlsx`: five-sheet workbook with a summary, formula-driven provider scorecard, editable criterion weights, action tracker, and scoring guide. Open in Excel or import into Google Sheets.
- `illustrative_providers.csv`: same fictional scoring data in portable form.
- `action_tracker_template.csv`: blank/seeded action tracker for a real assessment.
- `vendor_followup_reminder.gs`: optional Google Apps Script for draft reminder emails from an action tracker.
- `index.html`: browser-friendly project overview.

## How to use the workbook
1. Start on **Read Me** for scope and guardrails.
2. Review or change the weights on **Weight Settings**; weights should total 100%.
3. Replace Provider A–D with actual providers only after collecting comparable evidence. Record source links and date captured in the scorecard.
4. Score each criterion from 1 to 5 using the rubric on **Scoring Guide**. A high integration-effort score means easier/lower-effort integration.
5. Use **Decision Summary** to see the weighted ranking. The best-scoring provider is a screening lead, not an automatic selection.
6. Use **Action Tracker** to assign owners, dates, dependencies and statuses.

## Scoring method
Each criterion is rated 1–5. The weighted score on a 1–5 scale is:

`SUMPRODUCT(criterion ratings, criterion weights) / 100`

Default weights: cost fit 20%; coverage 15%; uptime evidence 15%; support/SLA 15%; compliance readiness 15%; integration effort 10%; documentation quality 10%. Weights are editable and reflect a **demo prioritisation**, not a universal fintech standard.

## Data integrity and limits
All provider labels, ratings, and evidence notes included by default are fictional. No provider-specific price, uptime, coverage, or compliance claim is made. For real procurement, request current written quotes and independently verify licensing, regulatory status, security documentation, service history, settlement terms, support coverage, and country/method availability. Legal, security, risk and compliance teams should approve the final decision.

## Reminder script
The optional Apps Script expects an **Action Tracker** sheet with columns: Initiative, Milestone, Owner, Due Date, Status, Priority, Dependency, Evidence/Link, Notes. The script is a starter pattern; test on a copy with your own account and do not authorize email sending until reviewed.

## Suggested interview walk-through
- Explain why you chose the criteria and weights.
- Change one weight and demonstrate how the ranking changes.
- Show how evidence quality differs from a provider claim.
- Explain why the winning score is a shortlist signal, not a substitute for due diligence.
