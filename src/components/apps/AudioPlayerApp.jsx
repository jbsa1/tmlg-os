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
      .then((rows) => setReleases(rows))
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
    <div className="space-y-3">
      {/* Bagian Atas: Spotify Artist Embed */}
      <div className="border-2 border-[#5c4a5c] bg-[#1e1b22] overflow-hidden shadow-inner">
        <iframe
          src={BAND_CONFIG.spotify.embedUrl}
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="The Mary's Lost Gaze Spotify Player"
        />
      </div>

      {/* Bagian Bawah: Discography (Tanpa Lirik) */}
      <div className="border-2 border-[#5c4a5c] bg-[#cfc6cf] p-3">
        <div className="flex items-center justify-between bg-[#6e5e70] text-white px-2.5 py-1.5 mb-2.5">
          <div className="flex items-center gap-1.5">
            <Disc3 className="w-4 h-4" />
            <span className="font-mono text-xs font-bold">Discography</span>
          </div>
          <div className="flex gap-1 font-mono text-[11px]">
            <button
              type="button"
              onClick={() => setActiveTab("releases")}
              className={`px-2 py-0.5 ${
                activeTab === "releases"
                  ? "bg-[#751a2b] text-white font-bold"
                  : "win95-btn text-[#1c161f]"
              }`}
            >
              Releases
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("about")}
              className={`px-2 py-0.5 ${
                activeTab === "about"
                  ? "bg-[#751a2b] text-white font-bold"
                  : "win95-btn text-[#1c161f]"
              }`}
            >
              Track Info
            </button>
          </div>
        </div>

        {loading ? (
          <p className="font-mono text-xs text-[#3b303c] py-3 text-center">
            Memuat katalog...
          </p>
        ) : activeTab === "releases" ? (
          <div className="space-y-1 max-h-44 overflow-y-auto">
            {releases.map((item, idx) => (
              <button
                key={item["Release ID"] || idx}
                type="button"
                onClick={() => {
                  setSelectedIdx(idx);
                  setActiveTab("about");
                }}
                className={`w-full px-2.5 py-1.5 flex items-center justify-between text-left border transition ${
                  idx === selectedIdx
                    ? "bg-[#751a2b] text-white border-[#4a0e19]"
                    : "bg-[#dcd3dc] hover:bg-[#e8e0e8] text-[#1c161f] border-[#968796]"
                }`}
              >
                <span className="font-serif font-bold text-sm">
                  {item["Track Title"]}{" "}
                  <span className="font-mono text-[11px] font-normal opacity-80">
                    ({item["Format"] || "Single"})
                  </span>
                </span>
                <span className="font-mono text-[11px] opacity-85">
                  {item["Release Date"]}
                </span>
              </button>
            ))}
          </div>
        ) : currentRelease ? (
          <div className="space-y-2 text-[#1c161f]">
            <div className="flex items-center justify-between border-b border-[#8c7b8c] pb-1.5">
              <span className="font-serif text-base font-bold">
                {currentRelease["Track Title"]}
              </span>
              <span className="px-2 py-0.5 bg-[#751a2b] text-white font-mono text-[10px] uppercase">
                {currentRelease["Format"]}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 font-mono text-xs">
              <p>Rilis: <strong>{currentRelease["Release Date"] || "-"}</strong></p>
              <p>Durasi: <strong>{currentRelease["Duration"] || "-"}</strong></p>
              <p>Key & Tempo: <strong>{currentRelease["Key & Tempo"] || "-"}</strong></p>
              <p>Studio: <strong>{currentRelease["Producer / Studio"] || "-"}</strong></p>
            </div>
            {safeStreamLink && (
              <a
                href={safeStreamLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-1 px-3 py-1.5 bg-[#751a2b] hover:bg-[#912136] text-white font-mono text-xs"
              >
                Dengarkan Rilisan <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}