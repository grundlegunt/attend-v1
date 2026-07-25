"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import "./theaters.css";
import "./aisle-controls.css";

type SeatType="standard"|"accessible"|"companion"|"blocked";
type Row={label:string;seats:number;aisleAfter:number|null;types:Record<number,SeatType>};
type Room={id:string;name:string;paired:boolean;screen:"top"|"bottom";rows:Row[]};
type Location={id:string;name:string;city:string;rooms:Room[]};

const makeRows=(count:number,seats:number):Row[]=>Array.from({length:count},(_,index)=>({label:String.fromCharCode(65+index),seats,aisleAfter:null,types:{}}));
const initialLocations:Location[]=[{id:"meridian-cinema",name:"Meridian Cinema",city:"Nashville, Tennessee",rooms:[
  {id:"room-1",name:"Theater 1",paired:true,screen:"top",rows:makeRows(6,16)},
  {id:"room-2",name:"Theater 2",paired:true,screen:"top",rows:makeRows(5,12)},
  {id:"room-3",name:"Theater 3",paired:true,screen:"top",rows:makeRows(4,8)},
]}];
const typeOrder:SeatType[]=["standard","accessible","companion","blocked"];
const seatLabel:Record<SeatType,string>={standard:"Standard",accessible:"Wheelchair space",companion:"Companion",blocked:"Not a seat"};

export default function TheatersPage(){
  const [locations,setLocations]=useState(initialLocations);
  const [locationId,setLocationId]=useState(initialLocations[0].id);
  const [roomId,setRoomId]=useState("room-1");
  const [notice,setNotice]=useState("The three demo rooms match the current Meridian Cinema concept.");
  const location=locations.find(item=>item.id===locationId)??locations[0];
  const room=location.rooms.find(item=>item.id===roomId)??location.rooms[0];
  const seatCount=useMemo(()=>room.rows.reduce((sum,row)=>sum+Array.from({length:row.seats},(_,i)=>row.types[i+1]).filter(type=>type!=="blocked").length,0),[room]);
  const updateRoom=(change:(current:Room)=>Room)=>setLocations(current=>current.map(item=>item.id!==location.id?item:{...item,rooms:item.rooms.map(candidate=>candidate.id===room.id?change(candidate):candidate)}));
  const addLocation=()=>{const number=locations.length+1;const id=`location-${number}`;const newRoom={id:`${id}-room-1`,name:"Auditorium 1",paired:false,screen:"top" as const,rows:makeRows(5,10)};setLocations(current=>[...current,{id,name:`New Theater Location ${number}`,city:"City, State",rooms:[newRoom]}]);setLocationId(id);setRoomId(newRoom.id);setNotice("New location added as a draft. Rename it and configure each auditorium.")};
  const addRoom=()=>{const number=location.rooms.length+1;const id=`${location.id}-room-${number}`;const newRoom={id,name:`Auditorium ${number}`,paired:false,screen:"top" as const,rows:makeRows(5,10)};setLocations(current=>current.map(item=>item.id!==location.id?item:{...item,rooms:[...item.rooms,newRoom]}));setRoomId(id);setNotice("New auditorium added with a starter 5 × 10 layout.")};
  const updateRow=(index:number,changes:Partial<Row>)=>updateRoom(current=>({...current,rows:current.rows.map((row,rowIndex)=>rowIndex===index?{...row,...changes}:row)}));
  const cycleSeat=(rowIndex:number,number:number)=>{const currentType=room.rows[rowIndex].types[number]??"standard";const next=typeOrder[(typeOrder.indexOf(currentType)+1)%typeOrder.length];updateRoom(current=>({...current,rows:current.rows.map((row,index)=>index!==rowIndex?row:{...row,types:{...row.types,[number]:next}})}));};
  return <main className="theaterSetupPage">
    <header className="setupNav"><Link href="/" className="setupBrand">ATTEND</Link><nav><Link href="/schedule">Scheduler</Link><span>Theaters</span><Link href="/">Customer site</Link></nav><div><small>CLIENT ACCOUNT</small><b>{locations.length} {locations.length===1?"location":"locations"}</b></div></header>
    <section className="setupIntro"><div><span>ACCOUNT / THEATER SETUP</span><h1>Every room<br/><em>fits differently.</em></h1></div><p>Add every theater location and build each auditorium around its real seating plan. Attend’s current 96-, 60-, and 32-seat rooms are examples—not platform limits.</p></section>
    <section className="setupWorkspace">
      <aside className="locationRail"><div className="railHeading"><span>LOCATIONS</span><button onClick={addLocation}>+ Add</button></div>{locations.map(item=><button className={item.id===location.id?"active":""} onClick={()=>{setLocationId(item.id);setRoomId(item.rooms[0].id)}} key={item.id}><b>{item.name}</b><span>{item.city} · {item.rooms.length} rooms</span></button>)}<div className="accountNote"><b>Multi-location account</b><p>Each location keeps its own rooms, seat maps, schedules, pricing and staff permissions.</p></div></aside>
      <div className="roomRail"><div className="railHeading"><span>AUDITORIUMS</span><button onClick={addRoom}>+ Add</button></div>{location.rooms.map(item=>{const count=item.rows.reduce((sum,row)=>sum+row.seats,0);return <button className={item.id===room.id?"active":""} onClick={()=>setRoomId(item.id)} key={item.id}><b>{item.name}</b><span>{count} positions · {item.rows.length} rows</span></button>})}</div>
      <section className="layoutEditor"><div className="editorHeader"><div><span>LAYOUT DESIGNER</span><input aria-label="Auditorium name" value={room.name} onChange={event=>updateRoom(current=>({...current,name:event.target.value}))}/><p>{seatCount} sellable positions · {room.rows.length} rows</p></div><button onClick={()=>setNotice(`${room.name} saved as a prototype layout. Live persistence belongs in an approved milestone.`)}>Save layout</button></div>
        <div className="layoutControls"><label>Seating style<select value={room.paired?"paired":"individual"} onChange={event=>updateRoom(current=>({...current,paired:event.target.value==="paired"}))}><option value="individual">Individual seats</option><option value="paired">Two-seat pairs</option></select></label><label>Screen position<select value={room.screen} onChange={event=>updateRoom(current=>({...current,screen:event.target.value as Room["screen"]}))}><option value="top">Top / Row A in front</option><option value="bottom">Bottom / final row in front</option></select></label><div className="seatLegendConfig">{typeOrder.map(type=><span key={type}><i className={type}/>{seatLabel[type]}</span>)}</div></div>
        <div className={`configRoom screen-${room.screen}`}>{room.screen==="top"&&<div className="configScreen">SCREEN</div>}<div className="configMap">{room.rows.map((row,rowIndex)=><div className="configRow" key={`${row.label}-${rowIndex}`}><b>{row.label}</b><div className={room.paired?"configuredSeats paired":"configuredSeats"}>{Array.from({length:row.seats},(_,index)=>index+1).map(number=>{const type=row.types[number]??"standard";return <button className={`${type} ${row.aisleAfter===number?"aisleAfter":""}`} aria-label={`${row.label}${number}, ${seatLabel[type]}`} title="Click to change seat type" onClick={()=>cycleSeat(rowIndex,number)} key={number}>{type==="accessible"?"♿":type==="companion"?"C":type==="blocked"?"×":number}</button>})}</div><b>{row.label}</b></div>)}</div>{room.screen==="bottom"&&<div className="configScreen">SCREEN</div>}</div>
        <div className="rowEditor"><div className="rowEditorHead"><div><span>ROW SETTINGS</span><small>Rows start without a center gap. Add a hall or aisle only where the room needs one.</small></div><button onClick={()=>updateRoom(current=>({...current,rows:[...current.rows,{label:String.fromCharCode(65+current.rows.length),seats:10,aisleAfter:null,types:{}}]}))}>+ Add row</button></div>{room.rows.map((row,index)=><div className="rowSetting" key={`${row.label}-setting`}><b>Row {row.label}</b><label>Seats<input type="number" min="1" max="40" value={row.seats} onChange={event=>{const seats=Math.max(1,Math.min(40,Number(event.target.value)));updateRow(index,{seats,aisleAfter:row.aisleAfter&&row.aisleAfter<seats?row.aisleAfter:null})}}/></label><label>Hall / gap after<select value={row.aisleAfter??0} onChange={event=>updateRow(index,{aisleAfter:Number(event.target.value)||null})}><option value={0}>No gap</option>{Array.from({length:Math.max(0,row.seats-1)},(_,seatIndex)=>seatIndex+1).map(number=><option value={number} key={number}>Seat {number}</option>)}</select></label><button onClick={()=>updateRoom(current=>({...current,rows:current.rows.filter((_,rowIndex)=>rowIndex!==index).map((item,rowIndex)=>({...item,label:String.fromCharCode(65+rowIndex)}))}))} disabled={room.rows.length===1}>Remove</button></div>)}</div><div className="setupNotice">{notice}</div>
      </section>
    </section>
    <section className="layoutRules"><div><span>CONFIGURATION SUPPORT</span><h2>More than a rectangle.</h2></div><div className="ruleGrid"><article><b>Uneven rows</b><p>Give every row its own length to match walls, curves and sightlines.</p></article><article><b>Aisles + gaps</b><p>Place aisle breaks within rows and mark positions that are not physical seats.</p></article><article><b>Accessibility</b><p>Identify wheelchair spaces and companion seats explicitly for customer selection.</p></article><article><b>Room variants</b><p>Support paired dine-in seats, individual chairs, recliners and mixed arrangements.</p></article></div></section>
    <footer className="setupFooter"><Link href="/schedule">Continue to scheduling →</Link><span>Configuration prototype · changes are not persisted</span></footer>
  </main>
}
