// Decorative line art for each program field. Original shapes, drawn on a 24x24 grid.
const ART = {
  "Information Technology": "M4 5h16v11H4zM2 19h20M10 9l-2 2 2 2M14 9l2 2-2 2",
  Engineering: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1",
  "Health Sciences": "M20.8 5.6a5.5 5.5 0 0 0-7.8 0L12 6.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-7.6a5.5 5.5 0 0 0 0-7.8zM12 9v5M9.5 11.5h5",
  Business: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  "Social Sciences": "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
  Education: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19a2 2 0 0 1 2-2h13M9 7h6",
  Science: "M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4A1.5 1.5 0 0 0 19.5 19L14 9V3M7.5 15h9",
  "Hospitality and Tourism": "M5 8h14a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zM9 8V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3M4 13h16",
};
const FALLBACK = "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM16 8l-2 6-6 2 2-6z";

export default function FieldArt({ field, big = false }) {
  const size = big ? "h-60 w-60" : "h-36 w-36";
  return (
    <>
      <span aria-hidden="true" className={`pointer-events-none absolute -right-10 -top-10 rounded-full bg-paper/50 ${big ? "h-64 w-64" : "h-40 w-40"}`} />
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round"
        className={`pointer-events-none absolute -right-3 -top-3 text-ink/25 ${size}`}>
        <path d={ART[field] || FALLBACK} />
      </svg>
    </>
  );
}
