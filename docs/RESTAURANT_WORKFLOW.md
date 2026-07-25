# Restaurant Workflow

## Model
A tab represents financial responsibility, not a person or ticket. `RestaurantTabSeat` links one or more valid tickets/seats for a showtime. This supports a payer covering four seats, separate checks, item moves, tab merges and seat changes without rewriting orders.

## Order journey
Server opens the auditorium/showtime, selects C4, confirms customer-safe context and adds menu items/modifiers. Sending freezes an order revision and routes each item by destination: Kitchen, Bar or Concessions. Fulfillment progresses NEW → ACCEPTED → PREPARING → READY → DELIVERED; cancels, voids and refires are explicit authorized transitions.

## Corrections
Wrong-seat items are transferred through a manager-authorized command that records source, destination, reason and before/after values. Delivered items are never silently deleted. An 86'd item is rejected at send if availability changed, with a useful replacement prompt.

## Customer interaction and settlement
Customers do not order through a phone. A server takes each order, confirms the seat and assigns items to the correct tab. The server can present tip and final-total confirmation on staff-controlled hardware or a printed receipt workflow. At close, the customer may charge the tokenized card authorized during ticket checkout, pay cash, or present another card at a terminal. The server sees only safe card-brand/last-four indicators, never credentials. Each tender is reconciled and a receipt is delivered after settlement; automatic close occurs only under separately recorded consent.

## Resilience
POS may keep a clearly marked local draft while disconnected; it cannot claim an order was accepted. On reconnect, commands are idempotent and conflicts require review. KDS uses large type, station filters and authoritative timestamps.
