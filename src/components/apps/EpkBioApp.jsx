import React from "react";
import { Mail, FileDown } from "lucide-react";
import { BAND_CONFIG } from "../../config/bandConfig";
import { sanitizeUrl } from "../../utils/security";

export default function EpkBioApp() {
  const epkLink = sanitizeUrl(BAND_CONFIG.bio.epkDriveUrl);

  return (
    <div className="space-y-4 font-mono text-xs text-stone-300 leading-relaxed">
      <div className="border-b border-white/10 pb-3">
        <h3 className="font-serif text-lg font-bold text-white tracking-wide">
          {BAND_CONFIG.bandName}
        </h3>
        <p className="text-[#d4445c]">{BAND_CONFIG.tagline}</p>
      </div>

      <div className="space-y-2.5">
        {BAND_CONFIG.bio.paragraphs.map((text, idx) => (
          <p key={idx}>{text}</p>
        ))}
      </div>

      <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-3">
        <a
          href={`mailto:${BAND_CONFIG.bookingEmail}?subject=${encodeURIComponent(
            "Booking / Press Inquiry - The Mary's Lost Gaze"
          )}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-[#7c1d2e] hover:bg-[#9c253a] text-white transition"
        >
          <Mail className="w-3.5 h-3.5" /> {BAND_CONFIG.bookingEmail}
        </a>

        {epkLink && (
          <a
            href={epkLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded bg-white/10 hover:bg-white/15 text-stone-200 transition"
          >
            <FileDown className="w-3.5 h-3.5" /> Download Press Kit / Rider
          </a>
        )}
      </div>
    </div>
  );
}
