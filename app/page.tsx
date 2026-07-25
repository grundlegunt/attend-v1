"use client";

import { useState } from "react";
import Link from "next/link";

const milestones = [
  ["00", "Foundation", "Repo, environments, PostgreSQL, auth, CI and test harness"],
  ["01", "Cinema catalog", "Movies, three auditoriums, layouts and showtimes"],
  ["02", "Seat truth", "Transactional inventory, 8-minute holds and race tests"],
  ["03", "Checkout", "Ticket orders, Stripe test payments and recovery"],
  ["04", "Admission", "QR ticket issuance and idempotent scanning"],
  ["05", "Seat-linked tabs", "Dining sessions, shared payers and seat transfers"],
  ["06", "Server POS", "Touch-first ordering, menus and modifiers"],
  ["07", "Fulfillment", "Kitchen/bar routing, KDS and real-time status"],
  ["08", "Settlement", "Tips, consented auto-close and failed-payment handling"],
  ["09", "Box office", "Shared inventory, exchanges, cash, comps and refunds"],
  ["10", "Management", "Reporting, audit tools, configuration and refunds"],
  ["11", "Operational readiness", "Security hardening, observability and load tests"],
];

const flow = ["Customer", "Ticket order", "Showtime", "Seat C4", "Dining tab", "Orders", "Settlement"];

const risks = [
  ["Seat oversell", "Critical", "Unique showtime-seat constraints + serializable transaction boundary"],
  ["Duplicate charge", "Critical", "Idempotency keys, immutable attempts and verified provider webhooks"],
  ["Wrong-seat service", "High", "Auditable item transfers and explicit seat/showtime context"],
  ["Offline operations", "High", "Degraded-mode policy; never invent inventory or payment success"],
];

const docs = ["Product spec", "Architecture", "Data model", "Payment flow", "Seat reservation", "Restaurant workflow", "Security", "State machines", "Implementation plan", "Open questions"];

const audienceFeatures = [
  ["01", "Memberships", "Monthly and annual plans with ticket, concession and event benefits tied to one customer account."],
  ["02", "Promo campaigns", "Venue-controlled codes, audience segments and visit-history offers with clear redemption rules."],
  ["03", "Gift cards", "Digital and physical balances redeemable across tickets, advance orders and in-theater service."],
  ["04", "Ticket packs", "Flexible bundles for repertory series, festivals, families and frequent moviegoers."],
  ["05", "Customer history", "Consent-aware profiles connect visits, preferences, purchases and service recovery."],
  ["06", "Donations", "Optional checkout contributions for nonprofit cinemas, restorations and community programs."],
];

const auditoriums = [
  { id: 1, name: "Theater 1", seats: 96, rows: 6, seatsPerRow: 16, screen: "top", plan: "Large auditorium · 6 rows × 16 seats · Row A in front" },
  { id: 2, name: "Theater 2", seats: 60, rows: 5, seatsPerRow: 12, screen: "top", plan: "Mid-size auditorium · 5 rows × 12 seats · Row A in front" },
  { id: 3, name: "Theater 3", seats: 32, rows: 4, seatsPerRow: 8, screen: "top", plan: "Intimate auditorium · 4 rows × 8 seats · Row A in front" },
];

const movies = [
  {
    id: "f1",
    title: "F1",
    poster: "/posters/f1.png",
    eyebrow: "Racing drama · 155 min",
    description: "A full-throttle big-screen event with a menu built for race day.",
    showtimes: [
      { time: "11:00 AM", auditorium: 3 },
      { time: "1:30 PM", auditorium: 1 },
      { time: "4:50 PM", auditorium: 1 },
      { time: "8:20 PM", auditorium: 1 },
    ],
    pairings: ["Grand Prix Burger · $14", "Pitt Crew · $11", "Redbull Spritz · $11"],
  },
  {
    id: "materialists",
    title: "Materialists",
    poster: "/posters/materialists.png",
    eyebrow: "Romantic drama · 117 min",
    description: "A New York matchmaker finds herself caught between the perfect match and the person she left behind.",
    showtimes: [
      { time: "2:25 PM", auditorium: 3 },
      { time: "5:10 PM", auditorium: 2 },
      { time: "7:55 PM", auditorium: 2 },
      { time: "10:50 PM", auditorium: 2 },
    ],
    pairings: [],
  },
  {
    id: "eddington",
    title: "Eddington",
    poster: "/posters/eddington.png",
    eyebrow: "Modern western · 148 min",
    description: "A small-town sheriff and mayor face off as neighbor is pitted against neighbor in Eddington, New Mexico.",
    showtimes: [
      { time: "1:50 PM", auditorium: 2 },
      { time: "5:15 PM", auditorium: 3 },
      { time: "8:35 PM", auditorium: 3 },
    ],
    pairings: [],
  },
  {
    id: "ghostbusters",
    title: "Ghostbusters",
    poster: "/posters/ghostbusters.png",
    eyebrow: "Comedy classic · 145 min",
    description: "Who you gonna call? Revisit the supernatural comedy with themed bites.",
    showtimes: [
      { time: "11:15 AM", auditorium: 2 },
      { time: "11:45 PM", auditorium: 1 },
    ],
    pairings: ["Terror Dog · $14", "Marshmallow Man · $9"],
  },
  {
    id: "wedding-singer",
    title: "The Wedding Singer",
    poster: "/posters/the-wedding-singer.png",
    eyebrow: "Romantic comedy · 132 min",
    description: "A late-'80s love story served with a playful dinner-and-drinks pairing.",
    showtimes: [{ time: "11:00 AM", auditorium: 1 }],
    pairings: ["That’s a Good Meatball · $14", "Alabama Slammer · $12.50"],
  },
];

export const weeklyProgram = [
  {day:"Saturday",date:"Jul 25",films:{f1:[{time:"11:00 AM",auditorium:3},{time:"1:30 PM",auditorium:1},{time:"4:50 PM",auditorium:1},{time:"8:20 PM",auditorium:1}],eddington:[{time:"1:50 PM",auditorium:2},{time:"5:15 PM",auditorium:3},{time:"8:35 PM",auditorium:3}],materialists:[{time:"2:25 PM",auditorium:3},{time:"5:10 PM",auditorium:2},{time:"7:55 PM",auditorium:2},{time:"10:50 PM",auditorium:2}],ghostbusters:[{time:"11:15 AM",auditorium:2},{time:"11:45 PM",auditorium:1}],"wedding-singer":[{time:"11:00 AM",auditorium:1}]}},
  {day:"Sunday",date:"Jul 26",films:{f1:[{time:"11:00 AM",auditorium:3},{time:"2:10 PM",auditorium:3},{time:"5:20 PM",auditorium:3},{time:"8:30 PM",auditorium:3}],eddington:[{time:"11:15 AM",auditorium:2},{time:"2:15 PM",auditorium:2},{time:"5:15 PM",auditorium:2},{time:"8:15 PM",auditorium:2},{time:"11:15 PM",auditorium:2}],materialists:[{time:"11:00 AM",auditorium:1},{time:"1:30 PM",auditorium:1},{time:"4:00 PM",auditorium:1},{time:"6:30 PM",auditorium:1},{time:"9:00 PM",auditorium:1},{time:"11:30 PM",auditorium:1}],ghostbusters:[],"wedding-singer":[]}},
  {day:"Monday",date:"Jul 27",films:{f1:[{time:"3:30 PM",auditorium:1},{time:"6:40 PM",auditorium:1},{time:"9:50 PM",auditorium:1}],eddington:[{time:"3:45 PM",auditorium:2},{time:"6:45 PM",auditorium:2},{time:"9:45 PM",auditorium:2}],materialists:[{time:"4:00 PM",auditorium:3},{time:"6:30 PM",auditorium:3},{time:"9:00 PM",auditorium:3}],ghostbusters:[],"wedding-singer":[]}},
  {day:"Tuesday",date:"Jul 28",films:{f1:[{time:"3:30 PM",auditorium:1},{time:"6:40 PM",auditorium:1},{time:"9:50 PM",auditorium:1}],eddington:[{time:"3:45 PM",auditorium:2},{time:"6:45 PM",auditorium:2},{time:"9:45 PM",auditorium:2}],materialists:[{time:"3:30 PM",auditorium:3},{time:"6:00 PM",auditorium:3},{time:"8:30 PM",auditorium:3}],ghostbusters:[],"wedding-singer":[]}},
  {day:"Wednesday",date:"Jul 29",films:{f1:[{time:"3:30 PM",auditorium:1},{time:"6:40 PM",auditorium:1},{time:"9:50 PM",auditorium:1}],eddington:[{time:"3:45 PM",auditorium:2},{time:"6:45 PM",auditorium:2},{time:"9:45 PM",auditorium:2}],materialists:[{time:"4:00 PM",auditorium:3},{time:"6:30 PM",auditorium:3},{time:"9:00 PM",auditorium:3}],ghostbusters:[],"wedding-singer":[]}},
  {day:"Thursday",date:"Jul 30",films:{f1:[{time:"3:30 PM",auditorium:1},{time:"6:40 PM",auditorium:1},{time:"9:50 PM",auditorium:1}],eddington:[{time:"3:45 PM",auditorium:2},{time:"6:45 PM",auditorium:2},{time:"9:45 PM",auditorium:2}],materialists:[{time:"3:30 PM",auditorium:3},{time:"6:00 PM",auditorium:3},{time:"8:30 PM",auditorium:3}],ghostbusters:[],"wedding-singer":[]}},
  {day:"Friday",date:"Jul 31",films:{f1:[{time:"3:30 PM",auditorium:3},{time:"6:40 PM",auditorium:3},{time:"9:50 PM",auditorium:3}],eddington:[{time:"3:30 PM",auditorium:2},{time:"6:30 PM",auditorium:2},{time:"9:30 PM",auditorium:2}],materialists:[{time:"1:00 PM",auditorium:1},{time:"3:30 PM",auditorium:1},{time:"6:00 PM",auditorium:1},{time:"8:30 PM",auditorium:1},{time:"11:00 PM",auditorium:1}],ghostbusters:[],"wedding-singer":[]}},
];

const preorderItems = [
  ...["Fresh Hot Popcorn|8","Shoestring Fries|9","Hot Pretzels|10","Picnic Platter|18","Stuffed Pepper Dip|12","Katsu-Style Tenders|14","Corn & Zucchini Fritters|12"].map((item,index)=>{const [name,price]=item.split("|");return {id:`share-${index}`,category:"Shareables",name,price:Number(price)}}),
  ...["Patty Melt|16","Classic|14","Short Rib|17","Broccoli Cheddar|14","French Onion|16","Spanikopita|14"].map((item,index)=>{const [name,price]=item.split("|");return {id:`toast-${index}`,category:"Toasties",name,price:Number(price)}}),
  ...["Tender Love|15","House Party|13"].map((item,index)=>{const [name,price]=item.split("|");return {id:`salad-${index}`,category:"Salads",name,price:Number(price)}}),
  ...["Skillet Cookie|10","Dirt Sundae|9","Seasonal Crumble|9","Affogato|8","Candy Selection|7"].map((item,index)=>{const [name,price]=item.split("|");return {id:`sweet-${index}`,category:"Sweet Treats",name,price:Number(price)}}),
  ...["Martini and a ½|15","Sunrise Cosmo|13","Valley Girl|13","Dirty Work|14","Made in Manhattan|15","Old West|14","Smash Hit|14","Pool Party|14","Easy Rider|14","Ivory Tower|14","Highwire Act|15","Scarface|13","Peach Fizz|14","Ocean Air|14"].map((item,index)=>{const [name,price]=item.split("|");return {id:`cocktail-${index}`,category:"Cocktails",name,price:Number(price)}}),
  ...["Sparkling Wine|12","White Wine|12","Orange & Skin Contact|13","Red Wine|12"].map((item,index)=>{const [name,price]=item.split("|");return {id:`wine-${index}`,category:"Wine",name,price:Number(price)}}),
  ...["Budweiser|7","Tiny Juicy IPA|9","Guinness|9","Yazoo Pale Ale|9","Allagash White|9"].map((item,index)=>{const [name,price]=item.split("|");return {id:`beer-${index}`,category:"Beer",name,price:Number(price)}}),
  ...["N/A Sparkling Rosé|9","Best Day Kölsch|7","Athletic IPA|7","Phony Negroni|9","Ghia Spritz|9"].map((item,index)=>{const [name,price]=item.split("|");return {id:`na-${index}`,category:"Non-Alcoholic",name,price:Number(price)}}),
  ...["Coffee or Cold Brew|5","Fountain Soda|5","Fresh-Squeezed Orange Juice|6"].map((item,index)=>{const [name,price]=item.split("|");return {id:`soft-${index}`,category:"Coffee, Soda & Juice",name,price:Number(price)}}),
];

const movieSpecials: Record<string, {id:string;category:string;name:string;price:number}[]> = {
  f1: [
    { id:"f1-burger", category:"F1 Film Specials", name:"Grand Prix Burger", price:14 },
    { id:"f1-pitt-crew", category:"F1 Film Specials", name:"Pitt Crew", price:11 },
    { id:"f1-redbull-spritz", category:"F1 Film Specials", name:"Redbull Spritz", price:11 },
  ],
  ghostbusters: [
    { id:"ghost-terror-dog", category:"Ghostbusters Film Specials", name:"Terror Dog", price:14 },
    { id:"ghost-marshmallow", category:"Ghostbusters Film Specials", name:"Marshmallow Man", price:9 },
  ],
  "wedding-singer": [
    { id:"wedding-meatball", category:"The Wedding Singer Film Specials", name:"That’s a Good Meatball", price:14 },
    { id:"wedding-slammer", category:"The Wedding Singer Film Specials", name:"Alabama Slammer", price:12.5 },
  ],
};

export default function Home() {
  const [active, setActive] = useState(2);
  const [selectedShow, setSelectedShow] = useState({ movieId: "f1", time: "1:30 PM", auditorium: 1 });
  const [showAllDates, setShowAllDates] = useState(false);
  const [selectedDate, setSelectedDate] = useState(0);
  const [showSeatMap, setShowSeatMap] = useState(false);
  const [showPreorder, setShowPreorder] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [authorizeFinalBill, setAuthorizeFinalBill] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"card"|"apple">("card");
  const [preorder, setPreorder] = useState<Record<string, number>>({});
  const [memberPricing, setMemberPricing] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [giftCardCode, setGiftCardCode] = useState("");
  const [giftCardApplied, setGiftCardApplied] = useState(false);
  const activeAuditorium = selectedShow.auditorium;
  const [selectedSeats, setSelectedSeats] = useState<string[]>(["C4", "C5"]);
  const layout = auditoriums.find((item) => item.id === activeAuditorium) ?? auditoriums[0];
  const selectedMovie = movies.find((movie) => movie.id === selectedShow.movieId) ?? movies[0];
  const programDate = weeklyProgram[selectedDate];
  const selectedDateLabel = `${programDate.day}, ${programDate.date}`;
  const ticketPrice = programDate.day === "Tuesday" ? 8 : 17;
  const programMovies = movies.map((movie)=>showAllDates ? {...movie,showtimes:programDate.films[movie.id as keyof typeof programDate.films]??[]} : movie).filter(movie=>!showAllDates||movie.showtimes.length>0);
  const availablePreorderItems = [...preorderItems, ...Object.values(movieSpecials).flat()];
  const preorderCategories = [...new Set(availablePreorderItems.map((item)=>item.category))];
  const preorderTotal = availablePreorderItems.reduce((total,item)=>total+(preorder[item.id]??0)*item.price,0);
  const preorderCount = Object.values(preorder).reduce((total,quantity)=>total+quantity,0);
  const ticketSubtotal = selectedSeats.length*ticketPrice;
  const ticketFees = selectedSeats.length*2;
  const foodTax = preorderTotal*0.0925;
  const memberDiscount = memberPricing ? ticketSubtotal*.1 : 0;
  const promoDiscount = promoApplied ? Math.min(5,ticketSubtotal-memberDiscount) : 0;
  const beforeGiftCard = ticketSubtotal+ticketFees+preorderTotal+foodTax-memberDiscount-promoDiscount;
  const giftCardCredit = giftCardApplied ? Math.min(20,beforeGiftCard) : 0;
  const checkoutTotal = beforeGiftCard-giftCardCredit;
  const changePreorder = (id:string,change:number) => setPreorder((current)=>{
    const quantity = Math.max(0,(current[id]??0)+change);
    return {...current,[id]:quantity};
  });
  const reservedSeats = activeAuditorium === 1 ? ["A3", "A4", "B10", "C2", "D7", "E13", "F8"] : activeAuditorium === 2 ? ["A3", "A4", "B6", "C2", "D7"] : ["A3", "B6", "C2", "D7"];
  const toggleSeat = (seat: string) => {
    if (reservedSeats.includes(seat)) return;
    setSelectedSeats((current) => current.includes(seat) ? current.filter((item) => item !== seat) : current.length < 4 ? [...current, seat] : current);
  };
  return (
    <main>
      <header className="nav">
        <a className="brand" href="#top" aria-label="Attend home"><span className="brandMark">A</span><span>ATTEND</span></a>
        <nav aria-label="Page sections"><a href="#seat-preview">Showtimes</a><Link href="/menu">Menu</Link><Link href="/schedule">Scheduler</Link><Link href="/theaters">Theaters</Link><a href="#audience">Memberships</a></nav>
        <a className="status" href="#review"><span /> Architecture review</a>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow"><span>FOUNDATION BRIEF</span><span>JUL 2026</span></div>
        <h1>One seat.<br/><em>One connected night.</em></h1>
        <p className="lede">A production-minded blueprint for a dine-in cinema platform where ticket inventory, seat service, restaurant tabs, fulfillment and payment share one auditable source of truth.</p>
        <div className="heroActions"><a className="primary" href="#architecture">Explore the system <span>↘</span></a><a className="textLink" href="#roadmap">View 12 milestones →</a></div>
        <div className="marquee" aria-label="Platform surfaces"><span>THEATER WEBSITES</span><i>✦</i><span>TICKETING</span><i>✦</i><span>MEMBERSHIPS</span><i>✦</i><span>RESERVED SEATING</span><i>✦</i><span>SEAT SERVICE</span><i>✦</i><span>SETTLEMENT</span></div>
      </section>

      <section className="section architecture" id="architecture">
        <div className="sectionHead"><span className="kicker">01 / THE THESIS</span><h2>A modular monolith first.<br/>Clear boundaries from day one.</h2><p>One deployable product keeps the first theater operable without premature distributed-system complexity. Domain modules own their rules and communicate through explicit services and an outbox-backed event stream.</p></div>
        <div className="architectureGrid">
          <div className="surfaceColumn"><p className="label">EXPERIENCE SURFACES</p>{["Managed website + embeds", "Box office", "Server POS", "Kitchen + bar", "Manager console"].map((x,i)=><div className="surface" key={x}><span>0{i+1}</span>{x}<b>↗</b></div>)}</div>
          <div className="core"><p className="label">DOMAIN CORE</p><div className="coreGrid">{["Identity + access","Cinema catalog","Seat inventory","Ticketing","Payments","Audience + loyalty","Restaurant tabs","Ordering","Fulfillment","Reporting","Audit ledger","Website delivery"].map(x=><span key={x}>{x}</span>)}</div><div className="eventRail">TRANSACTIONAL OUTBOX <i>→</i> REAL-TIME EVENTS</div></div>
          <div className="foundation"><p className="label">FOUNDATION</p>{["PostgreSQL / authority","Redis / acceleration","Stripe / tokenized pay","Email + SMS adapters","Object storage"].map(x=><div key={x}>{x}<span>●</span></div>)}</div>
        </div>
      </section>

      <section className="flowSection">
        <div className="sectionHead compact"><span className="kicker">02 / DEFINING RELATIONSHIP</span><h2>The seat is the service coordinate.</h2><p>A ticket grants admission. A dining tab groups financial responsibility. The join between them supports one payer for many seats, separate checks, transfers and splits.</p></div>
        <div className="flow">{flow.map((x,i)=><div className="flowItem" key={x}><span>{String(i+1).padStart(2,"0")}</span><strong>{x}</strong>{i<flow.length-1 && <b>→</b>}</div>)}</div>
        <div className="principles"><div><span>01</span><h3>Inventory is relational</h3><p>Redis may accelerate holds, but PostgreSQL constraints and transactions decide who owns a showtime seat.</p></div><div><span>02</span><h3>Money is a state machine</h3><p>Payments use immutable attempts, provider references and idempotent commands—not a paid boolean.</p></div><div><span>03</span><h3>Every move is traceable</h3><p>Refunds, transfers, comps, voids and permission changes produce sanitized audit events.</p></div></div>
      </section>

      <section className="seatPreview section" id="seat-preview">
        <div className="sectionHead compact"><span className="kicker">03 / NOW SHOWING</span><h2>Pick the film.<br/>Then pick your seats.</h2><p>A movie-first schedule leads guests from showtime to the correct room. This Saturday program uses the supplied operating schedule and featured movie menu.</p></div>
        {!showSeatMap && <><div className="dateRail" aria-label="Schedule date"><button className={!showAllDates?"active":""} onClick={()=>{setShowAllDates(false);setSelectedDate(0)}}><strong>Saturday</strong><span>Featured program</span></button><button className={showAllDates&&selectedDate===1?"active":""} onClick={()=>{setShowAllDates(true);setSelectedDate(1)}}><strong>Next date</strong><span>Schedule coming soon</span></button><button className={showAllDates?"active":""} aria-label="Open calendar" onClick={()=>setShowAllDates(true)}><strong>Calendar</strong><span>Browse all dates →</span></button></div>
        <div className="weekPicker alwaysVisible" aria-label="Browse all schedule dates">{weeklyProgram.map((date,index)=><button className={selectedDate===index?"active":""} key={date.date} onClick={()=>{setSelectedDate(index);setShowAllDates(true)}}><span>{date.day.slice(0,3)}</span><strong>{date.date.replace("Jul ","")}</strong></button>)}</div>
        {showAllDates&&<div className="weekHeading"><span>NOW SHOWING</span><h3>{selectedDateLabel}</h3><p>The full daily program across all three auditoriums.</p></div>}
        <div className="movieGrid">{programMovies.map((movie, movieIndex)=><article className={`movieCard movie-${movie.id}`} key={movie.id}>
          <div className="movieArtwork"><img src={movie.poster} alt={`${movie.title} theatrical poster`}/><span>0{movieIndex+1}</span></div>
          <div className="movieCopy"><span className="movieEyebrow">{movie.eyebrow}</span><h3>{movie.title}</h3><p>{movie.description}</p><div className="showtimeList" aria-label={`${movie.title} showtimes`}>{movie.showtimes.map((show)=><button className={selectedShow.movieId===movie.id&&selectedShow.time===show.time&&selectedShow.auditorium===show.auditorium?"active":""} key={`${show.time}-${show.auditorium}`} onClick={()=>{setSelectedShow({movieId:movie.id,time:show.time,auditorium:show.auditorium});setSelectedSeats([]);setPreorder({});setShowPreorder(false);setShowCheckout(false);setAuthorizeFinalBill(false);setPaymentMethod("card");setMemberPricing(false);setPromoCode("");setPromoApplied(false);setGiftCardCode("");setGiftCardApplied(false);setShowSeatMap(true)}}><strong>{show.time}</strong><span>Theater {show.auditorium}</span></button>)}</div><div className="pairingPreview"><span>{movie.pairings.length ? "FEATURED FOOD + DRINK" : "FULL DINE-IN MENU AVAILABLE"}</span>{movie.pairings.map((pairing)=><b key={pairing}>{pairing}</b>)}</div></div>
        </article>)}</div></>}
        {showSeatMap && <div className="seatModeNav"><button onClick={()=>{if(showCheckout){setShowCheckout(false)}else{setShowSeatMap(false)}}}>← {showCheckout?"Back to seats":"Back to all showtimes"}</button><span>{selectedMovie.title} · {selectedDateLabel} at {selectedShow.time}</span></div>}
        {showSeatMap && !showCheckout && <>
        <div className="seatPrompt"><span>YOUR SELECTION</span><strong>{selectedMovie.title} · {selectedDateLabel} at {selectedShow.time}</strong><p>{layout.name} · {layout.seats} seats · Select a paired seat below</p></div>
        <div className="seatExperience">
          <div className={`auditorium plan-${layout.screen}`}><div className="planMeta"><strong>{layout.name}</strong><span>{layout.plan}</span></div><div className="seatLegend"><span><i className="availableDot"/>Available</span><span><i className="selectedDot"/>Selected</span><span><i className="reservedDot"/>Reserved</span></div><div className="roomPlan"><div className="screen"><span>SCREEN</span></div><div className="frontLabel">FRONT · ROW A</div><div className="seatMap pairedMap" aria-label={`Interactive ${layout.name} seat map`}>{Array.from({length:layout.rows},(_,index)=>String.fromCharCode(65+index)).map((row)=><div className="seatRow pairedRow" style={{gridTemplateColumns:`20px repeat(${layout.seatsPerRow/2}, minmax(42px, 1fr)) 20px`}} key={row}><b>{row}</b>{Array.from({length:layout.seatsPerRow/2},(_,pairIndex)=><div className="seatPair" key={`${row}-pair-${pairIndex+1}`}>{[pairIndex*2+1,pairIndex*2+2].map((number)=>{const seat=`${row}${number}`;const reserved=reservedSeats.includes(seat);const selected=selectedSeats.includes(seat);return <button key={seat} disabled={reserved} aria-label={`${seat}, ${reserved?"reserved":selected?"selected":"available"}`} aria-pressed={selected} className={reserved?"reserved":selected?"selected":""} onClick={()=>toggleSeat(seat)}><span>{number}</span></button>})}</div>)}<b>{row}</b></div>)}</div><div className="backLabel">BACK OF AUDITORIUM</div></div><p className="planCaveat">Seats are displayed in two-seat pairs without individual tables. Final spacing, ADA positions, aisles and egress require architect/code review.</p></div>
          <aside className="selectionCard">
            <span className="kicker">YOUR SHOWTIME</span><h3>{selectedMovie.title}</h3><p>{selectedDateLabel} · {selectedShow.time}<br/>{layout.name} · {layout.seats} seats</p>
            <div className="selectedLabel"><span>SELECTED SEATS</span><strong>{selectedSeats.length ? selectedSeats.join(" · ") : "Choose up to 4"}</strong></div>
            <button className="preorderToggle" onClick={()=>setShowPreorder((current)=>!current)}><span>{showPreorder?"Hide":"Add"} food & drinks</span><b>{preorderCount ? `${preorderCount} added` : "Optional"}</b></button>
            {showPreorder&&<div className="preorderPanel"><div className="preorderHead"><strong>Order ahead</strong><Link href="/menu">Menu details ↗</Link></div><p>Scroll the full food-and-drink menu first. All featured film specials remain available with every showtime at the bottom. You can still order more from your server.</p><div className="preorderScroll">{preorderCategories.map((category)=><section className="preorderCategory" key={category}><h4>{category}</h4>{availablePreorderItems.filter((item)=>item.category===category).map((item)=>{const quantity=preorder[item.id]??0;return <div className="preorderItem" key={item.id}><div><strong>{item.name}</strong><span>${item.price.toFixed(2)}</span></div><div className="quantityControl"><button aria-label={`Remove one ${item.name}`} disabled={!quantity} onClick={()=>changePreorder(item.id,-1)}>−</button><span>{quantity}</span><button aria-label={`Add one ${item.name}`} onClick={()=>changePreorder(item.id,1)}>+</button></div></div>})}</section>)}</div></div>}
            <div className="priceLine"><span>{selectedSeats.length} Adult {selectedSeats.length===1?"ticket":"tickets"} · ${ticketPrice} each{programDate.day==="Tuesday"?" · Tuesday pricing":""}</span><span>${ticketSubtotal.toFixed(2)}</span></div><div className="priceLine"><span>Online ticket fee · $2 each</span><span>${ticketFees.toFixed(2)}</span></div>{preorderTotal>0&&<div className="priceLine"><span>Food & drink pre-order</span><span>${preorderTotal.toFixed(2)}</span></div>}<div className="priceLine total"><strong>Estimated total</strong><strong>${(ticketSubtotal+ticketFees+preorderTotal).toFixed(2)}</strong></div>
            <div className="serviceNote"><b>At the theater</b><p>Pre-orders arrive at your seat. Your server can add anything else and settle with the authorized ticket card, cash, or another card.</p></div><button className="continueButton" disabled={!selectedSeats.length} onClick={()=>setShowCheckout(true)}>Continue with tickets{preorderCount?" + pre-order":""} <span>→</span></button>
          </aside>
        </div>
        </>}
        {showSeatMap && showCheckout && <div className="checkoutExperience">
          <section className="checkoutSummary"><span className="kicker">CHECKOUT</span><h3>{selectedMovie.title}</h3><p>{selectedDateLabel} · {selectedShow.time} · {layout.name}<br/>Seats {selectedSeats.join(" · ")}</p><div className="checkoutLines"><div><span>Tickets · {selectedSeats.length} × ${ticketPrice}{programDate.day==="Tuesday"?" · Tuesday pricing":""}</span><b>${ticketSubtotal.toFixed(2)}</b></div><div><span>Online ticket fees</span><b>${ticketFees.toFixed(2)}</b></div>{preorderTotal>0&&<><div><span>Food & beverage</span><b>${preorderTotal.toFixed(2)}</b></div><div><span>Estimated F&B tax · 9.25%</span><b>${foodTax.toFixed(2)}</b></div></>}{memberDiscount>0&&<div className="savingsLine"><span>Member savings</span><b>−${memberDiscount.toFixed(2)}</b></div>}{promoDiscount>0&&<div className="savingsLine"><span>Promotion</span><b>−${promoDiscount.toFixed(2)}</b></div>}{giftCardCredit>0&&<div className="savingsLine"><span>Gift card</span><b>−${giftCardCredit.toFixed(2)}</b></div>}<div className="checkoutTotal"><strong>Total due now</strong><strong>${checkoutTotal.toFixed(2)}</strong></div></div>{preorderCount>0&&<div className="orderedItems"><span>ORDER AHEAD · {preorderCount} ITEMS</span>{availablePreorderItems.filter((item)=>(preorder[item.id]??0)>0).map((item)=><p key={item.id}><b>{preorder[item.id]}×</b> {item.name}</p>)}</div>}<div className="tipAtCinema"><b>Tip at the cinema</b><p>Your server will bring the final food-and-drink bill near the end of the movie for you to review, add a tip, and sign.</p></div></section>
          <section className="paymentPanel"><span className="kicker">BENEFITS + PAYMENT</span><h3>Use your benefits</h3><p>Member pricing, promotion codes and gift cards can be applied before selecting a payment method.</p><div className="benefitStack"><div className="memberBenefit"><div><b>Attend Member</b><small>10% off adult tickets for this prototype</small></div><button className={memberPricing?"applied":""} onClick={()=>setMemberPricing((current)=>!current)}>{memberPricing?"Applied":"Apply member pricing"}</button></div><form className="codeBenefit" onSubmit={(event)=>{event.preventDefault();if(promoCode.trim())setPromoApplied(true)}}><label>Promotion code<input value={promoCode} onChange={(event)=>{setPromoCode(event.target.value);setPromoApplied(false)}} placeholder="Enter promo code"/></label><button className={promoApplied?"applied":""} disabled={!promoCode.trim()}>{promoApplied?"Applied · −$5":"Apply"}</button></form><form className="codeBenefit" onSubmit={(event)=>{event.preventDefault();if(giftCardCode.trim())setGiftCardApplied(true)}}><label>Gift card<input value={giftCardCode} onChange={(event)=>{setGiftCardCode(event.target.value);setGiftCardApplied(false)}} placeholder="Card number or code"/></label><button className={giftCardApplied?"applied":""} disabled={!giftCardCode.trim()}>{giftCardApplied?"$20 applied":"Apply balance"}</button></form></div>{(memberDiscount>0||promoDiscount>0||giftCardCredit>0)&&<div className="benefitSummary">{memberDiscount>0&&<span>Member savings <b>−${memberDiscount.toFixed(2)}</b></span>}{promoDiscount>0&&<span>Promotion <b>−${promoDiscount.toFixed(2)}</b></span>}{giftCardCredit>0&&<span>Gift card <b>−${giftCardCredit.toFixed(2)}</b></span>}<strong>Updated total <b>${checkoutTotal.toFixed(2)}</b></strong></div>}<h3 className="paymentHeading">Payment method</h3><p>Pay for tickets and any preorder now. If authorized below, this payment method can also secure the food-and-drink tab for these seats tonight.</p><div className="paymentTabs"><button className={paymentMethod==="card"?"active":""} onClick={()=>setPaymentMethod("card")}>Credit card</button><button className={paymentMethod==="apple"?"active":""} onClick={()=>setPaymentMethod("apple")}> Pay</button></div>{paymentMethod==="card"?<div className="cardFields"><label>Card number<input placeholder="1234 5678 9012 3456" inputMode="numeric"/></label><div><label>Expiration<input placeholder="MM / YY"/></label><label>Security code<input placeholder="CVC" inputMode="numeric"/></label></div><label>Name on card<input placeholder="Full name"/></label></div>:<div className="applePayPanel"><div className="appleMark"> Pay</div><p>Confirm your purchase securely with Apple Pay.</p></div>}<label className="finalBillConsent"><input type="checkbox" checked={authorizeFinalBill} onChange={(event)=>setAuthorizeFinalBill(event.target.checked)}/><span><b>I authorize this payment method for my final cinema bill.</b><small>Food and drinks added to these seats tonight may be charged after I review, tip, and sign the final bill.</small></span></label><button className={paymentMethod==="apple"?"applePayButton":"payButton"}>{paymentMethod==="apple"?"Buy with  Pay":"Pay"} · ${checkoutTotal.toFixed(2)}</button><small className="taxNote">Benefits and tax are illustrative in this prototype. Each theater controls its own programs, eligibility and tax configuration.</small></section>
        </div>}
      </section>

      <section className="audienceSection section" id="audience">
        <div className="sectionHead"><span className="kicker">04 / AUDIENCE + REVENUE</span><h2>Turn one good night<br/>into the next visit.</h2><p>Attend connects acquisition, loyalty and service without losing the seat-level operating context that makes dine-in cinema different.</p></div>
        <div className="audienceGrid">{audienceFeatures.map(([number,title,description])=><article key={title}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
        <div className="audienceBand"><div><span>ONE CUSTOMER ACCOUNT</span><strong>Tickets · dining · benefits · service recovery</strong></div><p>Prototype scope only. Durable balances, eligibility, accounting, fraud controls and redemption rules belong in later approved milestones.</p></div>
      </section>

      <section className="websitePaths section" id="websites">
        <div className="sectionHead"><span className="kicker">05 / WEBSITE DELIVERY</span><h2>Replace the website.<br/>Or fit into the one they love.</h2><p>Attend can be the full customer-facing platform or the commerce layer behind an existing theater brand and content site.</p></div>
        <div className="websitePathGrid"><article><span>OPTION 01 / MANAGED WEBSITE</span><h3>Build the theater’s complete digital front door.</h3><p>A branded, responsive cinema website managed from the same catalog and scheduling tools that power ticket sales.</p><ul><li>Custom domain, theme and page templates</li><li>Movies, series, calendars, menus and venue pages</li><li>Memberships, gift cards, donations and campaigns</li><li>Accessible checkout with reserved seating</li></ul></article><article><span>OPTION 02 / EXISTING-SITE INTEGRATION</span><h3>Keep the site. Embed Attend where buying begins.</h3><p>For established theaters, Attend supplies brandable components and APIs without forcing a full website migration.</p><ul><li>Showtime, calendar and seat-map embeds</li><li>Hosted or embedded checkout</li><li>Headless catalog and availability APIs</li><li>Single sign-on, analytics and conversion events</li></ul></article></div>
      </section>

      <section className="roadmap section" id="roadmap">
        <div className="roadmapIntro"><span className="kicker">06 / DELIVERY PLAN</span><h2>Prove the risky things<br/>in the right order.</h2><p>Each milestone ships a testable vertical capability. Select a milestone to see its completion target.</p><div className="selected"><span>MILESTONE {milestones[active][0]}</span><h3>{milestones[active][1]}</h3><p>{milestones[active][2]}.</p><strong>EXIT GATE</strong><p>{active===2 ? "Simultaneous attempts for the same seat produce exactly one valid hold and no oversell." : "Database, API, interface and automated checks agree on the documented behavior."}</p></div></div>
        <div className="timeline">{milestones.map((m,i)=><button className={active===i?"active":""} onClick={()=>setActive(i)} key={m[0]}><span>{m[0]}</span><div><strong>{m[1]}</strong><small>{m[2]}</small></div><b>↗</b></button>)}</div>
      </section>

      <section className="section decisions" id="decisions">
        <div className="sectionHead compact"><span className="kicker">05 / NON-NEGOTIABLES</span><h2>Designed around failure,<br/>not the happy path.</h2></div>
        <div className="riskTable"><div className="riskHeader"><span>RISK</span><span>SEVERITY</span><span>CONTROL</span></div>{risks.map(r=><div className="riskRow" key={r[0]}><strong>{r[0]}</strong><span className="severity">{r[1]}</span><p>{r[2]}</p></div>)}</div>
        <div className="assumptions"><div><span className="kicker">INITIAL ASSUMPTIONS</span><h3>One U.S. theater. Three auditoriums. Web first.</h3></div><ul><li>Stripe test mode behind a provider-neutral payments interface</li><li>PostgreSQL is the system of record; Redis is never the sole authority</li><li>Guest checkout and customer accounts; reputable managed identity for staff</li><li>Tax, alcohol, PCI and accounting rules require qualified review before launch</li></ul></div>
      </section>

      <section className="review" id="review"><div><span className="kicker">READY FOR ARCHITECTURE REVIEW</span><h2>Ten documents.<br/>One coherent foundation.</h2><p>Implementation intentionally stops before Milestone 0. The next step is to resolve the open decisions, approve boundaries and lock the first vertical slice.</p></div><div className="docGrid">{docs.map((d,i)=><span key={d}><b>{String(i+1).padStart(2,"0")}</b>{d}<i>↗</i></span>)}</div></section>
      <footer><div className="brand"><span className="brandMark">A</span><span>ATTEND</span></div><p>Architecture foundation for a connected dine-in cinema.</p><span>REVIEW BUILD / 01</span></footer>
    </main>
  );
}
