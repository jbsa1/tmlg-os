import React from "react";

export default function GothicBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Langit Kabut Senja */}
      <div className="absolute inset-0 tmlg-mist-wallpaper" />

      {/* Siluet Menara Katedral Gotik di Tengah Kejauhan */}
      <svg
        viewBox="0 0 1440 600"
        preserveAspectRatio="xMidYMax slice"
        className="absolute bottom-0 left-0 w-full h-[78vh] opacity-55"
      >
        <defs>
          <linearGradient id="cathedralMist" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7b738f" stopOpacity="0.25" />
            <stop offset="65%" stopColor="#776c87" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#5d526b" stopOpacity="0.95" />
          </linearGradient>
        </defs>

        {/* Puncak menara katedral kembar di cakrawala */}
        <path
          d="M0,600 L0,470 Q180,445 360,468 T720,455 L745,455 L765,330 L772,240 L779,330 L795,435 L822,295 L830,175 L838,295 L858,425 L888,265 L897,135 L906,265 L932,435 L955,345 L962,275 L969,345 L990,450 Q1210,435 1440,465 L1440,600 Z"
          fill="url(#cathedralMist)"
        />
      </svg>

      {/* Siluet Ranting Pohon Gotik Merambat dari Kiri & Kanan */}
      <svg
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full opacity-75"
      >
        {/* Cabang Kiri */}
        <path
          d="M-10,120 Q80,150 145,210 L185,180 M145,210 Q210,260 265,330 L310,305 M220,285 L195,340 M-10,420 Q110,440 210,515 L265,485 M160,480 L130,545 M-10,760 Q140,680 295,675 L355,630 M240,680 L285,730 M390,795 Q440,720 495,690 L535,715 M465,710 L450,655"
          stroke="#463c52"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Ranting halus kiri */}
        <path
          d="M185,180 L215,155 M310,305 L345,285 M265,485 L305,465 M355,630 L395,605 M495,690 L530,655"
          stroke="#463c52"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Cabang Kanan */}
        <path
          d="M1450,150 Q1350,190 1280,260 L1235,230 M1280,260 Q1210,320 1165,390 L1120,365 M1450,480 Q1330,500 1245,570 L1195,540 M1450,740 Q1300,670 1140,670 L1085,625 M1210,675 L1165,730"
          stroke="#463c52"
          strokeWidth="4.5"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M1235,230 L1200,205 M1120,365 L1085,345 M1195,540 L1155,515 M1085,625 L1045,600"
          stroke="#463c52"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </svg>

      {/* Bingkai Luar Crimson & Ukiran Sulur Sudut Layar */}
      <div className="fixed inset-1.5 top-10 border-2 border-[#691727]/85 pointer-events-none">
        <ScreenCorner className="top-0 left-0" />
        <ScreenCorner className="top-0 right-0 scale-x-[-1]" />
        <ScreenCorner className="bottom-0 left-0 scale-y-[-1]" />
        <ScreenCorner className="bottom-0 right-0 scale-[-1]" />
      </div>
    </div>
  );
}

function ScreenCorner({ className = "" }) {
  return (
    <svg
      width="68"
      height="68"
      viewBox="0 0 68 68"
      fill="none"
      className={`absolute text-[#5e1422] ${className}`}
    >
      <path
        d="M2 58V10C2 5.58172 5.58172 2 10 2H58"
        stroke="currentColor"
        strokeWidth="2.5"
      />
      <path
        d="M8 44C8 24 24 8 44 8M14 34C14 21 21 14 34 14"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M12 12C18 18 22 10 28 16M12 12C18 18 10 22 16 28"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}