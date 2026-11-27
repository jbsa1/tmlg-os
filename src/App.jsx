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
  { id: "visuals", label: "Visuals_TV.app", component: VisualsTvApp, maxWidth: "max-w-2xl" },
  { id: "audio", label: "Audio_Player.exe", component: AudioPlayerApp, maxWidth: "max-w-xl" },
  { id: "tour", label: "Tour_Dates.txt", component: TourDatesApp, maxWidth: "max-w-xl" },
  { id: "merch", label: "Merch_Store.pkg", component: MerchStoreApp, maxWidth: "max-w-xl" },
  { id: "epk", label: "EPK_Bio.doc", component: EpkBioApp, maxWidth: "max-w-xl" },
  { id: "socials", label: "Socials_Links.lnk", component: SocialsApp, maxWidth: "max-w-md" },
];

const ALL_APPS_MAP = {
  ...Object.fromEntries(APPS.map((a) => [a.id, a])),
  admin: { id: "admin", label: "Admin_CMS.app", component: AdminCmsApp, maxWidth: "max-w-2xl" },
};

export default function App() {
  // Hanya buka 1 jendela saat awal: Visuals_TV.app (atau Admin_CMS.app jika lewat #/admin)
  const [openWindows, setOpenWindows] = useState(() =>
    window.location.hash === "#/admin" ? ["admin"] : ["visuals"]
  );

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
        <section className="relative w-full min-h-[600px] flex items-start justify-center">
          {openWindows.map((winId, index) => {
            const appDef = ALL_APPS_MAP[winId];
            if (!appDef) return null;
            const WindowComponent = appDef.component;
            // Jendela pertama pas di tengah; jendela tambahan geser sedikit agar rapi bertumpuk
            const initialOffset = { x: index * 20, y: index * 20 };

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