import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { fetchSheetTab } from "../../utils/sheetsParser";
import { sanitizeUrl } from "../../utils/security";

export default function TourDatesApp() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSheetTab("Tour_Dates")
      .then(setGigs)
      .catch(() => setGigs([]))
      .finally(() => setLoading(false));
  }, []);

  const getStatusBadge = (status = "") => {
    const lower = status.toLowerCase();
    if (lower.includes("sold")) return "bg-red-950 text-red-300 border-red-700/60";
    if (lower.includes("fast")) return "bg-amber-950 text-amber-300 border-amber-700/60";
    if (lower.includes("cancel")) return "bg-stone-800 text-stone-400 border-stone-600";
    return "bg-emerald-950 text-emerald-300 border-emerald-700/60";
  };

  if (loading) {
    return <p className="font-mono text-xs text-stone-400">Memuat jadwal gigs...</p>;
  }

  return (
    <div className="space-y-3 font-mono">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="text-xs text-stone-400">
          LIVE SCHEDULE & APPEARANCES ({gigs.length})
        </span>
      </div>

      {gigs.length === 0 ? (
        <p className="text-xs text-stone-400 py-6 text-center">
          Belum ada jadwal manggung yang dipublikasikan.
        </p>
      ) : (
        <div className="space-y-2.5">
          {gigs.map((gig, idx) => {
            const ticketUrl = sanitizeUrl(gig["Ticket / RSVP Link"]);
            return (
              <div
                key={idx}
                className="p-3 rounded-xl bg-white/[0.03] border border-white/10 hover:border-[#7c1d2e]/70 transition flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#f0657d]">
                      <Calendar className="w-3.5 h-3.5" /> {gig["Date"]}
                    </span>
                    {gig["Stage Time"] && (
                      <span className="text-[11px] text-stone-400">
                        • {gig["Stage Time"]}
                      </span>
                    )}
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded border ${getStatusBadge(
                        gig["Ticket Status"]
                      )}`}
                    >
                      {gig["Ticket Status"] || "Available"}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white">
                    {gig["Tour / Event"]}
                  </h4>

                  <p className="text-xs text-stone-300 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    {gig["Venue"]} — {gig["City & Country"]}
                  </p>

                  {gig["Supporting Acts"] && (
                    <p className="text-[11px] text-stone-400">
                      w/ {gig["Supporting Acts"]}
                    </p>
                  )}
                </div>

                <div className="flex sm:flex-col items-end justify-between gap-2 shrink-0">
                  {gig["Ticket Price"] && (
                    <span className="text-xs font-bold text-stone-200">
                      {Number(gig["Ticket Price"]) === 0
                        ? "FREE ENTRY"
                        : `HTM: ${gig["Ticket Price"]}`}
                    </span>
                  )}
                  {ticketUrl && (
                    <a
                      href={ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#7c1d2e] hover:bg-[#9e2238] text-white text-xs transition"
                    >
                      <Ticket className="w-3.5 h-3.5" /> Info / Tiket
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
