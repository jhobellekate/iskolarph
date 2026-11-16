import { Link } from "react-router-dom";
import { findScholarship } from "../data/scholarships.js";
import { STATUSES, useFolder } from "../context/FolderContext.jsx";
import { daysLabel, formatDate, getStatus } from "../lib/status.js";
import ShareButton from "../components/ShareButton.jsx";
import TornEdge from "../components/TornEdge.jsx";

function FolderCard({ s }) {
  const { entryOf, updateEntry, toggleSaved, openDetails } = useFolder();
  const e = entryOf(s.id);
  const toggleDoc = (i) => updateEntry(s.id, { checked: e.checked.includes(i) ? e.checked.filter((x) => x !== i) : [...e.checked, i] });
  return (
    <article className="flex min-w-0 flex-col gap-2 rounded-2xl border border-line bg-paper p-5">
      <h3 className="text-lg leading-snug"><button className="text-left underline decoration-blush decoration-2 underline-offset-4" onClick={() => openDetails(s.id)}>{s.name}</button></h3>
      <p className="text-sm text-ink-soft">Official deadline: {formatDate(s.deadline)}</p>
      <div><label htmlFor={"st-" + s.id} className="label">Status</label>
        <select id={"st-" + s.id} className="field" value={e.status} onChange={(ev) => updateEntry(s.id, { status: ev.target.value })}>{STATUSES.map((x) => <option key={x}>{x}</option>)}</select></div>
      <div><label htmlFor={"pd-" + s.id} className="label">My own deadline</label>
        <input id={"pd-" + s.id} type="date" className="field" value={e.personalDeadline} onChange={(ev) => updateEntry(s.id, { personalDeadline: ev.target.value })} /></div>
      <details className="rounded-xl bg-cream px-3 py-2">
        <summary className="cursor-pointer font-bold">Documents ({e.checked.length} of {s.docs.length} ready)</summary>
        <div className="mt-2 space-y-1">
          {s.docs.map((d, i) => (
            <label key={i} className="flex min-h-11 items-start gap-2 text-sm"><input type="checkbox" className="mt-1 h-5 w-5 accent-rose" checked={e.checked.includes(i)} onChange={() => toggleDoc(i)} />{d}</label>
          ))}
        </div>
      </details>
      <button className="btn-ghost mt-auto" onClick={() => toggleSaved(s.id)}>Remove from folder</button>
    </article>
  );
}

export default function Folder() {
  const { saved, entryOf } = useFolder();
  const items = saved.map(findScholarship).filter(Boolean);
  const soon = items.filter((s) => s.deadline && getStatus(s).days >= 0 && entryOf(s.id).status !== "Done" && entryOf(s.id).status !== "Applied")
    .sort((a, b) => getStatus(a).days - getStatus(b).days).slice(0, 3);

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <h1 className="text-3xl md:text-4xl">My folder</h1>
      </div>
      {items.length === 0 ? (
        <div className="mx-auto mt-6 max-w-6xl px-4">
          <div className="rounded-2xl border-2 border-dashed border-blush bg-paper p-6">
            <p className="mb-3 text-lg font-bold">Your folder is empty. Save a scholarship to start tracking it.</p>
            <Link to="/scholarships" className="btn">Browse scholarships</Link>
          </div>
        </div>
      ) : (
        <>
          {soon.length > 0 && (
            <>
              <section className="mt-6 bg-butter">
                <div className="mx-auto max-w-6xl px-4 py-5">
                  <h2 className="mb-2 text-xl">Closing soon in your folder</h2>
                  <ul className="space-y-1">{soon.map((s) => <li key={s.id} className="font-bold">{s.name}: {formatDate(s.deadline)}, {daysLabel(getStatus(s).days).toLowerCase()}</li>)}</ul>
                </div>
              </section>
              <TornEdge fill="#fbe7b5" />
            </>
          )}
          <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="mb-8 max-w-sm"><ShareButton /></div>
            {STATUSES.map((st) => {
              const group = items.filter((s) => entryOf(s.id).status === st);
              return group.length ? (
                <section key={st} className="mb-10">
                  <h2 className="h-section">{st} ({group.length})</h2>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{group.map((s) => <FolderCard key={s.id} s={s} />)}</div>
                </section>
              ) : null;
            })}
          </div>
        </>
      )}
    </div>
  );
}
