import React from "react";

function CustomGothicIcon({ appId }) {
  switch (appId) {
    case "visuals":
      // Retro CRT TV dengan antena kelinci & layar pendar crimson
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
          <path d="M16 7L24 14L32 7" stroke="#d9536f" strokeWidth="2" strokeLinecap="round" />
          <rect x="7" y="14" width="34" height="26" rx="4" fill="#231a29" stroke="#b8324c" strokeWidth="2" />
          <rect x="11" y="18" width="20" height="18" rx="2" fill="#120e17" stroke="#7c1d2e" strokeWidth="1.5" />
          <path d="M14 27H20L22 23L25 31L27 27H29" stroke="#f06b84" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="35.5" cy="22" r="2" fill="#d9536f" />
          <circle cx="35.5" cy="28" r="2" fill="#8f2438" />
          <path d="M13 40V43M35 40V43" stroke="#b8324c" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );
    case "audio":
      // Piringan Hitam Vinyl Gotik + Label Mawar
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
          <circle cx="24" cy="24" r="17" fill="#16121d" stroke="#b8324c" strokeWidth="2" />
          <circle cx="24" cy="24" r="12" stroke="#5c2434" strokeWidth="1" strokeDasharray="3 2" />
          <circle cx="24" cy="24" r="6.5" fill="#7c1d2e" stroke="#f06b84" strokeWidth="1.2" />
          <circle cx="24" cy="24" r="2" fill="#14101a" />
          <path d="M35 10L39 14L33 25" stroke="#e28799" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "tour":
      // Kalender & Tiket Gotik
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
          <rect x="8" y="11" width="32" height="29" rx="3" fill="#1e1726" stroke="#b8324c" strokeWidth="2" />
          <path d="M8 19H40" stroke="#b8324c" strokeWidth="2" />
          <path d="M16 7V14M32 7V14" stroke="#f06b84" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M24 23V35M19 28H29" stroke="#e26d85" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "merch":
      // Kaos / Jubah Merch Klasik
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
          <path
            d="M16 10L8 16L12 22L16 19V39H32V19L36 22L40 16L32 10C30 13 27 14 24 14C21 14 18 13 16 10Z"
            fill="#231929"
            stroke="#b8324c"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M24 20L27 25L24 30L21 25L24 20Z" stroke="#f06b84" strokeWidth="1.4" />
        </svg>
      );
    case "epk":
      // Gulungan Naskah & Segel Lilin Crimson
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
          <path
            d="M13 8H31L37 14V40H13V8Z"
            fill="#221a29"
            stroke="#b8324c"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M18 19H30M18 25H30M18 31H24" stroke="#d89aa8" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="30" cy="33" r="4.5" fill="#8f1d32" stroke="#f06b84" strokeWidth="1.3" />
        </svg>
      );
    default:
      // Portal Tautan & Simbol Bintang Gotik
      return (
        <svg viewBox="0 0 48 48" className="w-8 h-8" fill="none">
          <circle cx="24" cy="24" r="16" fill="#1d1624" stroke="#b8324c" strokeWidth="2" />
          <path
            d="M24 10L27 21L38 24L27 27L24 38L21 27L10 24L21 21L24 10Z"
            stroke="#f06b84"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export default function DesktopIcon({ id, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex flex-col items-center gap-1.5 w-28 p-2 rounded-xl transition-all text-center focus:outline-none select-none ${
        active
          ? "bg-[#7c1d2e]/35 border border-[#c93853]/80 shadow-[0_0_20px_rgba(168,40,64,0.35)]"
          : "hover:bg-white/[0.06] border border-transparent"
      }`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[#16121f]/90 border border-[#8f2438]/75 flex items-center justify-center shadow-[0_8px_20px_rgba(0,0,0,0.65)] group-hover:scale-105 group-hover:border-[#d94b66] transition-transform">
        <CustomGothicIcon appId={id} />
      </div>
      <span className="font-mono text-[11px] leading-tight text-stone-100 bg-[#120f19]/80 border border-white/10 px-2 py-0.5 rounded whitespace-nowrap shadow">
        {label}
      </span>
    </button>
  );
}