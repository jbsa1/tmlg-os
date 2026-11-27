import React from "react";
import { BAND_CONFIG } from "../config/bandConfig";

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-9 px-4 flex items-center justify-between bg-[#12111a]/85 backdrop-blur-md border-b border-[#7c1d2e]/50 select-none">
      <div className="flex items-center gap-2.5">
        <svg
          width="18"
          height="18"
          viewBox="0 0 32 32"
          fill="none"
          className="text-[#b3263e] shrink-0"
          aria-hidden="true"
        >
          <path
            d="M16 2L28 16L16 30L4 16L16 2Z"
            stroke="currentColor"
            strokeWidth="2.2"
          />
          <path
            d="M10 12H22M16 12V24M12 18L16 14L20 18"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="font-mono text-xs sm:text-sm font-bold tracking-widest text-stone-200">
          {BAND_CONFIG.osTitle}
        </span>
      </div>
    </header>
  );
}
