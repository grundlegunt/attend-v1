# State Machines

All transitions are commands with actor, authorization, expected version and idempotency key where applicable. Invalid transitions return conflicts and create no partial effects.

| Aggregate | States and principal transitions |
|---|---|
| SeatHold | `ACTIVE → CHECKOUT_PROCESSING → CONSUMED`; `ACTIVE/CHECKOUT_PROCESSING → EXPIRED/CANCELED`; terminal states do not reactivate. |
| TicketOrder | `DRAFT → AWAITING_PAYMENT → PROCESSING → COMPLETED`; payment failure to `PAYMENT_FAILED`; pre-issue cancel to `CANCELED`; later money changes do not erase completion. |
| Ticket | `PENDING → ISSUED → ADMITTED`; `ISSUED → CANCELED/REFUNDED`; admitted overrides require manager action, not reuse. |
| Payment | `CREATED → REQUIRES_PAYMENT_METHOD/REQUIRES_ACTION/AUTHORIZED/PROCESSING → SUCCEEDED`; failure/cancel terminal for an attempt; aggregate may gain a new attempt; `SUCCEEDED → PARTIALLY_REFUNDED → REFUNDED`. |
| RestaurantTab | `NOT_OPEN → PREAUTHORIZED/OPEN → READY_TO_CLOSE → SETTLEMENT_PENDING → CLOSED`; settlement failure to `PAYMENT_FAILED`; exceptional paths `MANAGER_REVIEW/VOIDED/REFUNDED`. |
| RestaurantOrder | `DRAFT → SENT → IN_FULFILLMENT → READY → DELIVERED`; explicit `CANCELED/VOIDED`; corrections create revisions/events. |
| FulfillmentTicket | `NEW → ACCEPTED → PREPARING → READY → DELIVERED`; `CANCELED/VOIDED`; `REFIRE` creates a linked new fulfillment ticket rather than erasing history. |

Payment attempts are immutable facts; `Payment` derives current status. Ticket scan result is computed from ticket/showtime/admission state and a valid first scan commits `ISSUED → ADMITTED` atomically.
