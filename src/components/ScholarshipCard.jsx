import { memo } from "react";
import Icon from "./Icon.jsx";
import StatusChip from "./StatusChip.jsx";
import { formatDate, getStatus, placeText } from "../lib/status.js";

// Displays a compact scholarship summary with save and view actions.
function ScholarshipCard({ s, saved, onToggle, onOpen }) {
  return (
    <article className="flex min-w-0 flex-col gap-1.5 rounded-2xl border border-line bg-paper p-5">
      <StatusChip status={getStatus(s)} />
      <h3 className="mt-1 text-lg leading-snug">{s.name}</h3>
      <p className="text-sm text-ink-soft">{s.provider}</p>
      <p className="text-sm text-ink-soft">{s.type}, {placeText(s.location)}</p>
      <p className="flex items-center gap-1.5 text-sm font-bold">
        <Icon name="calendar" className="h-4 w-4" />
        {s.deadline ? "Deadline: " + formatDate(s.deadline) : "Deadline not confirmed"}
      </p>
      <div className="mt-auto flex flex-wrap gap-2 pt-3">
        <button className="btn" onClick={() => onOpen(s.id)}>View details</button>
        <button className="btn-ghost" aria-pressed={saved} onClick={() => onToggle(s.id)}>
          <Icon name="bookmark" className="h-4 w-4" filled={saved} />
          {saved ? "Saved" : "Save"}
        </button>
      </div>
    </article>
  );
}
export default memo(ScholarshipCard);
