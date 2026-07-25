# Implementation Plan

Each milestone includes schema migration, authenticated APIs, a usable interface, automated tests and an operationally observable result. No milestone begins until the prior exit gate passes.

| # | Testable outcome | Database / API / UI | Required tests and exit gate |
|---|---|---|---|
| 0 | Reproducible secure foundation | Org/location, employee/RBAC, migrations; auth/health; sign-in shell | CI, migration, permission baseline; fresh environment passes |
| 1 | Manager publishes a showtime | Movie/auditorium/seat-map versions/showtime; catalog APIs; admin + customer listings | Layout/version validation; one location and three auditoriums render correctly |
| 2 | C4 can be held safely | ShowtimeSeat/SeatHold/outbox; availability/hold APIs; live seat map/countdown | concurrency, expiry, ADA, box-office race; exactly one winner |
| 3 | Customer buys held C4 in test mode | TicketOrder/Payment/Attempt/Consent; checkout/webhook APIs; checkout UI | purchase, disconnect recovery, replay, failure; one charge/order/sold seat |
| 4 | Customer enters with one-use QR | Ticket/Scan; issue/scan APIs; ticket + scanner UI | duplicate/wrong/refunded scan; exactly one admission |
| 5 | Purchased seats open dining tabs | Tab/TabSeat/effective links; open/split/merge/transfer APIs; customer tab shell | shared/separate payer and seat move; links remain auditable |
| 6 | Server sends a configured order | Menu/modifiers/order/items; menu/order APIs; touch POS | permissions, totals, modifiers, 86; accepted order tied to correct seat |
| 7 | Burger reaches Kitchen, cocktail Bar | Station/fulfillment/outbox; status/event APIs; KDS/bar screens | routing, reconnect, refire, duplicates; both destinations progress independently |
| 8 | Customer tips and closes tab | Bill snapshots, settlement/refund records; close/tip APIs; live tab UI | dining E2E, failure/retry, consent, rounding; one settled total and receipt |
| 9 | Box office sells from shared inventory | Drawer/cash/exchange support; staff sales APIs; box-office UI | channel race, cash, exchange, comp/refund; no separate inventory |
| 10 | Manager reconciles operations | Audit/report projections, rules/promos; report/refund/admin APIs; dashboards | totals to ledger, authorization, audit completeness; traceable sample day |
| 11 | Production-readiness evidence | retention/security config; diagnostics/runbooks; ops views | load/race, restore, failover, threat and penetration tests; launch checklist approved |

## First vertical-slice acceptance
Admin publishes theater/auditorium/layout/movie/showtime; customer buys C4 and opts into dining use; server sends burger and cocktail; Kitchen/Bar ready them; server delivers; customer tips and pays; ticketing, restaurant, payment, report and audit facts reconcile exactly once.
