"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import "./meridian.css";
import "./meridian-clean.css";

const days = [
  { day: "SAT", date: "25" },
  { day: "SUN", date: "26" },
  { day: "MON", date: "27" },
  { day: "TUE", date: "28", note: "$8 tickets" },
  { day: "WED", date: "29" },
  { day: "THU", date: "30" },
  { day: "FRI", date: "31" },
];

const films = [
  {
    title: "F1",
    poster: "/posters/f1.png",
    meta: "Racing drama · 155 min",
    times: ["3:30 PM", "6:40 PM", "9:50 PM"],
  },
  {
    title: "Materialists",
    poster: "/posters/materialists.png",
    meta: "Romantic drama · 117 min",
    times: ["3:30 PM", "6:00 PM", "8:30 PM"],
  },
  {
    title: "Eddington",
    poster: "/posters/eddington.jpg",
    meta: "Dark comedy · 148 min",
    times: ["3:45 PM", "6:45 PM", "9:45 PM"],
  },
];

export default function MeridianPage() {
  const [selectedDay, setSelectedDay] = useState(0);
  const price = selectedDay === 3 ? 8 : 17;

  return (
    <main className="meridianPage">
      <header className="meridianNav">
        <Link href="/meridian" className="meridianLogo"><span>M</span><b>MERIDIAN<br/>CINEMA</b></Link>
        <nav>
          <a href="#showtimes">Showtimes</a>
          <a href="#dine">Food + Drink</a>
          <a href="#visit">Visit</a>
        </nav>
        <Link href="/#showtimes" className="meridianTicket">Buy tickets</Link>
      </header>

      <section className="meridianHero">
        <div className="heroMarquee"><span>NOW PLAYING</span><span>NASHVILLE, TENNESSEE</span></div>
        <div className="heroTitle">
          <h1>MERIDIAN</h1>
          <span>CINEMA</span>
        </div>
      </section>

      <section className="meridianDates" id="showtimes">
        <div className="dateStrip">{days.map((item,index)=><button className={selectedDay===index?"active":""} onClick={()=>setSelectedDay(index)} key={item.day}><span>{item.day}</span><b>{item.date}</b>{item.note&&<small>{item.note}</small>}</button>)}</div>
      </section>

      <section className="meridianProgram">
        <div className="programHeading">
          <span>{days[selectedDay].day} · JULY {days[selectedDay].date}</span>
          <h2>Showtimes</h2>
          <p>${price} tickets · $2 online fee</p>
        </div>
        <div className="meridianFilmGrid">
          {films.map((film,index)=><article className="meridianFilm" key={film.title}>
            <div className="filmPoster"><Image src={film.poster} alt={`${film.title} poster`} fill sizes="(max-width: 800px) 100vw, 33vw"/></div>
            <div className="filmDetails">
              <span>0{index+1} · {film.meta}</span>
              <h3>{film.title}</h3>
              <div className="meridianTimes">{film.times.map(time=><Link href="/#showtimes" key={time}><b>{time}</b><small>Theater · ${price}</small></Link>)}</div>
            </div>
          </article>)}
        </div>
      </section>

      <section className="meridianDine" id="dine">
        <div className="dineStatement">
          <h2>Food + Drink</h2>
          <Link href="/menu">Full menu →</Link>
        </div>
        <div className="dineMenu">
          <article><h3>Fresh Hot Popcorn</h3><b>$8</b></article>
          <article><h3>Patty Melt</h3><b>$16</b></article>
          <article><h3>Martini and a ½</h3><b>$15</b></article>
          <article><h3>Skillet Cookie</h3><b>$10</b></article>
        </div>
      </section>

      <section className="meridianVisit" id="visit">
        <div><h2>Visit</h2></div>
        <div className="visitDetails">
          <p><b>Location</b><br/>Nashville, Tennessee</p>
          <p><b>Box office</b><br/>30 minutes before the first show</p>
          <p><b>Access</b><br/>ADA seating · Assistive listening · Open captions</p>
        </div>
      </section>

      <footer className="meridianFooter">
        <div className="meridianLogo"><span>M</span><b>MERIDIAN<br/>CINEMA</b></div>
        <small>© Meridian Cinema</small>
      </footer>
    </main>
  );
}
