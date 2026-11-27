import React, { useEffect, useRef, useState } from "react";

export default function OsWindow({
  title,
  onClose,
  onFocus,
  zIndex = 20,
  initialOffset = { x: 0, y: 0 },
  children,
  maxWidth = "max-w-2xl",
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
      className={`relative w-full ${maxWidth} p-[3px] bg-[#751a2b] shadow-[0_18px_45px_rgba(24,14,22,0.55)]`}
    >
      {/* Ukiran Sulur Gotik di Sudut Luar Jendela */}
      <WindowCornerFiligree className="-top-3 -left-3" />
      <WindowCornerFiligree className="-top-3 -right-3 scale-x-[-1]" />
      <WindowCornerFiligree className="-bottom-3 -left-3 scale-y-[-1]" />
      <WindowCornerFiligree className="-bottom-3 -right-3 scale-[-1]" />

      {/* Inner Frame */}
      <div className="bg-[#b6aab8]/90 backdrop-blur-md border border-[#d6cbd6]">
        {/* Title Bar Klasik (Area Drag) */}
        <div
          onMouseDown={(e) => startDrag(e.clientX, e.clientY)}
          onTouchStart={(e) => {
            if (e.touches[0]) startDrag(e.touches[0].clientX, e.touches[0].clientY);
          }}
          title="Seret untuk menggeser jendela"
          className="h-8 px-2.5 flex items-center justify-between bg-gradient-to-r from-[#6c5c6e] via-[#837285] to-[#6c5c6e] border-b-2 border-[#751a2b] cursor-grab active:cursor-grabbing select-none"
        >
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-[#751a2b] border border-[#e3d7e3] inline-block" />
            <span className="font-mono text-xs font-bold text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.8)]">
              {title}
            </span>
          </div>

          {/* Tombol Win95 [_] [□] [X] */}
          <div
            className="flex items-center gap-1"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              title="Minimize"
              className="w-5 h-5 win95-btn flex items-center justify-center text-[11px] font-bold text-[#1d1720] leading-none"
            >
              _
            </button>
            <span className="w-5 h-5 win95-btn flex items-center justify-center text-[10px] font-bold text-[#4a3d49] leading-none">
              □
            </span>
            <button
              type="button"
              onClick={onClose}
              title="Close"
              className="w-5 h-5 win95-btn flex items-center justify-center text-[11px] font-bold text-[#6e1526] leading-none"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Isi Jendela */}
        <div className="p-3.5 sm:p-4 max-h-[74vh] overflow-y-auto text-[#1c161f]">
          {children}
        </div>
      </div>
    </div>
  );
}

function WindowCornerFiligree({ className = "" }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      className={`pointer-events-none absolute z-20 text-[#361019] ${className}`}
    >
      <path
        d="M4 26C4 14 14 4 26 4M8 20C8 13 13 8 20 8M4 12C9 12 12 9 12 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="6" cy="6" r="2" fill="#751a2b" />
    </svg>
  );
}