export default function HeroScene() {
  return (
    <svg viewBox="0 0 560 440" role="img" aria-label="Illustration of a sunny study desk by a window, with a mug, notebook, books and a vase of tulips" className="block h-auto w-full">
      <defs>
        <linearGradient id="skyg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#CDE4F4" />
          <stop offset="1" stopColor="#F6F1E3" />
        </linearGradient>
      </defs>
      <rect width="560" height="440" fill="#FBDCCB" />
      <rect y="330" width="560" height="110" fill="#E7C29B" />
      <rect y="330" width="560" height="9" fill="#D6AA7E" />
      <rect x="292" y="34" width="232" height="226" rx="12" fill="#FFFCF7" />
      <rect x="306" y="48" width="204" height="198" rx="6" fill="url(#skyg)" />
      <ellipse cx="352" cy="92" rx="30" ry="12" fill="#fff" />
      <ellipse cx="378" cy="84" rx="22" ry="11" fill="#fff" />
      <ellipse cx="460" cy="118" rx="26" ry="10" fill="#fff" />
      <rect x="318" y="170" width="34" height="62" fill="#F2B8A6" />
      <rect x="356" y="150" width="40" height="82" fill="#E9A18E" />
      <rect x="400" y="178" width="30" height="54" fill="#F5C6B2" />
      <path d="M318 170l17-14 17 14zM356 150l20-16 20 16zM400 178l15-12 15 12z" fill="#C97F6C" />
      <circle cx="452" cy="196" r="28" fill="#B9D6A8" />
      <circle cx="480" cy="210" r="22" fill="#A7CB96" />
      <rect x="448" y="206" width="6" height="30" fill="#8C6B52" />
      <path d="M408 48v198M306 146h204" stroke="#FFFCF7" strokeWidth="8" />
      <path d="M292 30c40 40 26 130 38 230h-52V30z" fill="#FFF1E3" opacity=".92" />
      <path d="M524 30c-34 40-20 130-32 230h44V30z" fill="#FFF1E3" opacity=".92" />
      <rect x="282" y="258" width="252" height="16" rx="5" fill="#E9CBAA" />
      <rect x="340" y="222" width="30" height="36" rx="8" fill="#DDEBF2" opacity=".95" />
      <path d="M350 224c-6-30-8-44-10-56M360 224c2-28 8-42 14-54" stroke="#7FA66F" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="340" cy="164" rx="9" ry="13" fill="#F29DA4" />
      <ellipse cx="375" cy="166" rx="9" ry="13" fill="#F4B3AB" />
      <g transform="rotate(-6 330 400)">
        <rect x="280" y="368" width="120" height="62" rx="6" fill="#FFFCF7" stroke="#E5CBB4" strokeWidth="2" />
        <path d="M296 388h88M296 402h88M296 416h60" stroke="#E5CBB4" strokeWidth="3" strokeLinecap="round" />
      </g>
      <rect x="372" y="360" width="64" height="8" rx="3" fill="#F4B3AB" transform="rotate(-24 372 364)" />
      <rect x="400" y="350" width="56" height="52" rx="10" fill="#F4B3AB" />
      <path d="M456 362c18 0 18 28 0 28" stroke="#F4B3AB" strokeWidth="8" fill="none" />
      <ellipse cx="428" cy="352" rx="28" ry="7" fill="#8A5A3B" />
      <path d="M428 386l-9-9a5 5 0 0 1 9-5 5 5 0 0 1 9 5z" fill="#FFFCF7" />
      <rect x="470" y="372" width="76" height="16" rx="3" fill="#CFE3C8" />
      <rect x="474" y="356" width="70" height="16" rx="3" fill="#F8D9D6" />
      <rect x="480" y="340" width="62" height="16" rx="3" fill="#D2E5F1" />
      <path d="M50 410h46l-6 26H56z" fill="#F4B3AB" />
      <path d="M73 410c-24-8-30-34-24-52 18 6 28 26 24 52zM73 410c22-6 34-30 30-48-18 4-32 24-30 48z" fill="#A7CB96" />
    </svg>
  );
}
