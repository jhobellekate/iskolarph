// Converts a scholarship deadline into a status label and countdown.
export function getStatus(s) {
  if (!s.deadline) return { label: "Needs verification", tone: "warn", days: null };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Math.round((new Date(s.deadline + "T00:00:00") - today) / 86400000);
  if (s.start && today < new Date(s.start + "T00:00:00")) return { label: "Upcoming", tone: "info", days };
  if (days < 0) return { label: "Deadline passed", tone: "closed", days };
  if (days <= 14) return { label: "Closing soon", tone: "soon", days };
  return { label: "Open", tone: "open", days };
}
export const STATUS_LABELS = ["Open", "Closing soon", "Upcoming", "Deadline passed", "Needs verification"];
// Formats dates for the scholarship UI in Philippine style.
export const formatDate = (d) =>
  d ? new Date(d + "T00:00:00").toLocaleDateString("en-PH", { year: "numeric", month: "long", day: "numeric" }) : "Not yet confirmed";
// Returns a compact month-day label for a deadline.
export const shortDate = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-PH", { month: "short", day: "numeric" });
// Builds a short human-readable countdown label.
export const daysLabel = (n) => (n === 0 ? "Closes today" : n === 1 ? "1 day left" : n + " days left");
// Turns a location value into a friendly location phrase.
export const placeText = (loc) => (loc === "Nationwide" ? "nationwide" : loc === "Not specified" ? "location not listed" : "in " + loc);
