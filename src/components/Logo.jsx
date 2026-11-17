// One logo, used in the header, the footer and as public/favicon.svg.
export default function Logo({ className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 font-extrabold ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-9 w-9">
        <g transform="rotate(-6 16 16)">
          <rect x="2" y="2" width="28" height="28" rx="7" fill="#FBE7B5" />
          <rect x="14" y="14" width="4" height="10" rx="2" fill="#A83F36" />
          <circle cx="16" cy="9.5" r="2.4" fill="#A83F36" />
        </g>
      </svg>
      IskolarPH
    </span>
  );
}
