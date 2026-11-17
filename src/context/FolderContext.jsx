import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { useLocalStorage } from "../lib/storage.js";

export const STATUSES = ["Interested", "Gathering documents", "Ready to apply", "Applied", "Done"];
const LEGACY = { "Preparing Requirements": "Gathering documents", "Ready to Apply": "Ready to apply", Completed: "Done" };
const Ctx = createContext(null);
// Returns the folder context for the current page.
export const useFolder = () => useContext(Ctx);

// Normalizes saved entries before reading or updating them.
const norm = (raw) => {
  const e = { status: "Interested", checked: [], personalDeadline: "", ...raw };
  e.status = LEGACY[e.status] || e.status;
  return e;
};

// Provides saved scholarship state and modal controls to the app.
export function FolderProvider({ children }) {
  const [saved, setSaved] = useLocalStorage("iskolarph_saved", []);
  const [tracker, setTracker] = useLocalStorage("iskolarph_tracker", {});
  const [detailId, setDetailId] = useState(null);

  const toggleSaved = useCallback((id) => setSaved((l) => (l.includes(id) ? l.filter((x) => x !== id) : [...l, id])), [setSaved]);
  const updateEntry = useCallback((id, changes) => setTracker((t) => ({ ...t, [id]: { ...norm(t[id]), ...changes } })), [setTracker]);
  const entryOf = useCallback((id) => norm(tracker[id]), [tracker]);
  const openDetails = useCallback((id) => setDetailId(id), []);
  const closeDetails = useCallback(() => setDetailId(null), []);

  const value = useMemo(
    () => ({ saved, isSaved: (id) => saved.includes(id), toggleSaved, entryOf, updateEntry, detailId, openDetails, closeDetails }),
    [saved, toggleSaved, entryOf, updateEntry, detailId, openDetails, closeDetails]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
