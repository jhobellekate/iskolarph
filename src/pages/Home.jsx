import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { findScholarship } from "../data/scholarships.js";
import { programs } from "../data/programs.js";
import { PERSONAS, TASKS } from "../data/personas.js";
import { useLocalStorage } from "../lib/storage.js";
import { getStatus } from "../lib/status.js";
import { APPLICATION_STATUSES, useFolder } from "../context/FolderContext.jsx";
import HeroScene from "../components/HeroScene.jsx";
import StickyWall from "../components/StickyWall.jsx";
import TornEdge from "../components/TornEdge.jsx";
import ShareButton from "../components/ShareButton.jsx";
import FieldArt from "../components/FieldArt.jsx";
import Icon from "../components/Icon.jsx";

// Counts how many school listings are in a program summary.
const listings = (p) => [...Object.values(p.pub), ...Object.values(p.pri)].reduce((n, str) => n + str.split(";").length, 0);
const TILE_STYLES = {
  Engineering: "bg-sky text-ink",
  "Information Technology": "bg-sage text-ink",
  "Agriculture and Fisheries": "bg-butter text-ink",
  "Architecture and Design": "bg-mist text-ink",
  "Aviation and Maritime": "bg-peach text-ink",
  Business: "bg-cream text-ink",
  "Communication and Media": "bg-stone text-ink",
  Education: "bg-blush text-ink",
  "Health Sciences": "bg-paper text-ink",
  "Hospitality and Tourism": "bg-blush-deep text-ink",
  "Law and Public Safety": "bg-line text-ink",
  Science: "bg-ink-soft text-paper",
  "Social Sciences": "bg-ink text-paper",
};

// Shows the most popular program fields on the home page.
function ProgramsBand() {
  const fields = useMemo(() => {
    const map = {};
    programs.forEach((p) => { map[p.field] = (map[p.field] || 0) + listings(p); });
    const sorted = Object.entries(map).sort((a, b) => b[1] - a[1]);
    const engineering = sorted.find(([field]) => field === "Engineering");
    return engineering ? [engineering, ...sorted.filter(([field]) => field !== "Engineering")] : sorted;
  }, []);
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="h-section">Programs by field</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
        {fields.map(([field], i) => (
          <Link key={field} to={"/programs?field=" + encodeURIComponent(field)}
            className={`${TILE_STYLES[field] || "bg-stone text-ink"} relative flex min-h-32 flex-col justify-end overflow-hidden rounded-2xl p-4 hover:brightness-95 ${i === 0 ? "col-span-2 row-span-2 rounded-panel p-6" : ""}`}>
            <FieldArt field={field} big={i === 0} />
            <span className={`relative font-extrabold ${i === 0 ? "text-3xl" : "text-lg"}`}>{field}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Highlights the shareable planning section for families.
function ParentsBand() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="panel grid gap-6 bg-sage md:grid-cols-[1.2fr_1fr] md:items-center">
        <h2 className="text-2xl md:text-3xl">Planning together</h2>
        <ShareButton />
      </div>
    </section>
  );
}

// Displays the landing page with search, programs, and upcoming deadlines.
export default function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [pid] = useLocalStorage("iskolarph_persona", "incoming");
  const { saved, entryOf } = useFolder();
  const persona = PERSONAS.find((p) => p.id === pid) || PERSONAS[0];

  const reminders = useMemo(() => saved
    .map((id) => {
      const scholarship = findScholarship(id);
      if (!scholarship) return null;
      const entry = entryOf(id);
      const deadline = entry.personalDeadline || scholarship.deadline;
      const reminder = { ...scholarship, deadline };
      return deadline && !APPLICATION_STATUSES.includes(entry.status) && getStatus(reminder).days >= 0
        ? { ...reminder, isPersonalDeadline: Boolean(entry.personalDeadline) }
        : null;
    })
    .filter(Boolean)
    .sort((a, b) => getStatus(a).days - getStatus(b).days), [saved, entryOf]);

  const bands = { programs: <ProgramsBand key="programs" />, parents: <ParentsBand key="parents" /> };
  return (
    <>
      <section className="bg-peach">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-8 pt-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="min-w-0">
            <h1 className="max-w-[20ch] text-4xl leading-tight md:text-5xl">Find the scholarship that fits your grades, your course, and your budget.</h1>
            <form onSubmit={(e) => { e.preventDefault(); const query = q.trim(); if (query) navigate("/scholarships?q=" + encodeURIComponent(query)); }} className="mt-6 flex flex-wrap gap-2" role="search">
              <label htmlFor="hero-q" className="sr-only">Search scholarships</label>
              <input id="hero-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try 'engineering', 'Davao', or 'OFW dependents'" className="field min-w-0 flex-1 basis-60" />
              <button className="btn disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-blush" disabled={!q.trim()}><Icon name="search" className="h-4 w-4" />Search scholarships</button>
            </form>
          </div>
          <div className="relative min-w-0">
            <div className="hero-scene relative min-h-[19rem] overflow-hidden rounded-panel bg-peach shadow-lg sm:min-h-0">
              <HeroScene />
              <div className="absolute inset-x-0 top-0 aspect-[14/11]">
                <StickyWall items={reminders} />
              </div>
            </div>
          </div>
        </div>
      </section>
      <TornEdge className="text-peach" />

      <section className="mx-auto max-w-6xl px-4 py-10">
        <h2 className="h-section">Start here</h2>
        <ul className="grid gap-3 md:grid-cols-3 md:grid-rows-2">
          {persona.tasks.map((k, i) => {
            const t = TASKS[k];
            return (
              <li key={k} className={i === 0 ? "md:col-span-2 md:row-span-2" : ""}>
                <Link to={t.to} className={`flex h-full min-h-24 items-center gap-4 rounded-2xl border border-line p-5 hover:brightness-95 ${i === 0 ? "bg-butter md:rounded-panel md:p-8" : "bg-paper"}`}>
                  <Icon name={t.icon} className={i === 0 ? "h-10 w-10 shrink-0" : "h-6 w-6 shrink-0"} />
                  <span className={`font-extrabold ${i === 0 ? "text-2xl md:text-3xl" : "text-lg"}`}>{t.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
      {persona.order.map((k) => bands[k])}
    </>
  );
}
