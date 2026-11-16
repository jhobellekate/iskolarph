import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { findScholarship } from "../data/scholarships.js";
import { useFolder } from "../context/FolderContext.jsx";
import { formatDate, getStatus } from "../lib/status.js";
import Icon from "./Icon.jsx";
import StatusChip from "./StatusChip.jsx";

const List = ({ items }) => <ul className="list-disc space-y-1 pl-5">{items.map((x, i) => <li key={i}>{x}</li>)}</ul>;
const Section = ({ title, children }) => (
  <section className="border-t border-dashed border-line pt-3">
    <h3 className="mb-1 text-lg">{title}</h3>
    {children}
  </section>
);

// Native <dialog>: focus trap, Esc to close and focus restore come from the browser.
export default function DetailsModal() {
  const { detailId, closeDetails, isSaved, toggleSaved } = useFolder();
  const ref = useRef(null);
  const [reported, setReported] = useState(false);
  const s = detailId ? findScholarship(detailId) : null;

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (s && !d.open) { d.showModal(); document.body.style.overflow = "hidden"; setReported(false); }
    if (!s && d.open) d.close();
  }, [s]);
  useEffect(() => () => { document.body.style.overflow = ""; }, []);

  const handleClose = () => { document.body.style.overflow = ""; closeDetails(); };
  return (
    <dialog
      ref={ref}
      onClose={handleClose}
      onClick={(e) => { if (e.target === ref.current) ref.current.close(); }}
      aria-labelledby="modal-title"
      className="m-auto max-h-[85vh] w-[min(94vw,640px)] overflow-hidden rounded-panel border border-line bg-paper p-0 text-ink shadow-2xl backdrop:bg-ink/40 backdrop:backdrop-blur-sm open:flex open:flex-col"
    >
      {s && (
        <>
          <div className="flex items-start justify-between gap-3 bg-peach px-6 py-4">
            <div className="min-w-0">
              <StatusChip status={getStatus(s)} />
              <h2 id="modal-title" className="mt-1 text-xl leading-snug">{s.name}</h2>
              <p className="text-sm text-ink-soft">{s.provider}</p>
            </div>
            <button onClick={() => ref.current.close()} aria-label="Close details" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-blush bg-paper hover:bg-cream">
              <Icon name="x" />
            </button>
          </div>
          <div className="space-y-4 overflow-y-auto px-6 pb-6 pt-4">
            <div className="flex flex-wrap gap-2">
              <button className="btn" aria-pressed={isSaved(s.id)} onClick={() => toggleSaved(s.id)}>
                <Icon name="bookmark" className="h-4 w-4" filled={isSaved(s.id)} />
                {isSaved(s.id) ? "Saved to my folder" : "Save scholarship"}
              </button>
              {isSaved(s.id) && <Link to="/folder" className="btn-ghost" onClick={() => ref.current.close()}>Open my folder</Link>}
            </div>
            <Section title="What it covers"><p className="mb-2">{s.description}</p><List items={s.benefits} /></Section>
            <Section title="Who can apply"><List items={s.eligibility} /></Section>
            <Section title="Documents to prepare"><List items={s.docs} /></Section>
            <Section title="Deadline">
              <p>{formatDate(s.deadline)}{s.start ? ", opens " + formatDate(s.start) : ""}</p>
            </Section>
            <Section title="Official source">
              {s.link ? (
                <a href={s.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 break-all font-bold text-rose underline">
                  {s.link}<Icon name="external" className="h-4 w-4 shrink-0" />
                </a>
              ) : <p>No official link recorded. Ask the provider's office.</p>}
              <p className="mt-2 text-sm text-ink-soft">Last checked {formatDate(s.verified)}</p>
              <button className="btn-ghost mt-3" onClick={() => setReported(true)}>Report outdated info</button>
              <p role="status" className="mt-2 text-sm">{reported && "Thanks. This demo version does not send reports anywhere yet."}</p>
            </Section>
          </div>
        </>
      )}
    </dialog>
  );
}
