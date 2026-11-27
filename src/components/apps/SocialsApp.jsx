import React from "react";
import { ExternalLink, Mail } from "lucide-react";
import { BAND_CONFIG } from "../../config/bandConfig";

export default function SocialsApp() {
  return (
    <div className="bg-[#cfc5cf] border-2 border-[#5c4a5c] p-3 space-y-2 font-mono text-xs text-[#1c151e]">
      {BAND_CONFIG.socials.map((soc) => (
        <a
          key={soc.name}
          href={soc.url}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2.5 bg-[#dfd7df] hover:bg-[#751a2b] hover:text-white border border-[#8f7d8f] flex items-center justify-between transition"
        >
          <div>
            <p className="font-bold">{soc.name}</p>
            <p className="opacity-80">{soc.handle}</p>
          </div>
          <ExternalLink className="w-4 h-4" />
        </a>
      ))}

      <a
        href={`mailto:${BAND_CONFIG.bookingEmail}`}
        className="p-2.5 bg-[#dfd7df] hover:bg-[#751a2b] hover:text-white border border-[#8f7d8f] flex items-center justify-between transition"
      >
        <div>
          <p className="font-bold">Official E-Mail / Booking</p>
          <p className="opacity-80">{BAND_CONFIG.bookingEmail}</p>
        </div>
        <Mail className="w-4 h-4" />
      </a>
    </div>
  );
}