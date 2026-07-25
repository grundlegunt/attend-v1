import Link from "next/link";
import "./solutions.css";

type Solution = {
  mode: "integrated" | "complete";
  eyebrow: string;
  title: string;
  italic: string;
  intro: string;
  price: string;
  priceNote: string;
  features: Array<[string,string]>;
  flow: string[];
  operations: string[];
  otherHref: string;
  otherLabel: string;
};

export default function SolutionPage({solution}:{solution:Solution}){
  return <main className={`solutionPage ${solution.mode}`}>
    <header className="solutionNav"><Link className="solutionBrand" href="/">ATTEND</Link><nav><Link href="/">Cinema demo</Link><Link href="/schedule">Scheduler</Link><Link href="/theaters">Theaters</Link><Link href="/menu">Menu</Link><a href="#contact">Talk to us</a></nav><span>THEATER SOLUTIONS</span></header>
    <section className="solutionHero">
      <div className="solutionEyebrow"><span>{solution.eyebrow}</span><span>NASHVILLE · BUILT FOR INDEPENDENTS</span></div>
      <h1>{solution.title}<br/><em>{solution.italic}</em></h1>
      <div className="heroSplit"><p>{solution.intro}</p><div><b>{solution.price}</b><span>{solution.priceNote}</span></div></div>
      <div className="heroActions"><a href="#how-it-works">See how it works ↓</a><Link href={solution.otherHref}>Compare: {solution.otherLabel} →</Link></div>
    </section>

    <section className="promiseBand"><span>THE PROMISE</span><p>{solution.mode==="integrated"?"Keep the restaurant system your team already knows. Add modern reserved-seat ticketing without rerouting the theater’s money through Attend.":"One guest journey, one operational view, and one seat-linked record from checkout through the final check."}</p></section>

    <section className="solutionFeatures" id="how-it-works">
      <div className="featureIntro"><span>01 / WHAT YOU GET</span><h2>{solution.mode==="integrated"?"A better front door.\nYour operation stays yours.":"The whole night,\nconnected."}</h2></div>
      <div className="featureGrid">{solution.features.map(([title,copy],index)=><article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section className="moneySection">
      <div><span>02 / MONEY MOVEMENT</span><h2>Revenue goes<br/><em>straight to the theater.</em></h2><p>The theater remains the merchant of record. Attend collects only the agreed application or ticketing fee, while ticket and food revenue settles to the theater’s connected payment account.</p></div>
      <div className="moneyFlow">{solution.flow.map((step,index)=><div key={step}><b>{String(index+1).padStart(2,"0")}</b><span>{step}</span>{index<solution.flow.length-1&&<i>↓</i>}</div>)}</div>
    </section>

    <section className="operationsSection"><div><span>03 / OPERATIONS</span><h2>{solution.mode==="integrated"?"Connect, don’t replace.":"One source of truth."}</h2></div><ul>{solution.operations.map(item=><li key={item}>{item}<span>✓</span></li>)}</ul></section>

    <section className="fitSection"><span>BEST FIT</span><h2>{solution.mode==="integrated"?"For theaters that like their POS—but need a better ticketing experience.":"For dine-in theaters ready to run tickets, service and settlement as one platform."}</h2><div className="fitCards">{solution.mode==="integrated"?<><article><b>KEEP</b><p>Existing restaurant POS, kitchen workflow, merchant account and staff habits.</p></article><article><b>ADD</b><p>Reserved seating, ticket checkout, QR admission, customer accounts and cleaner reporting.</p></article><article><b>CONNECT</b><p>Orders and sales through a supported API, middleware or daily reconciliation export.</p></article></>:<><article><b>UNIFY</b><p>Ticketing, box office, server POS, kitchen routing and management reporting.</p></article><article><b>SERVE</b><p>Preorders and server-entered orders tied to the guest’s selected seats.</p></article><article><b>SETTLE</b><p>Authorized ticket card, another card or cash—with explicit consent and an audit trail.</p></article></>}</div></section>

    <section className="solutionCta" id="contact"><span>START WITH ONE THEATER</span><h2>Let’s design the operating model around your rooms, hardware and team.</h2><div><a href="mailto:hello@attend.example">Request a theater assessment →</a><Link href={solution.otherHref}>Explore {solution.otherLabel}</Link></div></section>
    <footer className="solutionFooter"><Link href="/">ATTEND</Link><span>Connected cinema operations</span><span>Nashville, Tennessee</span></footer>
  </main>
}
