import React, { useEffect, useState } from "react";
import { Disc3, ExternalLink } from "lucide-react";
import { BAND_CONFIG } from "../../config/bandConfig";
import { fetchSheetTab } from "../../utils/sheetsParser";
import { sanitizeUrl } from "../../utils/security";

export default function AudioPlayerApp() {
  const [releases, setReleases] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeTab, setActiveTab] = useState("releases");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSheetTab("Discography")
      .then((rows) => {
        setReleases(rows);
      })
      .catch(() => {
        setReleases([
          {
            "Release ID": "TMLG-001",
            "Track Title": "Wasted",
            Format: "Single",
            "Release Date": "2023-10-13",
            Duration: "04:48",
            "Key & Tempo": "D Minor • 108 BPM",
            "Producer / Studio": "The Mary's Lost Gaze",
            "Streaming Platform Link": BAND_CONFIG.spotify.profileUrl,
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  const currentRelease = releases[selectedIdx] || null;
  const safeStreamLink = sanitizeUrl(currentRelease?.["Streaming Platform Link"]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl overflow-hidden border border-[#7c1d2e]/60 bg-black/40">
        <iframe
          style={{ borderRadius: "12px" }}
          src={BAND_CONFIG.spotify.embedUrl}
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="The Mary's Lost Gaze Spotify Player"
        />
      </div>

      <div className="rounded-xl bg-[#100f18]/90 border border-[#7c1d2e]/50 p-3.5">
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <Disc3 className="w-4 h-4 text-[#d4445c]" />
            <h3 className="font-mono text-xs font-bold tracking-wider uppercase text-stone-200">
              Discography Archive
            </h3>
          </div>

          <div className="flex gap-1.5 font-mono text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("releases")}
              className={`px-2.5 py-1 rounded transition ${
                activeTab === "releases"
                  ? "bg-[#7c1d2e] text-white"
                  : "bg-white/5 text-stone-400 hover:text-stone-200"
              }`}
            >
              Releases
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("about")}
              className={`px-2.5 py-1 rounded transition ${
                activeTab === "about"
                  ? "bg-[#7c1d2e] text-white"
                  : "bg-white/5 text-stone-400 hover:text-stone-200"
              }`}
            >
              Track Info
            </button>
          </div>
        </div>

        {loading ? (
          <p className="font-mono text-xs text-stone-400 py-4 text-center">
            Memuat katalog dari database...
          </p>
        ) : activeTab === "releases" ? (
          <div className="space-y-1.5 max-h-52 overflow-y-auto">
            {releases.map((item, idx) => (
              <button
                key={item["Release ID"] || idx}
                type="button"
                onClick={() => {
                  setSelectedIdx(idx);
                  setActiveTab("about");
                }}
                className={`w-full px-3 py-2 rounded-lg flex items-center justify-between text-left font-mono text-xs transition ${
                  idx === selectedIdx
                    ? "bg-[#7c1d2e]/30 border border-[#b3263e]/60 text-white"
                    : "bg-white/[0.03] hover:bg-white/[0.07] text-stone-300"
                }`}
              >
                <div>
                  <span className="font-bold">{item["Track Title"]}</span>
                  <span className="text-stone-400 ml-2">
                    ({item["Format"] || "Release"})
                  </span>
                </div>
                <span className="text-[11px] text-stone-400">
                  {item["Release Date"]}
                </span>
              </button>
            ))}
          </div>
        ) : currentRelease ? (
          <div className="font-mono text-xs space-y-2 text-stone-300">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-white">
                {currentRelease["Track Title"]}
              </span>
              <span className="px-2 py-0.5 rounded bg-[#7c1d2e]/40 text-[#f28598] text-[11px]">
                {currentRelease["Format"]}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px] text-stone-400">
              <p>Tanggal Rilis: <span className="text-stone-200">{currentRelease["Release Date"] || "-"}</span></p>
              <p>Durasi: <span className="text-stone-200">{currentRelease["Duration"] || "-"}</span></p>
              <p>Key & Tempo: <span className="text-stone-200">{currentRelease["Key & Tempo"] || "-"}</span></p>
              <p>Producer / Studio: <span className="text-stone-200">{currentRelease["Producer / Studio"] || "-"}</span></p>
            </div>
            {safeStreamLink && (
              <div className="pt-2">
                <a
                  href={safeStreamLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#7c1d2e] hover:bg-[#9c253a] text-white text-xs"
                >
                  Dengarkan Rilisan <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
