import { useEffect } from "react";
import { Link } from "react-router-dom";
import { findScholarship } from "../data/scholarships.js";
import { APPLICATION_STATUSES, STATUSES, useFolder } from "../context/FolderContext.jsx";
import { daysLabel, formatDate, getStatus } from "../lib/status.js";
import ShareButton from "../components/ShareButton.jsx";
import TornEdge from "../components/TornEdge.jsx";
import Icon from "../components/Icon.jsx";

// Displays one saved scholarship with status, deadline, and document tracking.
function FolderCard({ s }) {
  const { entryOf, updateEntry, toggleSaved, openDetails } = useFolder();
  const e = entryOf(s.id);
  const total = s.docs.length;
  const completed = s.docs.filter((_, i) => e.checked.includes(i)).length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  const allDocsReady = total > 0 && completed === total;
  useEffect(() => {
    if (APPLICATION_STATUSES.includes(e.status)) return;
    if (allDocsReady && ["Interested", "Preparing Requirements"].includes(e.status)) updateEntry(s.id, { status: "Ready to Apply" });
    else if (!allDocsReady && e.status === "Ready to Apply") updateEntry(s.id, { status: "Preparing Requirements" });
  }, [allDocsReady, e.status, s.id, updateEntry]);
  // Toggles a document as ready or still missing.
  const toggleDoc = (i) => {
    const checked = e.checked.includes(i) ? e.checked.filter((x) => x !== i) : [...e.checked, i];
    const changes = { checked };
    if (!APPLICATION_STATUSES.includes(e.status)) {
      const readyCount = s.docs.filter((_, index) => checked.includes(index)).length;
      if (total && readyCount === total) changes.status = "Ready to Apply";
      else if (e.status === "Ready to Apply" || (e.status === "Interested" && checked.length)) changes.status = "Preparing Requirements";
    }
    updateEntry(s.id, changes);
  };
  return (
    <article className="flex min-w-0 flex-col gap-2 rounded-2xl border border-line bg-paper p-5">
      <h3 className="text-lg leading-snug"><button className="text-left underline decoration-blush decoration-2 underline-offset-4" onClick={() => openDetails(s.id)}>{s.name}</button></h3>
      <p className="text-sm text-ink-soft">Official deadline: {formatDate(s.deadline)}</p>
      <div><label htmlFor={"st-" + s.id} className="label">Status</label>
        <select id={"st-" + s.id} className="field" value={e.status} onChange={(ev) => updateEntry(s.id, { status: ev.target.value })}>
          {STATUSES.map((x) => <option key={x} disabled={(x === "Ready to Apply" && !allDocsReady) || (allDocsReady && ["Interested", "Preparing Requirements"].includes(x))}>{x}</option>)}
        </select></div>
      {APPLICATION_STATUSES.includes(e.status) && (
        <>
          <p className="text-sm text-ink-soft">Submitted on: {e.appliedOn ? formatDate(e.appliedOn) : "Submission date not recorded"}</p>
          <div>
            <label htmlFor={"notes-" + s.id} className="label">Application notes (optional)</label>
            <textarea id={"notes-" + s.id} className="field min-h-24 resize-y" rows={3} value={e.notes} onChange={(ev) => updateEntry(s.id, { notes: ev.target.value })} placeholder="Record updates, interview schedules, or reminders." />
          </div>
        </>
      )}
      <div><label htmlFor={"pd-" + s.id} className="label">My own deadline</label>
        <input id={"pd-" + s.id} type="date" className="field" value={e.personalDeadline} onChange={(ev) => updateEntry(s.id, { personalDeadline: ev.target.value })} /></div>
      <details className="rounded-xl bg-cream px-3 py-2">
        <summary className="cursor-pointer font-bold">
          {total ? (
            <>
              <span className="flex justify-between gap-2">
                <span>Documents ({completed}/{total} ready)</span>
                <span>{percent}%</span>
              </span>
              <span
                className="mt-2 block h-2 overflow-hidden rounded-full bg-stone"
                role="progressbar"
                aria-label="Required documents progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={percent}
                aria-valuetext={`${completed} of ${total} required documents ready (${percent}%)`}
              >
                <span className="block h-full rounded-full bg-sage transition-[width]" style={{ width: `${percent}%` }} />
              </span>
            </>
          ) : "Documents (not listed)"}
        </summary>
        <div className="mt-2 space-y-1">
          {total ? s.docs.map((d, i) => (
            <label key={i} className="flex min-h-11 items-start gap-2 text-sm"><input type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-rose" checked={e.checked.includes(i)} onChange={() => toggleDoc(i)} />{d}</label>
          )) : <p className="text-sm text-ink-soft">No document requirements are listed for this scholarship.</p>}
        </div>
      </details>
      {allDocsReady && !APPLICATION_STATUSES.includes(e.status) && (
        <div className="rounded-xl border border-sage bg-sage/30 p-3" role="status" aria-live="polite">
          <p className="flex items-center gap-2 font-bold">
            <Icon name="check" className="h-5 w-5 shrink-0" />
            All required documents are ready!
          </p>
        </div>
      )}
      <button className="btn-ghost mt-auto" onClick={() => toggleSaved(s.id)}>Remove from folder</button>
    </article>
  );
}

// Lists saved scholarships by status and highlights deadlines to watch.
export default function Folder() {
  const { saved, entryOf } = useFolder();
  const items = saved.map(findScholarship).filter(Boolean);
  const soon = items.filter((s) => {
    const status = entryOf(s.id).status;
    return s.deadline && getStatus(s).days >= 0 && !APPLICATION_STATUSES.includes(status);
  })
    .sort((a, b) => getStatus(a).days - getStatus(b).days).slice(0, 3);

  return (
    <div>
      <div className="mx-auto max-w-6xl px-4 pt-8">
        <h1 className="text-3xl md:text-4xl">My Folder</h1>
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
              <TornEdge className="text-butter" />
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
