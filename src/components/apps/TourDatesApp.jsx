import React, { useEffect, useState } from "react";
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

  return (
    <div className="bg-[#cfc5cf] border-2 border-[#5c4a5c] p-3.5 text-[#1c151e]">
      <h3 className="font-serif text-2xl font-bold tracking-tight text-[#1c151e] border-b border-[#8f7d8f] pb-2 mb-3">
        Upcoming Gigs
      </h3>

      {loading ? (
        <p className="font-mono text-xs py-4">Memuat jadwal gigs...</p>
      ) : gigs.length === 0 ? (
        <p className="font-mono text-xs py-4 text-center">
          Belum ada jadwal manggung yang dipublikasikan.
        </p>
      ) : (
        <div className="space-y-2.5">
          {gigs.map((gig, idx) => {
            const ticketUrl = sanitizeUrl(gig["Ticket / RSVP Link"]);
            const badgeText = (gig["Ticket Status"] || "ON TOUR").toUpperCase();

            return (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#9e8e9e]/70 last:border-b-0"
              >
                <div>
                  <p className="font-gothic-title text-xl leading-snug text-[#1a131c]">
                    {gig["Venue"]} — {gig["City & Country"]}
                  </p>
                  <p className="font-mono text-[11px] text-[#3d313f]">
                    {gig["Date"]} • {gig["Tour / Event"]}
                    {gig["Stage Time"] ? ` (${gig["Stage Time"]})` : ""}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {ticketUrl ? (
                    <a
                      href={ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded bg-[#821d30] hover:bg-[#a1243c] text-white font-mono text-[10px] font-bold tracking-wider shadow-sm"
                    >
                      {badgeText}
                    </a>
                  ) : (
                    <span className="px-2.5 py-1 rounded bg-[#821d30] text-white font-mono text-[10px] font-bold tracking-wider shadow-sm">
                      {badgeText}
                    </span>
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