# Open Questions

## Must answer before Milestone 0/1
1. **Answered:** Nashville, Tennessee. The operating legal entity is still needed; Tennessee/local tax, alcohol, privacy, receipt and retention requirements require qualified review.
2. Which managed staff sign-in provider and provisioning/offboarding process? This means deciding whether employee accounts use a service such as Auth0, Clerk, Microsoft Entra or Google Workspace rather than custom password security.
3. Is the first deployment cloud-only, and what theater-network reliability is expected?
4. Who owns movie/showtime metadata and images; are external licensing/feed integrations needed?
5. Exact seat pricing, fee, refund, ADA/companion and showtime-change policies?
6. **Partially answered:** Theater 1 = 96, Theater 2 = 60, Theater 3 = 32. Every map shows the screen and Row A at the top, with rows progressing toward the back. Final table groupings, ADA/companion positions, aisles, sightlines and entrances must be supplied or approved by the project architect.

## Before payments and dining
7. Stripe online only, or Stripe Terminal/card-present too? Nitehawk has publicly documented Filmbot POS with Datacap/Ingenico terminals historically, but its current processor and whether it reuses the ticket-purchase card for dining are not publicly confirmed. Which terminal hardware and tipping flow should Nashville use?
8. May tickets and dining use different merchant accounts/deposits? How are service charges distributed?
9. What dining authorization window and auto-close time/terms are acceptable?
10. Are partial cash/card, item-level refunds and post-close tip adjustments MVP requirements?
11. Tax calculation source and rounding rules by item, order and refund?

## Operations
12. Required offline/degraded behavior for box office, POS and KDS? This refers to loss of the theater's own internet connection or local network: staff devices may be unable to reach cloud services, payment processors or one another.
13. Printer, scanner, cash drawer, kitchen screen, server tablet, payment terminal and network inventory? “Hardware” means the physical equipment the software must control or support.
14. Item coursing, allergy-note handling, void/refire approval and alcohol-service workflows?
15. Report basis: gross/net definitions, business day cutoff, cash reconciliation and accounting export?
16. Recovery targets, support hours, audit retention and incident escalation owners?

## Assumptions used in this architecture
One Nashville, Tennessee location and three auditoriums; no customer phone ordering; responsive ticketing web before native apps; modular monolith; PostgreSQL authority; Redis optional acceleration; Stripe test-mode adapter pending processor/terminal decision; managed identity provider TBD; SSE initially; no claims of PCI, tax, accounting, privacy or alcohol-law compliance until specialist review.
