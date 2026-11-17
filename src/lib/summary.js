import { findScholarship } from "../data/scholarships.js";
import { formatDate } from "./status.js";

// Builds a shareable shortlist summary for saved scholarships.
export function buildSummary(ids, entryOf) {
  const lines = ids.map(findScholarship).filter(Boolean).map((s) => {
    const e = entryOf(s.id);
    return `- ${s.name} (${s.provider}). Deadline: ${formatDate(s.deadline)}. Status: ${e.status}. Official source: ${s.link || "ask the provider"}`;
  });
  return "Our scholarship shortlist from IskolarPH\n" + lines.join("\n") + "\nDeadlines can change. Confirm with each provider before applying.";
}
