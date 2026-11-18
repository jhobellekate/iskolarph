import { useState } from "react";
import { Link } from "react-router-dom";
import { useFolder } from "../context/FolderContext.jsx";
import { shortDate } from "../lib/status.js";
import Icon from "./Icon.jsx";

const COLORS = ["bg-butter", "bg-sage", "bg-sky", "bg-mist"];
const TILTS = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1"];

// Shows saved scholarship deadlines four notes at a time.
export default function StickyWall({ items }) {
  const { openDetails } = useFolder();
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(items.length / 4);
  const activePage = Math.min(page, Math.max(pageCount - 1, 0));
  const visibleItems = items.slice(activePage * 4, activePage * 4 + 4);

  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="pointer-events-auto absolute left-[4%] top-[6%] w-[48%] sm:w-[46%]">
        <h2 className="deadline-heading mb-2 whitespace-nowrap text-[10px] font-extrabold leading-tight sm:text-sm">Your saved deadlines</h2>
        {items.length > 0 ? (
          <ul className="grid grid-cols-2 gap-1 sm:gap-4">
            {visibleItems.map((s, i) => (
              <li key={s.id}>
                <button
                  onClick={() => openDetails(s.id)}
                  style={{ animationDelay: i * 140 + "ms" }}
                  className={`deadline-note note-in relative block min-h-16 w-full rounded-md ${COLORS[i % 4]} ${TILTS[i % 4]} p-1.5 pt-3 text-left shadow-md transition-transform hover:rotate-0 sm:min-h-24 sm:p-3 sm:pt-5`}
                >
                  <span aria-hidden="true" className="absolute left-1/2 top-1.5 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-rose" />
                  <span className="block font-hand text-base leading-none sm:text-2xl">{shortDate(s.deadline)}</span>
                  <span className="mt-1 line-clamp-2 block text-[9px] font-bold leading-tight sm:text-[13px] sm:leading-snug">{s.name}</span>
                  <span className="sr-only">{s.isPersonalDeadline ? "My deadline" : "Official scholarship deadline"}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="deadline-note note-in rounded-lg bg-butter p-3 text-[11px] shadow-md sm:text-sm">
            <p className="font-bold">No upcoming reminders in My Folder. Save a scholarship or add a future personal deadline there to pin it here.</p>
            <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
              <Link to="/scholarships" className="font-bold underline">Browse scholarships</Link>
              <Link to="/folder" className="font-bold underline">Open My Folder</Link>
            </div>
          </div>
        )}
      </div>
      {pageCount > 1 && (
        <nav className="pointer-events-auto absolute right-[5%] top-[60.5%] flex -translate-y-1/2 items-center justify-end gap-0" aria-label="Deadline reminder pages">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-paper disabled:opacity-40 sm:h-9 sm:w-9"
            aria-label="Previous deadline page"
            disabled={activePage === 0}
            onClick={() => setPage(activePage - 1)}
          >
            <Icon name="arrowLeft" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i}
              type="button"
              className="hidden h-8 w-8 items-center justify-center rounded-full hover:bg-paper sm:flex sm:h-9 sm:w-9"
              aria-label={`Show deadline page ${i + 1}`}
              aria-current={i === activePage ? "page" : undefined}
              onClick={() => setPage(i)}
            >
              <span className={`h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2 ${i === activePage ? "bg-ink" : "bg-ink/30"}`} />
            </button>
          ))}
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-paper disabled:opacity-40 sm:h-9 sm:w-9"
            aria-label="Next deadline page"
            disabled={activePage === pageCount - 1}
            onClick={() => setPage(activePage + 1)}
          >
            <Icon name="arrowRight" className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </button>
        </nav>
      )}
    </div>
  );
}
