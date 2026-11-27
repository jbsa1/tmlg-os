import React from "react";
import { BAND_CONFIG } from "../config/bandConfig";

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-9 px-3.5 flex items-center bg-[#9d94a3]/95 backdrop-blur-sm border-b-2 border-[#6b1929] shadow-sm select-none">
      <div className="flex items-center gap-2.5">
        {/* Monogram Logo TMLG Merah Tua */}
        <svg
          width="22"
          height="18"
          viewBox="0 0 28 22"
          fill="none"
          className="shrink-0"
          aria-hidden="true"
        >
          <path
            d="M2 3H12M7 3V19M13 19V3L18 11L23 3V19M25 3V19H27"
            stroke="#7d172a"
            strokeWidth="2.4"
            strokeLinecap="square"
          />
        </svg>
        <span className="font-mono text-sm font-bold tracking-wide text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.75)]">
          {BAND_CONFIG.osTitle}
        </span>
      </div>
    </header>
  );
}