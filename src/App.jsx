import React, { useEffect, useState } from "react";
import TopBar from "./components/TopBar";
import GothicBackground from "./components/GothicBackground";
import DesktopIcon from "./components/DesktopIcon";
import OsWindow from "./components/OsWindow";
import VisualsTvApp from "./components/apps/VisualsTvApp";
import AudioPlayerApp from "./components/apps/AudioPlayerApp";
import TourDatesApp from "./components/apps/TourDatesApp";
import MerchStoreApp from "./components/apps/MerchStoreApp";
import EpkBioApp from "./components/apps/EpkBioApp";
import SocialsApp from "./components/apps/SocialsApp";
import AdminCmsApp from "./components/apps/AdminCmsApp";

const APPS = [
  { id: "visuals", label: "Visuals_TV.app", component: VisualsTvApp, maxWidth: "max-w-xl" },
  { id: "audio", label: "Audio_Player.exe", component: AudioPlayerApp, maxWidth: "max-w-lg" },
  { id: "tour", label: "Tour_Dates.txt", component: TourDatesApp, maxWidth: "max-w-lg" },
  { id: "merch", label: "Merch_Store.pkg", component: MerchStoreApp, maxWidth: "max-w-lg" },
  { id: "epk", label: "EPK_Bio.doc", component: EpkBioApp, maxWidth: "max-w-lg" },
  { id: "socials", label: "Socials_Links.lnk", component: SocialsApp, maxWidth: "max-w-md" },
];

const ALL_APPS_MAP = {
  ...Object.fromEntries(APPS.map((a) => [a.id, a])),
  admin: { id: "admin", label: "Admin_CMS.app", component: AdminCmsApp, maxWidth: "max-w-2xl" },
};

// Posisi awal jendela di layar desktop agar menyerupai tata letak mockup
const DEFAULT_OFFSETS = {
  audio: { x: -250, y: 12 },
  visuals: { x: 260, y: 0 },
  tour: { x: -20, y: 295 },
  merch: { x: 310, y: 310 },
  epk: { x: -120, y: 90 },
  socials: { x: 110, y: 110 },
  admin: { x: 0, y: 20 },
};

export default function App() {
  const [openWindows, setOpenWindows] = useState(() => {
    if (window.location.hash === "#/admin") return ["admin"];
    return window.innerWidth >= 1024 ? ["audio", "visuals", "tour"] : ["visuals"];
  });

  const openApp = (id) => {
    setOpenWindows((prev) => {
      const filtered = prev.filter((item) => item !== id);
      return [...filtered, id];
    });
  };

  const closeApp = (id) => {
    if (id === "admin" && window.location.hash === "#/admin") {
      window.history.replaceState(null, "", " ");
    }
    setOpenWindows((prev) => prev.filter((item) => item !== id));
  };

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#/admin") {
        openApp("admin");
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const topWindowId = openWindows[openWindows.length - 1] || null;
  const isDesktop = typeof window !== "undefined" && window.innerWidth >= 1024;

  return (
    <div className="min-h-screen relative overflow-x-hidden pt-12 pb-10 px-3 sm:px-6 flex flex-col">
      <TopBar />
      <GothicBackground />

      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-4 items-start pt-2">
        {/* Deretan Ikon Pixel-Art di Sisi Kiri */}
        <nav
          aria-label="Desktop Applications"
          className="flex flex-wrap lg:flex-col justify-center lg:justify-start gap-2.5 z-10"
        >
          {APPS.map((app) => (
            <DesktopIcon
              key={app.id}
              id={app.id}
              label={app.label}
              active={topWindowId === app.id}
              onClick={() => openApp(app.id)}
            />
          ))}
        </nav>

        {/* Area Workspace Jendela Draggable */}
        <section className="relative w-full min-h-[680px] flex items-start justify-center">
          {openWindows.map((winId, index) => {
            const appDef = ALL_APPS_MAP[winId];
            if (!appDef) return null;
            const WindowComponent = appDef.component;
            const initialOffset = isDesktop
              ? DEFAULT_OFFSETS[winId] || { x: index * 20, y: index * 20 }
              : { x: 0, y: index * 14 };

            return (
              <div
                key={winId}
                className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none"
              >
                <div className="pointer-events-auto w-full flex justify-center">
                  <OsWindow
                    title={appDef.label}
                    maxWidth={appDef.maxWidth}
                    zIndex={20 + index}
                    initialOffset={initialOffset}
                    onFocus={() => openApp(winId)}
                    onClose={() => closeApp(winId)}
                  >
                    <WindowComponent />
                  </OsWindow>
                </div>
              </div>
            );
          })}
        </section>
      </main>
    </div>
  );
}