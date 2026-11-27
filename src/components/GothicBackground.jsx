import React from "react";

export default function GothicBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Lapisan Langit Kabut Senja */}
      <div className="absolute inset-0 dreamy-gothic-sky" />

      {/* Pendar Bulan Purnama di Balik Kabut */}
      <div
        className="absolute top-[12%] right-[16%] w-44 h-44 sm:w-64 sm:h-64 rounded-full opacity-45 blur-md"
        style={{
          background:
            "radial-gradient(circle, rgba(246,232,238,0.85) 0%, rgba(196,158,182,0.35) 45%, transparent 72%)",
        }}
      />

      {/* Lapisan Kabut Melayang */}
      <div className="mist-layer mist-1" />
      <div className="mist-layer mist-2" />

      {/* Siluet Pepohonan Gotik & Reruntuhan Katedral di Bagian Bawah */}
      <svg
        viewBox="0 0 1440 360"
        preserveAspectRatio="none"
        className="absolute bottom-0 left-0 w-full h-44 sm:h-64 opacity-85"
      >
        <defs>
          <linearGradient id="forestFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1b1626" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#0d0b12" stopOpacity="0.98" />
          </linearGradient>
        </defs>
        {/* Siluet Bukit & Kabut Jauh */}
        <path
          d="M0,260 Q240,210 480,250 T960,235 T1440,255 L1440,360 L0,360 Z"
          fill="#221c2e"
          opacity="0.7"
        />
        {/* Siluet Pohon Cemara Gotik & Ranting */}
        <path
          d="M0,360 L0,210 L25,250 L45,165 L70,245 L95,190 L120,260 L155,140 L185,245 L210,195 L240,265 L285,175 L315,255 L350,210 L390,270 L435,155 L465,245 L505,195 L540,265 L590,220 L635,170 L665,250 L710,205 L750,270 L800,150 L835,245 L875,185 L915,260 L965,200 L1010,265 L1055,145 L1090,245 L1130,190 L1170,265 L1220,175 L1255,250 L1295,185 L1335,255 L1380,160 L1415,245 L1440,215 L1440,360 Z"
          fill="url(#forestFade)"
        />
      </svg>

      {/* Bingkai Filigree Crimson Klasik di Keempat Sudut Layar */}
      <div className="fixed inset-2.5 top-11 border border-[#8f2438]/40 rounded-lg">
        <CornerOrnament className="top-0 left-0" />
        <CornerOrnament className="top-0 right-0 scale-x-[-1]" />
        <CornerOrnament className="bottom-0 left-0 scale-y-[-1]" />
        <CornerOrnament className="bottom-0 right-0 scale-[-1]" />
      </div>

      {/* Tekstur Analog Film Grain */}
      <div className="absolute inset-0 film-grain opacity-20" />
    </div>
  );
}

function CornerOrnament({ className = "" }) {
  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 44 44"
      fill="none"
      className={`absolute text-[#a82840]/75 ${className}`}
    >
      <path
        d="M2 38V6C2 3.79086 3.79086 2 6 2H38"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M7 28V11C7 8.79086 8.79086 7 11 7H28"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 2"
      />
      <path
        d="M12 12L18 6M12 12L6 18M12 12L17 17"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}