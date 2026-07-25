# Engineering Rules for Lumen

## Scope and architecture
- Implement only the approved milestone. Maintain a TypeScript modular monolith and explicit domain boundaries.
- PostgreSQL is authoritative. Redis, local storage and client state cannot decide seat, payment, ticket or tab correctness.
- Use migrations; never rewrite production history. Store money as integer minor units plus currency.
- External payment, identity, messaging and storage systems sit behind adapters. Never commit secrets or production credentials.

## Domain invariants
- All channels share `ShowtimeSeat`. Never create separate online and box-office inventories.
- Seat allocation is transactional, constraint-backed, idempotent and concurrency-tested. Multi-seat operations are atomic.
- Tickets grant admission; restaurant tabs represent payer responsibility. Do not assume one ticket, seat, person and payer are identical.
- Payment and operational lifecycles use explicit state machines, not booleans. Webhooks are verified, replay-safe and idempotent.
- No raw PAN or CVV is stored, logged or transmitted through application servers. Dining auto-settlement requires versioned explicit consent.
- Refunds, comps, voids, transfers, price/role changes and cash adjustments are authorized and audited without sensitive credentials.
- QR admission transitions atomically; a second valid scan reports already used unless an authorized override is recorded.

## Delivery and testing
- A milestone must include schema, API, UI, tests, structured logs, useful errors and completion evidence.
- Critical tests: seat races; purchase/disconnect/webhook recovery; duplicate scan; complete dining route/settlement; failed settlement; RBAC denial.
- State-changing APIs validate input, authorize server-side, use expected versions where needed and accept idempotency keys for reservation/financial commands.
- Never claim an integration or compliance state that has not been verified. Mark stubs and assumptions clearly.
- Preserve accessibility, large POS touch targets, KDS distance legibility and responsive customer flows.
- Stop when the approved milestone is complete; update architecture and operational documentation whenever behavior changes.
