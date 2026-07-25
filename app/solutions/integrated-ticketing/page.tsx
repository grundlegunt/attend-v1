import SolutionPage from "../SolutionPage";

export default function IntegratedTicketing(){return <SolutionPage solution={{
  mode:"integrated",
  eyebrow:"OPTION 01 / INTEGRATED TICKETING",
  title:"Modern ticketing.",
  italic:"Keep your POS.",
  intro:"A reserved-seat ticketing and admission layer for independent theaters that want a better customer experience without replacing their current restaurant operation.",
  price:"From $699 / location",
  priceNote:"plus an agreed per-ticket platform fee",
  features:[
    ["Managed site or embeds","Launch a complete Attend-powered website, or place brandable showtime and checkout components inside the theater’s existing site."],
    ["Shared seat truth","Online and box-office channels use one authoritative showtime-seat inventory—never separate pools."],
    ["QR admission","Fast, replay-safe scanning with clear already-used and authorized-override workflows."],
    ["POS-aware integration","Send preorders or sales data to a supported POS API, middleware connection or reconciliation export."],
    ["Direct theater settlement","The theater remains merchant of record and receives ticket revenue directly."],
    ["Audience tools","Run memberships, promotion codes, gift cards, ticket packs and consent-aware campaigns from the same customer record."],
  ],
  flow:["Guest purchases through the theater’s branded site","Payment is charged by the theater’s connected account","Attend receives the contracted application fee","Ticket revenue settles directly to the theater","Existing POS continues handling in-theater dining"],
  operations:["Existing restaurant POS remains in place","Certified integrations defined theater by theater","Ticket and admission support included","Customer and sales exports remain available","No raw card data passes through Attend servers"],
  otherHref:"/solutions/complete-dine-in",
  otherLabel:"Complete Dine-In Platform",
}}/>}
