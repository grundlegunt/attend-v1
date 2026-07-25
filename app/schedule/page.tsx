"use client";

import Link from "next/link";
import { type DragEvent, useMemo, useState } from "react";
import { weeklyProgram } from "../page";
import "./schedule.css";
import "./schedule-responsive.css";

type Showing = {id:string;theater:number;title:string;start:number;runtime:number;status:"open"|"closed"|"sold";format:string};

const films = [
  {title:"F1",runtime:155,format:"DCP"},
  {title:"Materialists",runtime:117,format:"DCP"},
  {title:"Eddington",runtime:148,format:"DCP"},
  {title:"Ghostbusters",runtime:145,format:"35mm"},
  {title:"The Wedding Singer",runtime:132,format:"DCP"},
];

const initialSchedule: Showing[] = [
  {id:"t1-wedding",theater:1,title:"The Wedding Singer",start:660,runtime:97,status:"open",format:"DCP"},
  {id:"t1-1",theater:1,title:"F1",start:810,runtime:155,status:"open",format:"DCP"},
  {id:"t1-2",theater:1,title:"F1",start:1010,runtime:155,status:"open",format:"DCP"},
  {id:"t1-3",theater:1,title:"F1",start:1220,runtime:155,status:"sold",format:"DCP"},
  {id:"t1-4",theater:1,title:"Ghostbusters",start:1425,runtime:105,status:"closed",format:"35mm"},
  {id:"t2-1",theater:2,title:"Ghostbusters",start:675,runtime:105,status:"open",format:"35mm"},
  {id:"t2-2",theater:2,title:"Eddington",start:830,runtime:148,status:"open",format:"DCP"},
  {id:"t2-3",theater:2,title:"Materialists",start:1030,runtime:117,status:"open",format:"DCP"},
  {id:"t2-4",theater:2,title:"Materialists",start:1195,runtime:117,status:"open",format:"DCP"},
  {id:"t2-5",theater:2,title:"Materialists",start:1370,runtime:117,status:"closed",format:"DCP"},
  {id:"t3-1",theater:3,title:"F1",start:660,runtime:155,status:"open",format:"DCP"},
  {id:"t3-2",theater:3,title:"Materialists",start:865,runtime:117,status:"open",format:"DCP"},
  {id:"t3-3",theater:3,title:"Eddington",start:1035,runtime:148,status:"open",format:"DCP"},
  {id:"t3-4",theater:3,title:"Eddington",start:1235,runtime:148,status:"closed",format:"DCP"},
];

const suggestions = [
  {id:"s1",theater:3,title:"The Wedding Singer",start:1415,runtime:97,reason:"Fits before 1:00 AM with a 30-minute reset"},
  {id:"s2",theater:1,title:"The Wedding Singer",start:690,runtime:97,reason:"Opens the 96-seat room for a high-demand brunch show"},
  {id:"s3",theater:2,title:"Ghostbusters",start:1530,runtime:105,reason:"Late show after the final Materialists reset"},
];

const roomSeats:Record<number,number>={1:96,2:60,3:32};
const dayOptions=weeklyProgram.map(item=>`${item.day}, ${item.date}`);
const hours=["11 AM","12 PM","1 PM","2 PM","3 PM","4 PM","5 PM","6 PM","7 PM","8 PM","9 PM","10 PM","11 PM","12 AM","1 AM","2 AM","3 AM"];
const timelineStart=660;
const timelineMinutes=1020;
const preshowMinutes=30;
const cleaningMinutes=15;
const clock=(minutes:number)=>{const hour=Math.floor(minutes/60)%24;const minute=minutes%60;return `${hour%12||12}:${String(minute).padStart(2,"0")} ${hour>=12?"PM":"AM"}`};
const parseClock=(time:string)=>{const [value,period]=time.split(" ");const [rawHour,minute]=value.split(":").map(Number);let hour=(rawHour%12)+(period==="PM"?12:0);if(period==="AM"&&rawHour<=2)hour+=24;return hour*60+minute};
const titleById:Record<string,string>={f1:"F1",eddington:"Eddington",materialists:"Materialists",ghostbusters:"Ghostbusters","wedding-singer":"The Wedding Singer"};
const normalizeSchedule=(items:Showing[])=>{
  const normalized=items.map(show=>({...show}));
  [1,2,3].forEach(theater=>{
    let roomReady=timelineStart;
    normalized.filter(show=>show.theater===theater).sort((a,b)=>a.start-b.start).forEach(show=>{
      if(show.start<roomReady)show.start=Math.ceil(roomReady/5)*5;
      roomReady=show.start+preshowMinutes+show.runtime+cleaningMinutes;
    });
  });
  return normalized;
};
const publishedSchedule=(index:number):Showing[]=>normalizeSchedule(Object.entries(weeklyProgram[index].films).flatMap(([movieId,showtimes])=>showtimes.map((show,showIndex)=>{const film=films.find(item=>item.title===titleById[movieId])??films[0];return{id:`${weeklyProgram[index].date}-${movieId}-${showIndex}`,theater:show.auditorium,title:film.title,start:parseClock(show.time),runtime:film.runtime,status:"open" as const,format:film.format}})));

export default function SchedulePage(){
  const [day,setDay]=useState(dayOptions[0]);
  const buffer=cleaningMinutes;
  const [schedules,setSchedules]=useState<Record<string,Showing[]>>(()=>Object.fromEntries(dayOptions.map((option,index)=>[option,publishedSchedule(index)])));
  const schedule=schedules[day]??[];
  const [customTitle,setCustomTitle]=useState("");
  const [customRuntime,setCustomRuntime]=useState(120);
  const [customFormat,setCustomFormat]=useState("DCP");
  const [customTheater,setCustomTheater]=useState(1);
  const [customTime,setCustomTime]=useState("12:00");
  const [selectedId,setSelectedId]=useState(()=>publishedSchedule(0)[0]?.id??"");
  const [draggingId,setDraggingId]=useState<string|null>(null);
  const [dropPreview,setDropPreview]=useState<{theater:number;start:number;runtime:number}|null>(null);
  const [message,setMessage]=useState("All rooms have valid turnaround time.");
  const selected=useMemo(()=>schedule.find(show=>show.id===selectedId)??schedule[0],[schedule,selectedId]);
  const scheduledMinutes=schedule.reduce((sum,show)=>sum+show.runtime,0);
  const updateDaySchedule=(updater:(current:Showing[])=>Showing[])=>setSchedules(current=>({...current,[day]:updater(current[day]??[])}));
  const nearestValidStart=(showId:string,theater:number,desired:number,runtime:number)=>{
    const earliest=timelineStart;
    const latest=timelineStart+timelineMinutes-preshowMinutes-runtime-cleaningMinutes;
    const target=Math.max(earliest,Math.min(latest,Math.round(desired/5)*5));
    const others=schedule.filter(show=>show.id!==showId&&show.theater===theater);
    const candidates=Array.from({length:Math.floor((latest-earliest)/5)+1},(_,index)=>earliest+index*5).sort((a,b)=>Math.abs(a-target)-Math.abs(b-target));
    return candidates.find(start=>others.every(other=>start+preshowMinutes+runtime+cleaningMinutes<=other.start||start>=other.start+preshowMinutes+other.runtime+cleaningMinutes))??target;
  };
  const moveSelected=(theater:number,desired:number)=>{
    const start=nearestValidStart(selected.id,theater,desired,selected.runtime);
    updateSelected({theater,start});
    setMessage(start===Math.round(desired/5)*5?`${selected.title} moved to Theater ${theater} at ${clock(start)}.`:`${selected.title} moved to the nearest valid time, ${clock(start)}, to preserve 15 minutes for cleaning.`);
  };
  const nudgeSelected=(minutes:number)=>moveSelected(selected.theater,selected.start+minutes);
  const addSuggestion=(suggestion:typeof suggestions[number])=>{
    const id=`draft-${suggestion.id}`;
    if(schedule.some(show=>show.id===id)){setSelectedId(id);setMessage("That suggested showtime is already on the draft schedule.");return}
    const start=nearestValidStart(id,suggestion.theater,suggestion.start,suggestion.runtime);
    updateDaySchedule(current=>[...current,{...suggestion,id,start,status:"closed",format:films.find(film=>film.title===suggestion.title)?.format??"DCP"}]);
    setSelectedId(id);setMessage(`${suggestion.title} added as a closed draft. Review it before opening sales.`);
  };
  const toggleSales=()=>updateDaySchedule(current=>current.map(show=>show.id===selected.id?{...show,status:show.status==="open"?"closed":"open"}:show));
  const updateSelected=(changes:Partial<Showing>)=>updateDaySchedule(current=>current.map(show=>show.id===selected.id?{...show,...changes}:show));
  const addFilm=(film:typeof films[number])=>{
    const counts=[1,2,3].map(theater=>({theater,count:schedule.filter(show=>show.theater===theater).length})).sort((a,b)=>a.count-b.count);
    const theater=counts[0].theater;
    const roomShows=schedule.filter(show=>show.theater===theater);
    const id=`added-${film.title.toLowerCase().replace(/[^a-z0-9]+/g,"-")}-${Date.now()}`;
    const desired=roomShows.length?Math.min(1500,Math.max(...roomShows.map(show=>show.start+preshowMinutes+show.runtime+buffer))):660;
    const start=nearestValidStart(id,theater,desired,film.runtime);
    updateDaySchedule(current=>[...current,{id,theater,title:film.title,start,runtime:film.runtime,status:"closed",format:film.format}]);
    setSelectedId(id);setMessage(`${film.title} added as a closed draft. Adjust its room and start time in the editor.`);
  };
  const addCustomFilm=()=>{
    if(!customTitle.trim())return;
    const [hour,minute]=customTime.split(":").map(Number);
    const id=`custom-${Date.now()}`;
    const start=nearestValidStart(id,customTheater,hour*60+minute,customRuntime);
    updateDaySchedule(current=>[...current,{id,theater:customTheater,title:customTitle.trim(),start,runtime:customRuntime,status:"closed",format:customFormat}]);
    setSelectedId(id);setMessage(`${customTitle.trim()} added to ${day} as a movable closed draft.`);setCustomTitle("");
  };
  const chooseDay=(option:string)=>{setDay(option);const next=schedules[option]??[];setSelectedId(next[0]?.id??"");setMessage(`${option} loaded. Your planning changes are preserved when you switch dates.`)};
  const dropShow=(event:DragEvent<HTMLDivElement>,theater:number)=>{
    event.preventDefault();
    if(!draggingId)return;
    const show=schedule.find(item=>item.id===draggingId);
    if(!show)return;
    const rect=event.currentTarget.getBoundingClientRect();
    const rawStart=timelineStart+((event.clientX-rect.left)/rect.width)*timelineMinutes;
    const snapped=Math.round(rawStart/5)*5;
    const start=dropPreview?.theater===theater?dropPreview.start:nearestValidStart(show.id,theater,snapped,show.runtime);
    updateDaySchedule(current=>current.map(item=>item.id===draggingId?{...item,theater,start}:item));
    setSelectedId(draggingId);setDraggingId(null);setDropPreview(null);
    setMessage(start===snapped?`${show.title} moved to Theater ${theater} at ${clock(start)}.`:`${show.title} moved to the nearest valid time, ${clock(start)}, to preserve 15 minutes for cleaning.`);
  };
  const previewDrop=(event:DragEvent<HTMLDivElement>,theater:number)=>{
    event.preventDefault();
    if(!draggingId)return;
    const show=schedule.find(item=>item.id===draggingId);
    if(!show)return;
    const rect=event.currentTarget.getBoundingClientRect();
    const desired=timelineStart+((event.clientX-rect.left)/rect.width)*timelineMinutes;
    setDropPreview({theater,start:nearestValidStart(show.id,theater,desired,show.runtime),runtime:show.runtime});
  };
  return <main className="schedulerPage">
    <header className="schedulerNav"><Link href="/" className="schedulerBrand">ATTEND</Link><nav><Link href="/">Customer site</Link><span>Schedule</span><Link href="/theaters">Theaters</Link><a href="#film-library">Film library</a><a href="#planning">Planning</a></nav><div className="venueSwitch"><small>DEMO VENUE</small><b>Meridian Cinema · 3 rooms</b></div></header>
    <section className="schedulerIntro"><div><span>THEATER ADMIN / SCHEDULER</span><h1>Build the week.<br/><em>Protect the room.</em></h1></div><p>Place films by auditorium, account for runtime and cleanup, then open sales only when the program is ready. This prototype does not persist or publish showtimes.</p></section>
    <section className="scheduleToolbar"><div className="dateTabs">{dayOptions.map(option=><button className={day===option?"active":""} onClick={()=>chooseDay(option)} key={option}>{option}</button>)}</div><div className="scheduleActions"><span className="fixedCleaning">15 min cleaning · fixed</span><button onClick={()=>setMessage(`${day} copied as a draft.`)}>Copy day</button><button onClick={()=>setMessage("Schedule export prepared for PDF or CSV in a future milestone.")}>Export</button></div></section>
    <section className="scheduleWorkspace">
      <div className="timelinePanel"><div className="scheduleStatus"><span><i className="statusOpen"/>Open for sale</span><span><i className="statusClosed"/>Closed draft</span><span><i className="statusSold"/>Tickets sold</span><b>{message}</b></div><div className="dragHint">Each block includes 30-minute pre-show + film runtime · 15-minute cleaning gap enforced</div><div className="timeHeader"><span>ROOM</span><div>{hours.map(hour=><b key={hour}>{hour}</b>)}</div></div>{[1,2,3].map(theater=><div className="roomRow" key={theater}><div className="roomLabel"><b>Theater {theater}</b><span>{roomSeats[theater]} seats</span></div><div className={`timeTrack ${draggingId?"dropReady":""}`} onDragOver={event=>previewDrop(event,theater)} onDrop={event=>dropShow(event,theater)}>{hours.map(hour=><i key={hour}/>)}{dropPreview?.theater===theater&&<div className="dropPreview" style={{left:`${((dropPreview.start-timelineStart)/timelineMinutes)*100}%`,width:`${((preshowMinutes+dropPreview.runtime)/timelineMinutes)*100}%`}}><span>{clock(dropPreview.start)}</span></div>}{schedule.filter(show=>show.theater===theater).map(show=><button draggable key={show.id} className={`showBlock ${show.status} ${selected.id===show.id?"selected":""} ${draggingId===show.id?"dragging":""}`} style={{left:`${((show.start-timelineStart)/timelineMinutes)*100}%`,width:`${((preshowMinutes+show.runtime)/timelineMinutes)*100}%`}} onDragStart={event=>{setDraggingId(show.id);setSelectedId(show.id);setDropPreview({theater:show.theater,start:show.start,runtime:show.runtime});event.dataTransfer.effectAllowed="move";event.dataTransfer.setData("text/plain",show.id)}} onDragEnd={()=>{setDraggingId(null);setDropPreview(null)}} onClick={()=>setSelectedId(show.id)}><strong>{show.title}</strong><span className="showTiming">Doors {clock(show.start)} · Feature {clock(show.start+preshowMinutes)}</span></button>)}</div></div>)}</div>
      <aside className="showEditor"><span>SELECTED SHOWTIME</span><h2>{selected.title}</h2><p>Theater {selected.theater} · {roomSeats[selected.theater]} seats</p><div className="editorFacts"><div><small>DOORS / LISTED TIME</small><b>{clock(selected.start)}</b></div><div><small>FEATURE STARTS</small><b>{clock(selected.start+preshowMinutes)}</b></div><div><small>FILM ENDS</small><b>{clock(selected.start+preshowMinutes+selected.runtime)}</b></div><div><small>ROOM READY</small><b>{clock(selected.start+preshowMinutes+selected.runtime+cleaningMinutes)}</b></div></div><div className="moveControls"><label>Move to room<select value={selected.theater} onChange={event=>moveSelected(Number(event.target.value),selected.start)}><option value="1">Theater 1 · 96 seats</option><option value="2">Theater 2 · 60 seats</option><option value="3">Theater 3 · 32 seats</option></select></label><label>Doors / listed time<input type="time" step="300" value={`${String(Math.floor(selected.start/60)%24).padStart(2,"0")}:${String(selected.start%60).padStart(2,"0")}`} onChange={event=>{const [rawHour,minute]=event.target.value.split(":").map(Number);const hour=rawHour<=3?rawHour+24:rawHour;moveSelected(selected.theater,hour*60+minute)}}/></label><div className="timeNudges" aria-label="Adjust start time"><button onClick={()=>nudgeSelected(-15)}>−15 min</button><button onClick={()=>nudgeSelected(-5)}>−5 min</button><button onClick={()=>nudgeSelected(5)}>+5 min</button><button onClick={()=>nudgeSelected(15)}>+15 min</button></div></div><label>Sale status<select value={selected.status} onChange={event=>updateSelected({status:event.target.value as Showing["status"]})}><option value="open">Open for sale</option><option value="closed">Closed draft</option><option value="sold">Tickets sold</option></select></label><label>Ticket group<select value={day.startsWith("Tuesday")?"Tuesday · $8":"Standard · $17"} readOnly><option>{day.startsWith("Tuesday")?"Tuesday · $8":"Standard · $17"}</option></select></label><label>Film series<select><option>None</option><option>Staff Picks</option><option>Late Round</option><option>Sunday Classics</option></select></label><label>Presentation<select><option>Standard</option><option>Open captions</option><option>Audio description</option><option>Q&amp;A / special guest</option></select></label><div className="editorChecks"><span>✓ 30 minutes for doors, ordering, and trailers</span><span>✓ Film runtime begins at feature start</span><span>✓ 15-minute cleaning gap is enforced automatically</span></div><button onClick={toggleSales}>{selected.status==="open"?"Close sales":"Open sales"}</button><small className="prototypeNote">The full block reserves the theater from doors opening through the end of the film. Cleaning is protected immediately afterward.</small></aside>
    </section>
    <section className="planningSection" id="planning"><div className="planningIntro"><span>SMART PLANNING</span><h2>Use the gaps.<br/>Don’t create collisions.</h2><p>Suggestions combine film runtime, room size, turnaround time and the current program. Attendance forecasts and distributor constraints would be later integrations.</p></div><div className="suggestionGrid">{suggestions.map(suggestion=><article key={suggestion.id}><span>THEATER {suggestion.theater} · {roomSeats[suggestion.theater]} SEATS</span><h3>{suggestion.title}</h3><b>{clock(suggestion.start)} → {clock(suggestion.start+preshowMinutes+suggestion.runtime+buffer)}</b><p>{suggestion.reason}</p><button onClick={()=>addSuggestion(suggestion)}>Add closed draft +</button></article>)}</div></section>
    <section className="filmLibrary" id="film-library"><div><span>FILM LIBRARY</span><h2>Add to this week</h2><p>Choose a listed film or enter any other movie. New showtimes start as closed drafts and can be dragged into place.</p></div><div><form className="customFilmForm" onSubmit={event=>{event.preventDefault();addCustomFilm()}}><h3>Add another movie</h3><label>Movie title<input required value={customTitle} onChange={event=>setCustomTitle(event.target.value)} placeholder="Enter film title"/></label><label>Runtime<input type="number" min="1" max="400" value={customRuntime} onChange={event=>setCustomRuntime(Number(event.target.value))}/></label><label>Format<select value={customFormat} onChange={event=>setCustomFormat(event.target.value)}><option>DCP</option><option>35mm</option><option>70mm</option><option>Digital</option></select></label><label>Room<select value={customTheater} onChange={event=>setCustomTheater(Number(event.target.value))}><option value="1">Theater 1</option><option value="2">Theater 2</option><option value="3">Theater 3</option></select></label><label>Start<input type="time" value={customTime} onChange={event=>setCustomTime(event.target.value)}/></label><button>Add movie +</button></form>{films.map(film=><article key={film.title}><b>{film.title}</b><span>{film.runtime} min</span><span>{film.format}</span><button onClick={()=>addFilm(film)}>Add +</button></article>)}</div></section>
    <section className="scheduleMetrics"><div><span>SHOWTIMES</span><b>{schedule.length}</b></div><div><span>PROGRAMMED HOURS</span><b>{Math.round(scheduledMinutes/60)}h</b></div><div><span>OPEN FOR SALE</span><b>{schedule.filter(show=>show.status==="open").length}</b></div><div><span>CLOSED DRAFTS</span><b>{schedule.filter(show=>show.status==="closed").length}</b></div></section>
    <footer className="schedulerFooter"><Link href="/">← Attend platform</Link><span>Scheduling prototype · no showtimes are published</span></footer>
  </main>
}
