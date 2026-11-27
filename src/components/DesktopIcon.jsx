import React from "react";

function PixelGothicSprite({ appId }) {
  switch (appId) {
    case "visuals":
      // Retro CRT TV dengan sayap kelelawar & layar color-bar
      return (
        <svg viewBox="0 0 48 48" shapeRendering="crispEdges" className="w-12 h-12 drop-shadow-[0_3px_4px_rgba(0,0,0,0.65)]">
          {/* Sayap kelelawar kiri & kanan */}
          <path d="M2 20h6v6H4v4H2v-10zm44 0h-6v6h4v4h2v-10z" fill="#231c26" />
          {/* Antena */}
          <path d="M16 6h2v4h2v2h-2v-2h-2V6zm14 0h2v4h-2v2h-2v-2h2V6z" fill="#231c26" />
          {/* Bodi TV */}
          <rect x="8" y="12" width="32" height="24" fill="#4f4854" stroke="#1b161e" strokeWidth="2" />
          {/* Layar Color Bars */}
          <rect x="11" y="15" width="4" height="16" fill="#d9d9d9" />
          <rect x="15" y="15" width="4" height="16" fill="#e6c84f" />
          <rect x="19" y="15" width="4" height="16" fill="#4ec9c9" />
          <rect x="23" y="15" width="4" height="16" fill="#59b85c" />
          <rect x="27" y="15" width="4" height="16" fill="#c74e9a" />
          {/* Tombol TV */}
          <rect x="33" y="16" width="4" height="4" fill="#8f2438" />
          <rect x="33" y="22" width="4" height="4" fill="#231c26" />
          {/* Kaki TV */}
          <rect x="12" y="36" width="4" height="4" fill="#1b161e" />
          <rect x="32" y="36" width="4" height="4" fill="#1b161e" />
        </svg>
      );

    case "audio":
      // CD Perak + Kotak Not Balok Gotik
      return (
        <svg viewBox="0 0 48 48" shapeRendering="crispEdges" className="w-12 h-12 drop-shadow-[0_3px_4px_rgba(0,0,0,0.65)]">
          {/* Piringan CD */}
          <circle cx="29" cy="25" r="14" fill="#9ea3b0" stroke="#1b161e" strokeWidth="2" />
          <circle cx="29" cy="25" r="10" fill="#c3c7d4" />
          <path d="M22 17l14 16M36 17L22 33" stroke="#e4e7f0" strokeWidth="2" />
          <circle cx="29" cy="25" r="4" fill="#423b47" stroke="#1b161e" strokeWidth="1.5" />
          {/* Kotak Not Balok */}
          <rect x="6" y="10" width="16" height="16" fill="#574d5c" stroke="#1b161e" strokeWidth="2" />
          <path d="M12 21v-7h6v7M10 20h3v3h-3zm6 0h3v3h-3z" fill="#e8dfe8" />
        </svg>
      );

    case "tour":
      // Kertas Bergaris + Pensil
      return (
        <svg viewBox="0 0 48 48" shapeRendering="crispEdges" className="w-12 h-12 drop-shadow-[0_3px_4px_rgba(0,0,0,0.65)]">
          <rect x="10" y="8" width="22" height="30" fill="#dcd4d8" stroke="#1b161e" strokeWidth="2" />
          <path d="M14 14h14M14 19h14M14 24h10M14 29h12" stroke="#5e5461" strokeWidth="2" />
          {/* Pensil miring */}
          <path d="M35 12l4 4-14 14-5 1 1-5 14-14z" fill="#c99b5b" stroke="#1b161e" strokeWidth="1.5" />
          <rect x="34" y="11" width="5" height="4" fill="#b84458" />
        </svg>
      );

    case "merch":
      // Peti Mati Ber-salib + Kaos di Atasnya
      return (
        <svg viewBox="0 0 48 48" shapeRendering="crispEdges" className="w-12 h-12 drop-shadow-[0_3px_4px_rgba(0,0,0,0.65)]">
          {/* Kaos menyembul */}
          <path d="M16 9l-5 4 3 4 2-1v6h16v-6l2 1 3-4-5-4h-16z" fill="#5b5463" stroke="#1b161e" strokeWidth="1.8" />
          {/* Peti Mati */}
          <polygon points="15,18 33,18 36,27 31,42 17,42 12,27" fill="#786b7a" stroke="#1b161e" strokeWidth="2" />
          {/* Salib di peti */}
          <path d="M24 22v14M19 27h10" stroke="#e6dce4" strokeWidth="2.2" />
        </svg>
      );

    case "epk":
      // Dokumen EPK + Segel Sayap
      return (
        <svg viewBox="0 0 48 48" shapeRendering="crispEdges" className="w-12 h-12 drop-shadow-[0_3px_4px_rgba(0,0,0,0.65)]">
          <rect x="11" y="7" width="26" height="34" fill="#4f4659" stroke="#1b161e" strokeWidth="2" />
          <rect x="14" y="10" width="20" height="7" fill="#2d2636" />
          <text x="16" y="16" fill="#e6dce4" fontSize="6" fontFamily="monospace" fontWeight="bold">
            EPK
          </text>
          <path d="M16 25l8 5 8-5M24 22v13" stroke="#b5a4bd" strokeWidth="2" />
        </svg>
      );

    default:
      // Amplop Merah Tua Ber-segel Tengkorak
      return (
        <svg viewBox="0 0 48 48" shapeRendering="crispEdges" className="w-12 h-12 drop-shadow-[0_3px_4px_rgba(0,0,0,0.65)]">
          <rect x="7" y="13" width="34" height="24" fill="#8f293b" stroke="#1b161e" strokeWidth="2" />
          <path d="M8 14l16 12 16-12" fill="none" stroke="#1b161e" strokeWidth="2" />
          <circle cx="24" cy="26" r="5" fill="#e6dce4" stroke="#1b161e" strokeWidth="1.5" />
          <rect x="22" y="25" width="1.5" height="1.5" fill="#1b161e" />
          <rect x="24.5" y="25" width="1.5" height="1.5" fill="#1b161e" />
        </svg>
      );
  }
}

export default function DesktopIcon({ id, label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex flex-col items-center gap-1 w-28 py-1.5 px-1 rounded transition-all text-center focus:outline-none select-none ${
        active ? "bg-[#5e1422]/30 ring-1 ring-[#a3263d]" : "hover:bg-white/10"
      }`}
    >
      <div className="group-hover:scale-105 transition-transform">
        <PixelGothicSprite appId={id} />
      </div>
      <span className="font-mono text-xs font-semibold text-white icon-label-shadow whitespace-nowrap">
        {label}
      </span>
    </button>
  );
}