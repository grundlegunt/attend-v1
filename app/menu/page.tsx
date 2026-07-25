import Link from "next/link";
import "./menu.css";

const foodSections = [
  { title: "Shareables", items: [
    ["Fresh Hot Popcorn", "Traditional salt, dill pickle, cacio e pepe, or sweet kettle"],
    ["Shoestring Fries", "Rosemary chive aioli and ketchup"],
    ["Hot Pretzels", "House-made pretzel rings with white cheddar queso and stone-ground mustard"],
    ["Picnic Platter", "Three cheeses and two meats with warm baguette, fig jam, nuts, and olives"],
    ["Stuffed Pepper Dip", "Creamy caramelized onion and banana pepper dip with crisp breadcrumb topping and hot bread"],
    ["Katsu-Style Chicken Tenders", "Plain or tossed in tonkatsu, lemon garlic herb, honey mustard, or tangy buffalo sauce"],
    ["Corn & Zucchini Fritters", "Light, crispy fritters with creamy dill dipping sauce"],
  ]},
  { title: "Toasties", note: "Hot sandwiches on buttermilk sourdough · add fries +$3", items: [
    ["Patty Melt", "Grass-fed organic ground beef, caramelized onions, white American cheese"],
    ["Classic", "Thinly sliced rosemary ham, baby Swiss cheese, dijonnaise"],
    ["Short Rib", "Braised short rib, aged white cheddar, balsamic and caramelized shallot spread"],
    ["Broccoli Cheddar", "Charred broccoli and aged white cheddar"],
    ["French Onion", "Smashed chicken meatballs, French onion soup-style caramelized onions, melty gruyere and mozzarella"],
    ["Spanikopita", "Spinach, mozzarella, feta, scallion, dill, honey sesame crust"],
  ]},
  { title: "Salads", items: [
    ["Tender Love", "Tangy buffalo chicken tenders, butter lettuce, carrot ribbons, creamy blue cheese crumbles, buttermilk dill dressing"],
    ["House Party", "Romaine, carrot, cucumber, red onion, garbanzo beans, toasted sunflower seeds, mozzarella, parmesan, croutons, garlic shallot vinaigrette"],
  ]},
  { title: "Sweet Treats", items: [
    ["Skillet Cookie", "Warm chocolate chip cookie with vanilla ice cream"],
    ["Dirt Sundae", "Vanilla soft serve, hot fudge, crumbled Oreos, gummy worms"],
    ["Seasonal Crumble", "Fruit crumble with buttery graham-cracker oat topping"],
    ["Affogato", "Vanilla soft serve topped with Crema espresso"],
    ["Candy Selection", "Gummy worms, peanut M&M's, Reese's Pieces, Sour Strips, Blow Pops, Milk Duds, Raisinets"],
  ]},
];

const cocktails = [
  ["Martini and a ½", "Dirty vodka or clean gin served with a sidecar on ice; olive, lemon twist, or pickled onion garnish"],
  ["Sunrise Cosmo", "Vodka, fresh lime, pomegranate juice, Aperol float"],
  ["Valley Girl", "Gin, fresh lime, house-made cucumber melon juice"],
  ["Dirty Work", "Vodka-spiced chai espresso martini"],
  ["Made in Manhattan", "Rye whiskey, amaro Nonino, house aromatic bitters, Luxardo cherry"],
  ["Old West", "Bourbon or rye, peppercorn simple syrup, house aromatic bitters, orange peel"],
  ["Smash Hit", "Bourbon, blackberry, blueberry, mint, fresh lemon"],
  ["Pool Party", "Tequila, hibiscus, jalapeño, fresh lime, agave, chili-salt rim"],
  ["Easy Rider", "Mezcal, mango purée, orange liqueur, fresh lime, chili-salt rim"],
  ["Ivory Tower", "Gin, elderflower liqueur, dry vermouth, lemon twist"],
  ["Highwire Act", "Japanese whiskey, ginger syrup, club soda, fresh lemon"],
  ["Scarface", "Rum, cherry cordial, cola, fresh lime"],
  ["Peach Fizz", "Vodka, Pimm's, muddled peach, fizzy orange wine"],
  ["Ocean Air", "Tequila, fresh lime and grapefruit, club soda, saltwater ice cubes"],
];

const lists = [
  { title: "Natural Wine", subtitle: "By the glass or bottle", groups: [
    ["Sparkling", "Flora Prosecco Brut · Tinc Set Ancestral · Lambrusco Dell'Emilio"],
    ["White", "Broadbent Vinho Verde · Christina Gruner Veltliner · Punta Crena Lumassina · Les Athlètes du Vin Chenin Blanc"],
    ["Orange & Skin Contact", "Vin de Days L'Orange · Love You Bunches Rosé · Swick Only Zuul Rosé"],
    ["Red", "Gulp Hablo Garnacha · Arboreto Montepulciano d'Abruzzo · Angelo Negro Vino Rosso · Las Jaras Glou Glou"],
  ]},
  { title: "Beer", subtitle: "Bottles, cans & drafts", groups: [
    ["Bottles & Cans", "Budweiser · Corona · Tiny Juicy IPA · German Pilsner · Lonestar Lager · Miller High Life Pony"],
    ["Drafts", "Japanese Lager · Guinness · Yazoo Pale Ale · Austin East Cider · Allagash White · Bearded Iris Homestyle IPA"],
  ]},
  { title: "Non-Alcoholic", subtitle: "Something good for everyone", groups: [
    ["Zero Proof", "Spring in Bottle N/A Sparkling Rosé · Best Day Brewing Kölsch · Athletic IPA · St. Agrestis Phony Negroni · Ghia Spritz · Hi-Yo Social Tonic"],
    ["Coffee & Tea", "Hot coffee · Cold brew · Espresso · Latte · Cortado · Spiced chai · Jasmine green · Lemon ginger"],
    ["Soda & Juice", "Coke · Diet Coke · Dr Pepper · Sprite · Fresh-squeezed orange juice"],
  ]},
];

function Items({items}:{items:string[][]}) { return <div className="menuItems">{items.map(([name,description])=><div className="menuItem" key={name}><h3>{name}</h3><p>{description}</p></div>)}</div> }

export default function MenuPage(){
  return <main className="menuPage">
    <header className="menuNav"><Link href="/">ATTEND</Link><nav><Link href="/#seat-preview">Now showing</Link><span>Menu</span></nav><small>Nashville, Tennessee</small></header>
    <section className="menuHero"><span>DINE-IN CINEMA · ALL DAY MENU</span><h1>Good food.<br/><em>Great movies.</em></h1><p>Order discreetly with your server from your seat. Settle with the card used for tickets, cash, or another card before the credits roll.</p></section>
    <section className="menuIntro"><span>01 / KITCHEN</span><h2>Food for the feature.</h2><p>Share it, make it dinner, or save room for something sweet.</p></section>
    <section className="foodGrid">{foodSections.map((section)=><article className="menuPanel" key={section.title}><h2>{section.title}</h2>{section.note&&<p className="menuNote">{section.note}</p>}<Items items={section.items}/></article>)}</section>
    <section className="drinkBand"><span>02 / BAR</span><h2>Cocktails after dark.</h2><p>Classic bones, playful details, and plenty without the proof.</p></section>
    <section className="cocktailPanel"><h2>Cocktails</h2><Items items={cocktails}/></section>
    <section className="drinkGrid">{lists.map((list)=><article className="menuPanel compactPanel" key={list.title}><h2>{list.title}</h2><p className="menuNote">{list.subtitle}</p>{list.groups.map(([name,items])=><div className="listGroup" key={name}><h3>{name}</h3><p>{items}</p></div>)}</article>)}</section>
    <section className="menuFooter"><div><span>FEATURED FILM PAIRINGS</span><h2>Something special<br/>for this week’s screen.</h2></div><div><b>F1</b><p>Grand Prix Burger · Pitt Crew · Redbull Spritz</p><b>Ghostbusters</b><p>Terror Dog · Marshmallow Man</p><b>The Wedding Singer</b><p>That’s a Good Meatball · Alabama Slammer</p></div></section>
    <footer className="menuBottom"><Link href="/#seat-preview">← Back to showtimes</Link><span>Menu subject to seasonal availability</span></footer>
  </main>
}
