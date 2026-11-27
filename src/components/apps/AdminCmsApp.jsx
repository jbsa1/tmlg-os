import React, { useState } from "react";
import { Lock, Send, CheckCircle2, AlertTriangle } from "lucide-react";
import { BAND_CONFIG } from "../../config/bandConfig";
import { sanitizeSheetCell } from "../../utils/security";

export default function AdminCmsApp() {
  const [pin, setPin] = useState(() => sessionStorage.getItem("tmlg_admin_pin") || "");
  const [authenticated, setAuthenticated] = useState(
    () => Boolean(sessionStorage.getItem("tmlg_admin_pin"))
  );
  const [attempts, setAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState(0);

  const [targetTab, setTargetTab] = useState("Discography");
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleUnlock = (e) => {
    e.preventDefault();
    if (Date.now() < lockedUntil) return;

    if (!pin.trim() || pin.trim().length < 4) {
      const nextAttempts = attempts + 1;
      setAttempts(nextAttempts);
      if (nextAttempts >= 5) {
        setLockedUntil(Date.now() + 30_000);
        setAttempts(0);
      }
      setStatus({ type: "error", message: "Format PIN tidak valid." });
      return;
    }

    sessionStorage.setItem("tmlg_admin_pin", pin.trim());
    setAuthenticated(true);
    setStatus({ type: "", message: "" });
  };

  const handleChange = (key, val) => {
    setFormData((prev) => ({ ...prev, [key]: val }));
  };

  const buildRowPayload = () => {
    if (targetTab === "Discography") {
      return [
        sanitizeSheetCell(formData.releaseId),
        sanitizeSheetCell(formData.trackTitle),
        sanitizeSheetCell(formData.format || "Single"),
        sanitizeSheetCell(formData.releaseDate),
        sanitizeSheetCell(formData.duration),
        sanitizeSheetCell(formData.keyTempo),
        sanitizeSheetCell(formData.producer),
        sanitizeSheetCell(formData.streamLink),
      ];
    }
    if (targetTab === "Tour_Dates") {
      return [
        sanitizeSheetCell(formData.date),
        sanitizeSheetCell(formData.event),
        sanitizeSheetCell(formData.venue),
        sanitizeSheetCell(formData.city),
        sanitizeSheetCell(formData.stageTime),
        sanitizeSheetCell(formData.support),
        sanitizeSheetCell(formData.ticketStatus || "Available"),
        sanitizeSheetCell(formData.ticketPrice),
        sanitizeSheetCell(formData.ticketLink),
      ];
    }
    return [
      sanitizeSheetCell(formData.itemCode),
      sanitizeSheetCell(formData.itemName),
      sanitizeSheetCell(formData.category || "Apparel"),
      sanitizeSheetCell(formData.variant),
      Number(formData.unitPrice) || 0,
      Number(formData.stockQty) || 0,
      "",
      sanitizeSheetCell(formData.restockStatus || "In Stock"),
      sanitizeSheetCell(formData.webstoreLink),
    ];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const scriptUrl = BAND_CONFIG.sheets.appsScriptUrl;
    if (!scriptUrl) {
      setStatus({
        type: "error",
        message: "VITE_APPS_SCRIPT_URL belum diatur di environment variable.",
      });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        body: JSON.stringify({
          pin: sessionStorage.getItem("tmlg_admin_pin"),
          sheetName: targetTab,
          row: buildRowPayload(),
        }),
      });

      const result = await response.json();
      if (result.status === "success") {
        setStatus({ type: "success", message: result.message });
        setFormData({});
      } else {
        setStatus({ type: "error", message: result.message || "Gagal menyimpan." });
      }
    } catch {
      setStatus({
        type: "error",
        message: "Gagal terhubung ke Apps Script. Pastikan deployment disetel 'Anyone'.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!authenticated) {
    const isLocked = Date.now() < lockedUntil;
    return (
      <form onSubmit={handleUnlock} className="max-w-sm mx-auto py-6 space-y-3 font-mono text-xs">
        <div className="flex items-center gap-2 text-[#f0657d] font-bold">
          <Lock className="w-4 h-4" />
          <span>RESTRICTED SYSTEM ACCESS</span>
        </div>
        <p className="text-stone-400">
          Masukkan Admin PIN untuk mengelola database Google Sheets TMLG_OS.
        </p>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Masukkan PIN Admin..."
          disabled={isLocked}
          className="w-full px-3 py-2 rounded bg-black/60 border border-[#7c1d2e]/70 text-white focus:outline-none focus:border-[#d4445c]"
        />
        <button
          type="submit"
          disabled={isLocked}
          className="w-full py-2 rounded bg-[#7c1d2e] hover:bg-[#9c253a] text-white font-bold disabled:opacity-50"
        >
          {isLocked ? "Terkunci sementara (30 detik)..." : "Unlock CMS"}
        </button>
        {status.message && (
          <p className="text-red-400 text-[11px]">{status.message}</p>
        )}
      </form>
    );
  }

  return (
    <div className="space-y-4 font-mono text-xs">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
        <div className="flex gap-1.5">
          {["Discography", "Tour_Dates", "Merch_Store"].map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setTargetTab(tab);
                setFormData({});
                setStatus({ type: "", message: "" });
              }}
              className={`px-2.5 py-1 rounded ${
                targetTab === tab
                  ? "bg-[#7c1d2e] text-white"
                  : "bg-white/5 text-stone-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem("tmlg_admin_pin");
            setAuthenticated(false);
            setPin("");
          }}
          className="text-[11px] text-stone-400 hover:text-red-400"
        >
          Lock Session
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {targetTab === "Discography" && (
          <>
            <InputField label="Release ID" placeholder="TMLG-002" value={formData.releaseId} onChange={(v) => handleChange("releaseId", v)} required />
            <InputField label="Track Title" placeholder="Judul Lagu" value={formData.trackTitle} onChange={(v) => handleChange("trackTitle", v)} required />
            <InputField label="Format" placeholder="Single / EP / Album" value={formData.format} onChange={(v) => handleChange("format", v)} />
            <InputField label="Release Date" type="date" value={formData.releaseDate} onChange={(v) => handleChange("releaseDate", v)} />
            <InputField label="Duration" placeholder="04:30" value={formData.duration} onChange={(v) => handleChange("duration", v)} />
            <InputField label="Key & Tempo" placeholder="A Minor • 105 BPM" value={formData.keyTempo} onChange={(v) => handleChange("keyTempo", v)} />
            <InputField label="Producer / Studio" placeholder="Nama Studio" value={formData.producer} onChange={(v) => handleChange("producer", v)} />
            <InputField label="Streaming Platform Link" placeholder="https://open.spotify.com/..." value={formData.streamLink} onChange={(v) => handleChange("streamLink", v)} />
          </>
        )}

        {targetTab === "Tour_Dates" && (
          <>
            <InputField label="Date" type="date" value={formData.date} onChange={(v) => handleChange("date", v)} required />
            <InputField label="Tour / Event" placeholder="Nama Acara" value={formData.event} onChange={(v) => handleChange("event", v)} required />
            <InputField label="Venue" placeholder="Nama Venue" value={formData.venue} onChange={(v) => handleChange("venue", v)} required />
            <InputField label="City & Country" placeholder="Surabaya, Indonesia" value={formData.city} onChange={(v) => handleChange("city", v)} required />
            <InputField label="Stage Time" placeholder="21:00" value={formData.stageTime} onChange={(v) => handleChange("stageTime", v)} />
            <InputField label="Supporting Acts" placeholder="Band lainnya" value={formData.support} onChange={(v) => handleChange("support", v)} />
            <InputField label="Ticket Status" placeholder="Available / Selling Fast / Sold Out" value={formData.ticketStatus} onChange={(v) => handleChange("ticketStatus", v)} />
            <InputField label="Ticket Price" placeholder="75000" value={formData.ticketPrice} onChange={(v) => handleChange("ticketPrice", v)} />
            <InputField label="Ticket / RSVP Link" placeholder="https://..." value={formData.ticketLink} onChange={(v) => handleChange("ticketLink", v)} />
          </>
        )}

        {targetTab === "Merch_Store" && (
          <>
            <InputField label="Item Code" placeholder="TMLG-TSH-002" value={formData.itemCode} onChange={(v) => handleChange("itemCode", v)} required />
            <InputField label="Item Name" placeholder="Nama Kaos / Kaset" value={formData.itemName} onChange={(v) => handleChange("itemName", v)} required />
            <InputField label="Category" placeholder="Apparel / Cassette / Vinyl" value={formData.category} onChange={(v) => handleChange("category", v)} />
            <InputField label="Variant / Specifications" placeholder="Black / S, M, L, XL" value={formData.variant} onChange={(v) => handleChange("variant", v)} />
            <InputField label="Unit Price" type="number" placeholder="185000" value={formData.unitPrice} onChange={(v) => handleChange("unitPrice", v)} required />
            <InputField label="Stock Qty" type="number" placeholder="25" value={formData.stockQty} onChange={(v) => handleChange("stockQty", v)} required />
            <InputField label="Restock Status" placeholder="In Stock / Low Stock / Sold Out" value={formData.restockStatus} onChange={(v) => handleChange("restockStatus", v)} />
            <InputField label="Image / Webstore Link" placeholder="https://..." value={formData.webstoreLink} onChange={(v) => handleChange("webstoreLink", v)} />
          </>
        )}

        <div className="sm:col-span-2 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 rounded bg-[#7c1d2e] hover:bg-[#9c253a] text-white font-bold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            {submitting ? "Mengirim ke Google Sheets..." : `Simpan ke ${targetTab}`}
          </button>
        </div>
      </form>

      {status.message && (
        <div
          className={`p-2.5 rounded flex items-center gap-2 ${
            status.type === "success"
              ? "bg-emerald-950/80 text-emerald-300 border border-emerald-700/60"
              : "bg-red-950/80 text-red-300 border border-red-700/60"
          }`}
        >
          {status.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0" />
          )}
          <span>{status.message}</span>
        </div>
      )}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, type = "text", required = false }) {
  return (
    <label className="block space-y-1">
      <span className="text-[11px] text-stone-400">{label}</span>
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full px-2.5 py-1.5 rounded bg-black/55 border border-white/15 text-stone-100 focus:outline-none focus:border-[#d4445c]"
      />
    </label>
  );
}
