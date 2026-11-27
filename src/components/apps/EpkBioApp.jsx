import React from "react";
import { Mail, FileDown } from "lucide-react";
import { BAND_CONFIG } from "../../config/bandConfig";
import { sanitizeUrl } from "../../utils/security";

export default function EpkBioApp() {
  const epkLink = sanitizeUrl(BAND_CONFIG.bio.epkDriveUrl);

  return (
    <div className="bg-[#cfc5cf] border-2 border-[#5c4a5c] p-4 space-y-3 text-[#1c151e]">
      <div className="border-b border-[#8f7d8f] pb-2">
        <h3 className="font-serif text-xl font-bold">{BAND_CONFIG.bandName}</h3>
        <p className="font-mono text-xs text-[#751a2b] font-bold">
          {BAND_CONFIG.tagline}
        </p>
      </div>

      <div className="space-y-2 font-mono text-xs leading-relaxed">
        {BAND_CONFIG.bio.paragraphs.map((text, idx) => (
          <p key={idx}>{text}</p>
        ))}
      </div>

      <div className="pt-2 border-t border-[#8f7d8f] flex flex-wrap gap-2 font-mono text-xs">
        <a
          href={`mailto:${BAND_CONFIG.bookingEmail}`}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#751a2b] hover:bg-[#912136] text-white"
        >
          <Mail className="w-3.5 h-3.5" /> {BAND_CONFIG.bookingEmail}
        </a>
        {epkLink && (
          <a
            href={epkLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 win95-btn text-[#1c151e] font-bold"
          >
            <FileDown className="w-3.5 h-3.5" /> Download Press Kit
          </a>
        )}
      </div>
    </div>
  );
}