import React from "react";

export default function DesktopIcon({ label, icon: Icon, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex flex-col items-center gap-1.5 w-24 p-2 rounded-lg transition-all text-center focus:outline-none ${
        active
          ? "bg-[#7c1d2e]/30 border border-[#b3263e]/70 shadow-lg"
          : "hover:bg-white/5 border border-transparent"
      }`}
    >
      <div className="w-12 h-12 rounded-xl bg-[#181622]/90 border border-[#7c1d2e]/60 flex items-center justify-center shadow-md group-hover:scale-105 group-hover:border-[#b3263e] transition-transform">
        <Icon className="w-6 h-6 text-[#d4445c]" />
      </div>
      <span className="font-mono text-[11px] leading-tight text-stone-200 bg-black/50 px-1.5 py-0.5 rounded break-all">
        {label}
      </span>
    </button>
  );
}
