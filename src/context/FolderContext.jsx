import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useLocalStorage } from "../lib/storage.js";

export const APPLICATION_STATUSES = ["Applied", "Under Review", "Interview/Assessment", "Additional Requirements", "Awarded", "Not Selected", "Withdrawn"];
export const STATUSES = ["Interested", "Preparing Requirements", "Ready to Apply", ...APPLICATION_STATUSES];
const LEGACY = {
  "Gathering documents": "Preparing Requirements",
  "Ready to apply": "Ready to Apply",
  Completed: "Applied",
  Done: "Applied",
};
const Ctx = createContext(null);
// Returns the folder context for the current page.
export const useFolder = () => useContext(Ctx);

// Normalizes saved entries before reading or updating them.
const norm = (raw) => {
  const e = { status: "Interested", checked: [], personalDeadline: "", appliedOn: "", notes: "", ...raw };
  e.status = LEGACY[e.status] || e.status;
  return e;
};

const localDate = () => {
  const today = new Date();
  return [today.getFullYear(), String(today.getMonth() + 1).padStart(2, "0"), String(today.getDate()).padStart(2, "0")].join("-");
};

// Provides saved scholarship state and modal controls to the app.
export function FolderProvider({ children }) {
  const [saved, setSaved] = useLocalStorage("iskolarph_saved", []);
  const [tracker, setTracker] = useLocalStorage("iskolarph_tracker", {});
  const [detailId, setDetailId] = useState(null);

  const toggleSaved = useCallback((id) => setSaved((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id])), [setSaved]);
  const updateEntry = useCallback((id, changes) => setTracker((t) => {
    const next = { ...norm(t[id]), ...changes };
    if (changes.status === "Applied" && !next.appliedOn) next.appliedOn = localDate();
    return { ...t, [id]: next };
  }), [setTracker]);
  const entryOf = useCallback((id) => norm(tracker[id]), [tracker]);
  const openDetails = useCallback((id) => setDetailId(id), []);
  const closeDetails = useCallback(() => setDetailId(null), []);

  const value = useMemo(
    () => ({ saved, isSaved: (id) => saved.includes(id), toggleSaved, entryOf, updateEntry, detailId, openDetails, closeDetails }),
    [saved, toggleSaved, entryOf, updateEntry, detailId, openDetails, closeDetails]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
