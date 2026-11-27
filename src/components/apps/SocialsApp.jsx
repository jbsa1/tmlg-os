import React from "react";
import { ExternalLink, Mail } from "lucide-react";
import { BAND_CONFIG } from "../../config/bandConfig";

export default function SocialsApp() {
  return (
    <div className="space-y-2.5 font-mono text-xs">
      {BAND_CONFIG.socials.map((soc) => (
        <a
          key={soc.name}
          href={soc.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl bg-white/[0.03] hover:bg-[#7c1d2e]/25 border border-white/10 hover:border-[#b3263e]/60 flex items-center justify-between transition"
        >
          <div>
            <p className="font-bold text-white">{soc.name}</p>
            <p className="text-stone-400">{soc.handle}</p>
          </div>
          <ExternalLink className="w-4 h-4 text-[#d4445c]" />
        </a>
      ))}

      <a
        href={`mailto:${BAND_CONFIG.bookingEmail}`}
        className="p-3 rounded-xl bg-white/[0.03] hover:bg-[#7c1d2e]/25 border border-white/10 hover:border-[#b3263e]/60 flex items-center justify-between transition"
      >
        <div>
          <p className="font-bold text-white">Official E-Mail / Booking</p>
          <p className="text-stone-400">{BAND_CONFIG.bookingEmail}</p>
        </div>
        <Mail className="w-4 h-4 text-[#d4445c]" />
      </a>
    </div>
  );
}
