import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { scholarships } from "../data/scholarships.js";
import { programs } from "../data/programs.js";
import { PERSONAS, TASKS } from "../data/personas.js";
import { useLocalStorage } from "../lib/storage.js";
import { getStatus } from "../lib/status.js";
import HeroScene from "../components/HeroScene.jsx";
import StickyWall from "../components/StickyWall.jsx";
import TornEdge from "../components/TornEdge.jsx";
import ShareButton from "../components/ShareButton.jsx";
import FieldArt from "../components/FieldArt.jsx";
import Icon from "../components/Icon.jsx";

const listings = (p) => [...Object.values(p.pub), ...Object.values(p.pri)].reduce((n, str) => n + str.split(";").length, 0);
const TILE_COLORS = ["bg-sage", "bg-sky", "bg-butter", "bg-peach", "bg-mist", "bg-stone"];

function ProgramsBand() {
  const fields = useMemo(() => {
    const map = {};
    programs.forEach((p) => { map[p.field] = (map[p.field] || 0) + listings(p); });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, []);
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <h2 className="h-section">Programs by field</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:grid-rows-2">
        {fields.map(([field], i) => (
          <Link key={field} to={"/programs?field=" + encodeURIComponent(field)}
            className={`${TILE_COLORS[i % TILE_COLORS.length]} relative flex min-h-32 flex-col justify-end overflow-hidden rounded-2xl p-4 hover:brightness-95 ${i === 0 ? "col-span-2 row-span-2 rounded-panel p-6" : ""}`}>
            <FieldArt field={field} big={i === 0} />
            <span className={`relative font-extrabold ${i === 0 ? "text-3xl" : "text-lg"}`}>{field}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

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

export default function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [pid, setPid] = useLocalStorage("iskolarph_persona", "incoming");
  const persona = PERSONAS.find((p) => p.id === pid) || PERSONAS[0];

  const upcoming = useMemo(() => {
    const dated = scholarships.filter((s) => s.deadline && getStatus(s).days >= 0);
    const mine = dated.filter((s) => s.levels.some((l) => persona.levels.includes(l)));
    return (mine.length ? mine : dated).sort((a, b) => getStatus(a).days - getStatus(b).days);
  }, [persona]);

  const bands = { programs: <ProgramsBand key="programs" />, parents: <ParentsBand key="parents" /> };
  return (
    <>
      <section className="bg-peach">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 pb-8 pt-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="min-w-0">
            <h1 className="max-w-[20ch] text-4xl leading-tight md:text-5xl">Find the scholarship that fits your grades, your course, and your budget.</h1>
            <form onSubmit={(e) => { e.preventDefault(); navigate("/scholarships?q=" + encodeURIComponent(q)); }} className="mt-6 flex flex-wrap gap-2" role="search">
              <label htmlFor="hero-q" className="sr-only">Search scholarships</label>
              <input id="hero-q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try 'engineering', 'Davao', or 'OFW dependents'" className="field min-w-0 flex-1 basis-60" />
              <button className="btn"><Icon name="search" className="h-4 w-4" />Search scholarships</button>
            </form>
            <fieldset className="mt-6">
              <legend className="mb-2 font-bold">I am a...</legend>
              <div className="flex flex-wrap gap-2">
                {PERSONAS.map((p) => (
                  <button key={p.id} type="button" aria-pressed={p.id === persona.id} onClick={() => setPid(p.id)}
                    className={`min-h-11 rounded-full border-2 px-4 font-bold ${p.id === persona.id ? "border-ink bg-ink text-paper" : "border-blush bg-paper hover:bg-cream"}`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
          <div className="relative min-w-0">
            <div className="hero-scene overflow-hidden rounded-panel shadow-lg"><HeroScene /></div>
            <div className="mt-4 sm:absolute sm:left-[4%] sm:top-[6%] sm:mt-0 sm:w-[46%]">
              <StickyWall items={upcoming.slice(0, 4)} />
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
