import SolutionPage from "../SolutionPage";

export default function CompleteDineIn(){return <SolutionPage solution={{
  mode:"complete",
  eyebrow:"OPTION 02 / COMPLETE DINE-IN PLATFORM",
  title:"One seat.",
  italic:"One connected night.",
  intro:"Ticketing, reserved seats, server ordering, kitchen fulfillment and payment settlement built around the seat as the service coordinate.",
  price:"Custom theater plan",
  priceNote:"software, devices, onboarding and transaction terms",
  features:[
    ["Website + connected checkout","Use a complete branded website or embedded checkout to sell tickets, memberships, gift cards and optional food or drink preorders."],
    ["Seat-linked tabs","One payer can cover multiple seats, while staff can split, transfer or combine checks with an audit trail."],
    ["Server POS","Large-touch ordering keeps the showtime, auditorium, seat and payer visible for every item."],
    ["Kitchen + bar routing","Send each item to the correct station with pacing, seat context and fulfillment status."],
    ["Flexible settlement","Guests can use the authorized ticket card, another card or cash; auto-settlement requires explicit consent."],
    ["Audience + management","Connect memberships, promotions and visit history with ticket, food, tip, refund, comp and cash reporting."],
  ],
  flow:["Guest selects a film, showtime and seat","Optional food or drink is preordered for that seat","Server adds items throughout the movie","Kitchen and bar fulfill against the seat-linked order","The theater settles directly and Attend retains only contracted fees"],
  operations:["One shared ticket and restaurant platform","Supported server devices and payment terminals","Real-time kitchen and bar routing","Explicit dining-card consent and audit history","Degraded-mode policies for internet disruptions"],
  otherHref:"/solutions/integrated-ticketing",
  otherLabel:"Integrated Ticketing",
}}/>}
