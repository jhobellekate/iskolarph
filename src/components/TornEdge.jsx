// A ripped-paper edge. Fill it with the colour of the section above.
const pts = [];
for (let x = 0, i = 0; x <= 1200; x += 24 + ((i * 13) % 17), i++) pts.push(`${x},${6 + ((i * 37) % 11)}`);
const D = `M0 0 L${pts.join(" L")} L1200 0 Z`;

export default function TornEdge({ fill = "#fbdccb", className = "" }) {
  return (
    <svg viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true" className={`block h-4 w-full ${className}`}>
      <path d={D} fill={fill} />
    </svg>
  );
}
