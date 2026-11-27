import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, SkipBack, SkipForward, Tv } from "lucide-react";
import { BAND_CONFIG } from "../../config/bandConfig";

const FALLBACK_VIDEOS = [
  {
    id: "fallback-1",
    title: "THE MARY'S LOST GAZE - Wasted (Official Audio / Visual)",
    publishedAt: "2024",
    thumbnail: "",
  },
];

export default function VisualsTvApp() {
  const [videos, setVideos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function loadYoutubeVideos() {
      const { apiKey, channelId } = BAND_CONFIG.youtube;
      if (!apiKey || !channelId) {
        setVideos(FALLBACK_VIDEOS);
        setLoading(false);
        return;
      }

      try {
        const uploadsPlaylistId = channelId.startsWith("UC")
          ? `UU${channelId.slice(2)}`
          : channelId;

        const endpoint = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=${encodeURIComponent(
          uploadsPlaylistId
        )}&key=${encodeURIComponent(apiKey)}`;

        const res = await fetch(endpoint);
        const data = await res.json();

        if (!res.ok || !data.items?.length) {
          throw new Error(data.error?.message || "Video tidak ditemukan");
        }

        const mapped = data.items
          .map((item) => ({
            id: item.snippet?.resourceId?.videoId,
            title: item.snippet?.title,
            publishedAt: item.snippet?.publishedAt?.slice(0, 10) || "",
            thumbnail:
              item.snippet?.thumbnails?.medium?.url ||
              item.snippet?.thumbnails?.default?.url ||
              "",
          }))
          .filter((v) => v.id && v.title !== "Private video");

        setVideos(mapped.length ? mapped : FALLBACK_VIDEOS);
      } catch (err) {
        setErrorMsg("Mode offline: gagal memuat feed YouTube.");
        setVideos(FALLBACK_VIDEOS);
      } finally {
        setLoading(false);
      }
    }

    loadYoutubeVideos();
  }, []);

  const currentVideo = videos[currentIndex];
  const handlePrev = () =>
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  const handleNext = () =>
    setCurrentIndex((prev) => (prev + 1) % videos.length);

  return (
    <div className="space-y-4">
      <div className="relative rounded-2xl p-3 sm:p-4 bg-gradient-to-b from-[#2b2933] to-[#1a1820] border-2 border-[#474252] shadow-inner">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_76px] gap-3 items-center">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-black border-4 border-[#111015] shadow-[inset_0_0_30px_rgba(0,0,0,0.9)]">
            {loading ? (
              <div className="w-full h-full flex flex-col items-center justify-center font-mono text-xs text-stone-400 gap-2">
                <Tv className="w-6 h-6 animate-pulse text-[#b3263e]" />
                <span>TUNING SIGNAL...</span>
              </div>
            ) : currentVideo && !currentVideo.id.startsWith("fallback") ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${currentVideo.id}?rel=0`}
                title={currentVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center font-mono">
                <p className="text-sm text-[#d4445c] font-bold">NO SIGNAL / ARCHIVE</p>
                <p className="text-xs text-stone-400 mt-1">
                  {currentVideo?.title || "Kunjungi kanal YouTube resmi kami"}
                </p>
                <a
                  href={BAND_CONFIG.youtube.channelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 px-3 py-1.5 text-xs rounded bg-[#7c1d2e] hover:bg-[#9c253a] text-white"
                >
                  Buka YouTube Resmi
                </a>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 crt-scanlines opacity-35" />
          </div>

          <div className="hidden md:flex flex-col items-center justify-center gap-4 py-3 px-2 rounded-xl bg-[#16151c] border border-white/10">
            <button
              type="button"
              onClick={handlePrev}
              title="Channel Sebelumnya"
              className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#1e1d26] to-[#3a3747] border-2 border-[#595369] flex items-center justify-center active:rotate-[-25deg] transition-transform shadow-md"
            >
              <span className="w-1 h-4 bg-[#d4445c] rounded-full" />
            </button>
            <span className="font-mono text-[10px] text-stone-400">CH 0{currentIndex + 1}</span>
            <button
              type="button"
              onClick={handleNext}
              title="Channel Berikutnya"
              className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#1e1d26] to-[#3a3747] border-2 border-[#595369] flex items-center justify-center active:rotate-[25deg] transition-transform shadow-md"
            >
              <span className="w-1 h-4 bg-[#d4445c] rounded-full" />
            </button>
          </div>
        </div>

        <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              className="px-2.5 py-1.5 rounded bg-[#15141c] hover:bg-[#7c1d2e]/40 border border-[#7c1d2e]/50 font-mono text-xs text-stone-200 flex items-center gap-1"
            >
              <SkipBack className="w-3.5 h-3.5" /> &lt;&lt;
            </button>
            <button
              type="button"
              onClick={handleNext}
              className="px-2.5 py-1.5 rounded bg-[#15141c] hover:bg-[#7c1d2e]/40 border border-[#7c1d2e]/50 font-mono text-xs text-stone-200 flex items-center gap-1"
            >
              &gt;&gt; <SkipForward className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setDrawerOpen((o) => !o)}
            className="flex-1 sm:flex-initial min-w-[210px] px-3 py-1.5 rounded bg-[#15141c] hover:bg-[#231924] border border-[#7c1d2e]/70 font-mono text-xs text-stone-200 flex items-center justify-between gap-3"
          >
            <span className="truncate">
              Video Archives ({videos.length})
            </span>
            {drawerOpen ? (
              <ChevronDown className="w-4 h-4 text-[#d4445c]" />
            ) : (
              <ChevronUp className="w-4 h-4 text-[#d4445c]" />
            )}
          </button>
        </div>

        {drawerOpen && (
          <div className="mt-3 rounded-xl bg-[#100f17]/95 border border-[#7c1d2e]/80 overflow-hidden shadow-2xl">
            <div className="px-3 py-2 bg-[#24131c] border-b border-[#7c1d2e]/50 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-stone-200">
                Video_Archives.txt
              </span>
              <span className="font-mono text-[10px] text-stone-400">
                Pilih saluran video
              </span>
            </div>
            <div className="max-h-56 overflow-y-auto divide-y divide-white/5">
              {videos.map((vid, idx) => {
                const isSelected = idx === currentIndex;
                return (
                  <button
                    key={vid.id || idx}
                    type="button"
                    onClick={() => {
                      setCurrentIndex(idx);
                      setDrawerOpen(false);
                    }}
                    className={`w-full p-2.5 flex items-center gap-3 text-left transition ${
                      isSelected
                        ? "bg-[#7c1d2e]/35 border-l-2 border-[#d4445c]"
                        : "hover:bg-white/5"
                    }`}
                  >
                    {vid.thumbnail ? (
                      <img
                        src={vid.thumbnail}
                        alt=""
                        className="w-16 h-10 object-cover rounded border border-white/10 shrink-0"
                      />
                    ) : (
                      <div className="w-16 h-10 rounded bg-black/60 flex items-center justify-center text-[10px] font-mono text-stone-500 shrink-0">
                        CRT
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      {isSelected && (
                        <span className="block font-mono text-[10px] text-[#f0657d] font-bold">
                          PLAYING NOW ●
                        </span>
                      )}
                      <p className="font-mono text-xs text-stone-200 truncate">
                        {vid.title}
                      </p>
                      <span className="font-mono text-[10px] text-stone-400">
                        {vid.publishedAt}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {errorMsg && (
        <p className="font-mono text-[11px] text-amber-300/80">{errorMsg}</p>
      )}
    </div>
  );
}
