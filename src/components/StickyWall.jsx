import { useFolder } from "../context/FolderContext.jsx";
import { shortDate } from "../lib/status.js";

const COLORS = ["bg-butter", "bg-sage", "bg-sky", "bg-mist"];
const TILTS = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1"];

// Real deadlines, pinned as notes. The memorable element of the hero.
// Shows upcoming scholarship deadlines as a pinned note wall.
export default function StickyWall({ items }) {
  const { openDetails } = useFolder();
  if (!items.length)
    return (
      <p className="note-in rounded-lg bg-butter p-3 text-sm font-bold shadow-md">
        No deadlines are recorded for the next few weeks. Browse the directory for scholarships that need a date check.
      </p>
    );
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4">
      {items.map((s, i) => {
        return (
          <li key={s.id}>
            <button
              onClick={() => openDetails(s.id)}
              style={{ animationDelay: i * 140 + "ms" }}
              className={`note-in relative block min-h-24 w-full rounded-md ${COLORS[i % 4]} ${TILTS[i % 4]} p-3 pt-5 text-left shadow-md transition-transform hover:rotate-0`}
            >
              <span aria-hidden="true" className="absolute left-1/2 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-rose" />
              <span className="block font-hand text-2xl leading-none">{shortDate(s.deadline)}</span>
              <span className="mt-1 line-clamp-2 block text-[13px] font-bold leading-snug">{s.name}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
