# Payment Flow

## Provider boundary
`PaymentProvider` exposes customer creation, setup authorization, payment intent, capture/confirm, refund and signed-webhook parsing. Stripe test mode is the first adapter. Application records use internal IDs and opaque provider references only; no PAN or CVV enters Attend.

## Ticket purchase
1. Create a `TicketOrder` bound to valid active seat holds and an idempotency key.
2. Calculate server-side price/tax/fee snapshots.
3. Create/confirm provider payment. A browser disconnect does not determine outcome.
4. Verified webhook or safe provider reconciliation advances the payment exactly once.
5. In one transaction, finalize held seats, issue tickets and queue receipt/events. On terminal failure, release according to the documented hold/payment race policy.

## Dining authorization and settlement
Dining use and automatic settlement are separate explicit consents. Store the terms version and method reference. At close, freeze a bill snapshot and calculate tax, service charge and tip. The customer chooses: charge the tokenized ticket-purchase card, record cash received, or pay with another card through a card-present terminal. Each tender and split allocation is recorded explicitly and processed idempotently. A card failure moves the applicable settlement to `PAYMENT_FAILED`, alerts staff/customer and permits another method; no blind retries.

## Reconciliation
Provider webhooks require signature verification, replay protection and unique provider-event IDs. A scheduled reconciler finds stale processing attempts and queries the provider. Refunds are their own stateful records and never overwrite the original payment.

## Risks requiring review
SCA/card-present strategy, tips and post-authorization changes, partial cash/card payments, processor fee accounting, tax sourcing, chargebacks and cancellation policy must be confirmed with qualified payment, tax and legal specialists before production.
