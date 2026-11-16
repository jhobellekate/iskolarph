import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { REGIONS, programs } from "../data/programs.js";

const FIELDS = [...new Set(programs.map((p) => p.field))].sort();
const ALPHABETICAL = new Intl.Collator("en", { sensitivity: "base", numeric: true });

function rowsFor(p) {
  const rows = [];
  [["Public", p.pub], ["Private", p.pri]].forEach(([type, byRegion]) =>
    Object.entries(byRegion).forEach(([region, names]) => names.split(";").forEach((u) => rows.push({ univ: u.trim(), type, region }))));
  return rows;
}

export default function Programs() {
  const [params] = useSearchParams();
  const [q, setQ] = useState("");
  const [field, setField] = useState(params.get("field") || "");
  const [type, setType] = useState("");
  const [region, setRegion] = useState("");
  const filtering = q || field || type || region;

  const groups = useMemo(() => {
    const t = q.trim().toLowerCase();
    return [...programs].sort((x, y) => ALPHABETICAL.compare(x.name, y.name)).filter((p) => !field || p.field === field).map((p) => {
      const nameHit = p.name.toLowerCase().includes(t);
      const rows = rowsFor(p).filter((r) => (!type || r.type === type) && (!region || r.region === region) && (!t || nameHit || r.univ.toLowerCase().includes(t))).sort((x, y) => ALPHABETICAL.compare(x.univ, y.univ));
      return { p, rows };
    }).filter((g) => g.rows.length);
  }, [q, field, type, region]);
  const total = groups.reduce((n, g) => n + g.rows.length, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl md:text-4xl">Programs and universities</h1>
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Field of study">
        <button aria-pressed={!field} onClick={() => setField("")} className={`min-h-11 rounded-full border-2 px-4 font-bold ${!field ? "border-ink bg-ink text-paper" : "border-blush bg-paper"}`}>All fields</button>
        {FIELDS.map((f) => (
          <button key={f} aria-pressed={field === f} onClick={() => setField(f)} className={`min-h-11 rounded-full border-2 px-4 font-bold ${field === f ? "border-ink bg-ink text-paper" : "border-blush bg-paper"}`}>{f}</button>
        ))}
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div><label htmlFor="pq" className="label">Search a program or school</label><input id="pq" type="search" className="field" value={q} onChange={(e) => setQ(e.target.value)} /></div>
        <div><label htmlFor="pt" className="label">Public or private</label>
          <select id="pt" className="field" value={type} onChange={(e) => setType(e.target.value)}><option value="">Both</option><option>Public</option><option>Private</option></select></div>
        <div><label htmlFor="pr" className="label">Region</label>
          <select id="pr" className="field" value={region} onChange={(e) => setRegion(e.target.value)}><option value="">All regions</option>{Object.entries(REGIONS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select></div>
      </div>
      <p className="mt-4 font-bold" aria-live="polite">{total} school listing{total === 1 ? "" : "s"} shown</p>
      <div className="mt-3 space-y-3">
        {groups.length ? groups.map(({ p, rows }) => (
          <details key={p.name} open={!!filtering} className="rounded-2xl border border-line bg-paper px-5 py-3">
            <summary className="cursor-pointer text-lg font-extrabold">{p.name} <span className="text-sm font-normal text-ink-soft">{p.field}</span></summary>
            <ul className="mt-3 divide-y divide-dashed divide-line">
              {rows.map((r, i) => (
                <li key={i} className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2">
                  <span className="min-w-0 font-bold">{r.univ}</span>
                  <span className={`rounded-lg px-2 text-sm font-bold ${r.type === "Public" ? "bg-sky" : "bg-butter"}`}>{r.type}</span>
                  <span className="text-sm text-ink-soft">{REGIONS[r.region]}</span>
                  <a className="text-sm font-bold text-rose underline" target="_blank" rel="noopener noreferrer" href={"https://www.google.com/search?q=" + encodeURIComponent(r.univ + " " + p.name + " official site")}>Find official page</a>
                  <a className="text-sm font-bold text-rose underline" href={"#/scholarships?q=" + encodeURIComponent(r.univ)}>Search scholarships</a>
                </li>
              ))}
            </ul>
          </details>
        )) : <p className="rounded-2xl border-2 border-dashed border-blush bg-paper p-5">Nothing matches. Try another field or clear the region.</p>}
      </div>
    </div>
  );
}
