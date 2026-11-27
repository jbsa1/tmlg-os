import React, { useEffect, useRef, useState } from "react";
import { Minus, Square, X } from "lucide-react";

export default function OsWindow({
  title,
  onClose,
  onFocus,
  zIndex = 20,
  initialOffset = { x: 0, y: 0 },
  children,
  maxWidth = "max-w-3xl",
}) {
  const [pos, setPos] = useState(initialOffset);
  const draggingRef = useRef(false);
  const dragStartRef = useRef({ mouseX: 0, mouseY: 0, startX: 0, startY: 0 });

  useEffect(() => {
    const handleMove = (clientX, clientY) => {
      if (!draggingRef.current) return;
      const dx = clientX - dragStartRef.current.mouseX;
      const dy = clientY - dragStartRef.current.mouseY;
      setPos({
        x: dragStartRef.current.startX + dx,
        y: dragStartRef.current.startY + dy,
      });
    };

    const onMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
    };
    const stopDrag = () => {
      draggingRef.current = false;
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", stopDrag);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stopDrag);
    };
  }, []);

  const startDrag = (clientX, clientY) => {
    onFocus?.();
    draggingRef.current = true;
    dragStartRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      startX: pos.x,
      startY: pos.y,
    };
  };

  return (
    <div
      onMouseDown={() => onFocus?.()}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        zIndex,
      }}
      className={`relative w-full ${maxWidth} rounded-xl overflow-hidden bg-[#15121e]/90 backdrop-blur-xl border border-[#96263c]/80 shadow-[0_24px_70px_rgba(0,0,0,0.85)]`}
    >
      {/* Title Bar — Area Drag */}
      <div
        onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
        onTouchStart={(e) => {
          if (e.touches[0]) startDrag(e.touches[0].clientX, e.touches[0].clientY);
        }}
        title="Seret untuk menggeser jendela"
        className="h-9 px-3.5 flex items-center justify-between bg-gradient-to-r from-[#2e1420] via-[#1c1728] to-[#2e1420] border-b border-[#8f2438]/60 cursor-grab active:cursor-grabbing select-none"
      >
        <div className="flex items-center gap-2">
          <span className="text-[#e0536e] text-xs">✦</span>
          <span className="font-mono text-xs font-bold tracking-wider text-stone-100">
            {title}
          </span>
        </div>

        <div
          className="flex items-center gap-1.5"
          onMouseDown={(e) => e.stopPropagation()}
        >
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
            className="w-6 h-6 flex items-center justify-center rounded bg-[#851e32] hover:bg-[#b52944] text-white transition"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Isi Jendela */}
      <div className="p-4 sm:p-5 max-h-[75vh] overflow-y-auto">{children}</div>
    </div>
  );
}