import React from "react";
import { Minus, Square, X } from "lucide-react";

export default function OsWindow({ title, onClose, children, maxWidth = "max-w-3xl" }) {
  return (
    <div
      className={`w-full ${maxWidth} mx-auto rounded-xl overflow-hidden bg-[#14131d]/88 backdrop-blur-xl border border-[#7c1d2e]/70 shadow-[0_20px_60px_rgba(0,0,0,0.75)]`}
    >
      <div className="h-9 px-3.5 flex items-center justify-between bg-gradient-to-r from-[#26131c] via-[#1b1826] to-[#26131c] border-b border-[#7c1d2e]/50 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#9e2238] inline-block" />
          <span className="font-mono text-xs font-semibold tracking-wider text-stone-200">
            {title}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={onClose}
            title="Minimize"
            className="w-6 h-6 flex items-center justify-center rounded bg-white/5 hover:bg-white/15 text-stone-300 transition"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-6 h-6 flex items-center justify-center rounded bg-white/5 text-stone-500">
            <Square className="w-3 h-3" />
          </span>
          <button
            type="button"
            onClick={onClose}
            title="Close"
            className="w-6 h-6 flex items-center justify-center rounded bg-[#7c1d2e]/60 hover:bg-[#a6263d] text-white transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-5 max-h-[78vh] overflow-y-auto">{children}</div>
    </div>
  );
}
