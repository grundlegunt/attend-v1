# Seat Reservation Design

## Authority
Each showtime has materialized `ShowtimeSeat` rows. A hold request locks the target rows in a deterministic order, verifies sale eligibility and ADA/companion policy, expires obsolete holds, then inserts a hold with an eight-minute deadline. A database uniqueness/exclusion strategy prevents overlapping active claims. Multi-seat requests are all-or-nothing.

## Lifecycle
`AVAILABLE → HELD → SOLD`; `HELD → AVAILABLE` on expiry/cancel; operational states `BLOCKED`, `HOUSE`, `ADA_RESERVED`, `COMPANION`, `UNAVAILABLE` gate hold eligibility. State change, outbox event and audit fact commit together.

## Expiry and payment race
A worker releases expired holds, but every read/mutation also treats an elapsed deadline as expired. Starting payment extends or leases the hold under a bounded `CHECKOUT_PROCESSING` policy. A successful provider payment discovered after release must enter manager review/refund; it must never steal a seat sold to another customer.

## APIs
`GET /showtimes/:id/seats`; `POST /seat-holds`; `POST /seat-holds/:id/extend-checkout`; `DELETE /seat-holds/:id`. Commands require idempotency keys; availability responses include version and server time.

## Tests
Parallel holds for C4 yield exactly one winner; multi-seat rollback; expiry/reacquire; payment/expiry boundary; duplicate command; online versus box-office race; ADA/companion rules; event ordering and reconnect re-fetch.
