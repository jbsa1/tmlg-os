import React, { useEffect, useState } from "react";
import { Tv, Disc3, Calendar, ShoppingBag, FileText, Share2, Shield } from "lucide-react";
import TopBar from "./components/TopBar";
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
  { id: "visuals", label: "Visuals_TV.app", icon: Tv, component: VisualsTvApp, maxWidth: "max-w-3xl" },
  { id: "audio", label: "Audio_Player.exe", icon: Disc3, component: AudioPlayerApp, maxWidth: "max-w-2xl" },
  { id: "tour", label: "Tour_Dates.txt", icon: Calendar, component: TourDatesApp, maxWidth: "max-w-2xl" },
  { id: "merch", label: "Merch_Store.pkg", icon: ShoppingBag, component: MerchStoreApp, maxWidth: "max-w-2xl" },
  { id: "epk", label: "EPK_Bio.doc", icon: FileText, component: EpkBioApp, maxWidth: "max-w-xl" },
  { id: "socials", label: "Socials_Links.lnk", icon: Share2, component: SocialsApp, maxWidth: "max-w-md" },
];

export default function App() {
  const [activeAppId, setActiveAppId] = useState(() =>
    window.location.hash === "#/admin" ? "admin" : "visuals"
  );

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#/admin") {
        setActiveAppId("admin");
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const activeApp =
    activeAppId === "admin"
      ? { id: "admin", label: "Admin_CMS.app", icon: Shield, component: AdminCmsApp, maxWidth: "max-w-2xl" }
      : APPS.find((app) => app.id === activeAppId) || null;

  const ActiveComponent = activeApp?.component;

  return (
    <div className="min-h-screen dreamy-gothic-wallpaper relative overflow-x-hidden pt-12 pb-8 px-3 sm:px-6 flex flex-col">
      <TopBar />

      <div className="pointer-events-none fixed inset-3 top-11 rounded-2xl border border-[#7c1d2e]/30 z-0" />

      <main className="relative z-10 flex-1 max-w-6xl w-full mx-auto grid grid-cols-1 lg:grid-cols-[120px_1fr] gap-5 items-start pt-2">
        <nav
          aria-label="Desktop Applications"
          className="flex flex-wrap lg:flex-col justify-center lg:justify-start gap-2"
        >
          {APPS.map((app) => (
            <DesktopIcon
              key={app.id}
              label={app.label}
              icon={app.icon}
              active={activeAppId === app.id}
              onClick={() => setActiveAppId(app.id)}
            />
          ))}
        </nav>

        <section className="w-full flex items-start justify-center">
          {activeApp && ActiveComponent ? (
            <OsWindow
              title={activeApp.label}
              maxWidth={activeApp.maxWidth}
              onClose={() => {
                if (window.location.hash === "#/admin") {
                  window.history.replaceState(null, "", " ");
                }
                setActiveAppId(null);
              }}
            >
              <ActiveComponent />
            </OsWindow>
          ) : (
            <div className="my-auto py-24 text-center font-mono text-xs text-stone-400 select-none">
              <p>Pilih ikon aplikasi di samping untuk membuka jendela.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
