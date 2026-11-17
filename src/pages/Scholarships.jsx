import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { scholarships } from "../data/scholarships.js";
import { STATUS_LABELS, getStatus } from "../lib/status.js";
import { useFolder } from "../context/FolderContext.jsx";
import ScholarshipCard from "../components/ScholarshipCard.jsx";

const PAGE = 24;
const PLACES = [...new Set(scholarships.map((s) => s.location))].sort();
const EMPTY = { q: "", type: "", level: "", loc: "", status: "", sort: "name" };

// Renders a label and input for the scholarship filter panel.
function Field({ id, label, children }) {
  return <div><label htmlFor={id} className="label">{label}</label>{children}</div>;
}

// Shows the searchable scholarship directory with filters and pagination.
export default function Scholarships() {
  const [params] = useSearchParams();
  const { isSaved, toggleSaved, openDetails } = useFolder();
  const [f, setF] = useState({ ...EMPTY, q: params.get("q") || "" });
  const [shown, setShown] = useState(PAGE);
  const [panel, setPanel] = useState(false);
  // Updates a filter and resets the visible list size.
  const set = (k) => (e) => { setF((o) => ({ ...o, [k]: e.target.value })); setShown(PAGE); };

  const list = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    const out = scholarships.filter((s) =>
      (!q || (s.name + " " + s.provider + " " + s.description + " " + s.location).toLowerCase().includes(q)) &&
      (!f.type || s.type === f.type) && (!f.level || s.levels.includes(f.level)) &&
      (!f.loc || s.location === f.loc) && (!f.status || getStatus(s).label === f.status));
    return out.sort(f.sort === "deadline" ? (a, b) => (a.deadline || "9999").localeCompare(b.deadline || "9999") : (a, b) => a.name.localeCompare(b.name));
  }, [f]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl md:text-4xl">Scholarships</h1>
      <button className="btn-ghost mb-4 lg:hidden" aria-expanded={panel} aria-controls="filters" onClick={() => setPanel(!panel)}>{panel ? "Hide filters" : "Show filters"}</button>
      <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
        <form id="filters" onSubmit={(e) => e.preventDefault()} className={`${panel ? "grid" : "hidden"} content-start gap-4 rounded-panel border border-line bg-paper p-5 lg:sticky lg:top-4 lg:grid lg:self-start`}>
          <Field id="q" label="Search"><input id="q" type="search" className="field" value={f.q} onChange={set("q")} placeholder="Name, school, place" /></Field>
          <Field id="type" label="Who offers it">
            <select id="type" className="field" value={f.type} onChange={set("type")}><option value="">Anyone</option><option>Government</option><option>Private</option><option>School</option></select>
          </Field>
          <Field id="level" label="Your level">
            <select id="level" className="field" value={f.level} onChange={set("level")}><option value="">Any level</option><option>Incoming College</option><option>Current College</option></select>
          </Field>
          <Field id="loc" label="Where">
            <select id="loc" className="field" value={f.loc} onChange={set("loc")}><option value="">Anywhere</option>{PLACES.map((p) => <option key={p}>{p}</option>)}</select>
          </Field>
          <Field id="status" label="Status">
            <select id="status" className="field" value={f.status} onChange={set("status")}><option value="">Any status</option>{STATUS_LABELS.map((s) => <option key={s}>{s}</option>)}</select>
          </Field>
          <Field id="sort" label="Sort by">
            <select id="sort" className="field" value={f.sort} onChange={set("sort")}><option value="name">Name</option><option value="deadline">Nearest deadline</option></select>
          </Field>
          <button type="button" className="btn-ghost" onClick={() => { setF(EMPTY); setShown(PAGE); }}>Clear filters</button>
        </form>
        <section aria-label="Results" className="min-w-0">
          <p className="mb-3 font-bold" aria-live="polite">{list.length} scholarship{list.length === 1 ? "" : "s"} match</p>
          {list.length ? (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                {list.slice(0, shown).map((s) => <ScholarshipCard key={s.id} s={s} saved={isSaved(s.id)} onToggle={toggleSaved} onOpen={openDetails} />)}
              </div>
              {shown < list.length && <button className="btn mt-6" onClick={() => setShown(shown + PAGE)}>Show {Math.min(PAGE, list.length - shown)} more</button>}
            </>
          ) : (
            <div className="rounded-2xl border-2 border-dashed border-blush bg-paper p-6">
              <p className="mb-3">No match yet. Try removing the location filter, or search the provider's name.</p>
              <button className="btn" onClick={() => setF(EMPTY)}>Clear filters</button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
