const TONES = {
  open: "bg-sage border-[#9fc59a]",
  soon: "bg-butter border-[#e3c36f]",
  closed: "bg-mist border-[#e4a39d]",
  info: "bg-sky border-[#9ec3de]",
  warn: "bg-stone border-[#d4c3b3]",
};
// Shows the scholarship deadline status with a color-coded label.
export default function StatusChip({ status }) {
  return <span className={`inline-block self-start rounded-lg border-2 px-2.5 py-0.5 text-sm font-bold text-ink ${TONES[status.tone]}`}>{status.label}</span>;
}
