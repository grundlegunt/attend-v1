# Attend Product Specification

## Outcome
Attend is the operating platform for a single-location, three-auditorium dine-in cinema in Nashville, Tennessee. It joins reserved-seat ticketing and restaurant service without treating either as a secondary add-on.

The first proven journey is: an administrator publishes a showtime; a customer holds and buys C4; the system issues a QR ticket and optionally records dining-payment consent; a server opens C4, sends a burger to Kitchen and a cocktail to Bar; staff deliver both; the customer tips and settles; reports and audit events update exactly once.

## Users and surfaces
- Customers: responsive web ticket purchase and ticket views; account or guest checkout. Customers do not place food or beverage orders from their phones.
- Box office and door: shared inventory, sales, exchanges, refunds, QR admission.
- Servers and runners: touch-first auditorium map, tabs, ordering, delivery, transfer, split, close.
- Kitchen and bar: high-contrast routed fulfillment tickets.
- Managers and owners: configuration, menus, staff access, refunds, audit and reporting.

## MVP scope
One Nashville location; three configurable auditoriums based on the proposed floor plan—Theater 1 with 96 seats, Theater 2 with 60 seats and Theater 3 with 32 seats (188 total); multiple movies/showtimes; reserved seating; test-mode online/card payments; cash recording; QR tickets; seat-linked tabs; POS; KDS/bar display; tipping and restaurant settlement; basic reporting, refunds, RBAC and audit.

## Proposed auditorium translation
- Theater 1: 96 seats, modeled as six rows of sixteen seats.
- Theater 2: 60 seats, modeled as five rows of twelve seats.
- Theater 3: 32 seats, modeled as four rows of eight seats.
- All customer and staff seat maps are oriented with the screen at the top. Row A is the front row closest to the screen; subsequent letters progress toward the rear. Seat numbers read left-to-right as displayed. Seats appear as adjacent two-seat pairs, inspired by the operational concept in the supplied reference, with no individual tables drawn on the ticketing map. Every seat remains a separate reservable and billable coordinate.

These are inventory/UI concepts derived from the drawing, not construction documents. Final numbering, table groupings, wheelchair/companion locations, aisle widths, sightlines, egress and occupancy require confirmation from the architect and applicable Nashville authorities.

## Explicitly deferred
Native apps, graphical auditorium designer, wallets, loyalty, gift cards, multi-location operation, sophisticated offline sales, accounting exports and production payment enablement. Interfaces must allow these later without claiming they exist.

## Product rules
The same `ShowtimeSeat` inventory serves every sales channel. A ticket is admission, not a dining payer. Servers take all food and beverage orders in person and assign them to reserved seats. A `RestaurantTab` may cover many seats and a seat may move between tabs only through an authorized, audited command. At settlement, the customer may use the tokenized card authorized during ticket checkout, pay cash, or present another card. The ticket-purchase card may fund dining only after explicit authorization; no customer is silently opted in.

## Success measures
No oversold seats; no duplicate successful charge for one intent; median server order entry under 30 seconds; current order status visible across the relevant surfaces; all financial mutations attributable; critical recovery workflows pass automated tests.
