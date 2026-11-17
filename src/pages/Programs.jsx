import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { REGIONS, programs } from "../data/programs.js";

const FIELDS = [...new Set(programs.map((p) => p.field))].sort();
const EMPTY = { q: "", field: "", type: "", region: "" };

function rowsFor(p) {
  const rows = [];
  [["Public", p.pub], ["Private", p.pri]].forEach(([type, byRegion]) =>
    Object.entries(byRegion).forEach(([region, names]) => names.split(";").forEach((u) => rows.push({ univ: u.trim(), type, region }))));
  return rows;
}

function Field({ id, label, children }) {
  return <div><label htmlFor={id} className="label">{label}</label>{children}</div>;
}

const TH = "px-3 py-2 font-extrabold";
const CELL = "block px-4 py-1 before:mr-2 before:font-normal before:text-ink-soft before:content-[attr(data-label)] md:table-cell md:px-3 md:py-2 md:before:content-none";

export default function Programs() {
  const [params] = useSearchParams();
  const [f, setF] = useState({ ...EMPTY, field: params.get("field") || "" });
  const [panel, setPanel] = useState(false);
  const set = (k) => (e) => setF((o) => ({ ...o, [k]: e.target.value }));
  const filtering = f.q || f.field || f.type || f.region;

  const groups = useMemo(() => {
    const t = f.q.trim().toLowerCase();
    return [...programs].sort((x, y) => x.name.localeCompare(y.name)).filter((p) => !f.field || p.field === f.field).map((p) => {
      const nameHit = p.name.toLowerCase().includes(t);
      const rows = rowsFor(p)
        .filter((r) => (!f.type || r.type === f.type) && (!f.region || r.region === f.region) && (!t || nameHit || r.univ.toLowerCase().includes(t)))
        .sort((x, y) => x.univ.localeCompare(y.univ));
      return { p, rows };
    }).filter((g) => g.rows.length);
  }, [f]);
  const total = groups.reduce((n, g) => n + g.rows.length, 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl md:text-4xl">Programs and universities</h1>
      <button className="btn-ghost mb-4 lg:hidden" aria-expanded={panel} aria-controls="pfilters" onClick={() => setPanel(!panel)}>{panel ? "Hide filters" : "Show filters"}</button>
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <form id="pfilters" onSubmit={(e) => e.preventDefault()} className={`${panel ? "grid" : "hidden"} content-start gap-4 rounded-panel border border-line bg-paper p-5 lg:sticky lg:top-4 lg:grid lg:self-start`}>
          <Field id="pq" label="Search"><input id="pq" type="search" className="field" value={f.q} onChange={set("q")} placeholder="Program or school" /></Field>
          <Field id="pf" label="Field of study">
            <select id="pf" className="field" value={f.field} onChange={set("field")}><option value="">All fields</option>{FIELDS.map((x) => <option key={x}>{x}</option>)}</select>
          </Field>
          <Field id="pt" label="Public or private">
            <select id="pt" className="field" value={f.type} onChange={set("type")}><option value="">Both</option><option>Public</option><option>Private</option></select>
          </Field>
          <Field id="pr" label="Region">
            <select id="pr" className="field" value={f.region} onChange={set("region")}><option value="">All regions</option>{Object.entries(REGIONS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}</select>
          </Field>
          <button type="button" className="btn-ghost" onClick={() => setF(EMPTY)}>Clear filters</button>
        </form>
        <section aria-label="Results" className="min-w-0">
          <p className="mb-3 font-bold" aria-live="polite">{total} school listing{total === 1 ? "" : "s"} shown</p>
          <div className="space-y-3">
            {groups.length ? groups.map(({ p, rows }) => (
              <details key={p.name} open={!!filtering} className="rounded-2xl border border-line bg-paper px-5 py-3">
                <summary className="cursor-pointer text-lg font-extrabold">{p.name} <span className="text-sm font-normal text-ink-soft">{p.field}, {rows.length} listing{rows.length === 1 ? "" : "s"}</span></summary>
                <div className="mt-3 overflow-hidden rounded-xl border border-line">
                  <table className="w-full text-left">
                    <caption className="sr-only">Schools offering {p.name}</caption>
                    <thead className="hidden bg-peach text-sm md:table-header-group">
                      <tr><th scope="col" className={TH}>School</th><th scope="col" className={TH}>Type</th><th scope="col" className={TH}>Region</th><th scope="col" className={TH}>Links</th></tr>
                    </thead>
                    <tbody>
                      {rows.map((r, i) => (
                        <tr key={i} className="block border-b border-line py-2 last:border-0 md:table-row md:py-0">
                          <th scope="row" className="block px-4 font-bold md:table-cell md:px-3 md:py-2">{r.univ}</th>
                          <td data-label="Type: " className={CELL}><span className={`rounded-lg px-2 text-sm font-bold ${r.type === "Public" ? "bg-sky" : "bg-butter"}`}>{r.type}</span></td>
                          <td data-label="Region: " className={CELL}>{REGIONS[r.region]}</td>
                          <td className={CELL + " space-x-3"}>
                            <a className="text-sm font-bold text-rose underline" target="_blank" rel="noopener noreferrer" href={"https://www.google.com/search?q=" + encodeURIComponent(r.univ + " " + p.name + " official site")}>Find official page</a>
                            <a className="text-sm font-bold text-rose underline" href={"#/scholarships?q=" + encodeURIComponent(r.univ)}>Search scholarships</a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </details>
            )) : <p className="rounded-2xl border-2 border-dashed border-blush bg-paper p-5">Nothing matches. Try another field or clear the region.</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
