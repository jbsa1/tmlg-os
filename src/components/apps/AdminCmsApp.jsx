import React, { useState } from "react";
import { Lock, Send, CheckCircle2, AlertTriangle } from "lucide-react";
import { BAND_CONFIG } from "../../config/bandConfig";
import { sanitizeCell } from "../../utils/security";

export default function AdminCmsApp() {
  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [activeSheet, setActiveSheet] = useState("Tour_Dates");
  const [status, setStatus] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  const [gigForm, setGigForm] = useState({
    date: "",
    tourEvent: "",
    venue: "",
    city: "",
    stageTime: "",
    status: "ON TOUR",
    ticketLink: "",
  });

  const [releaseForm, setReleaseForm] = useState({
    id: "",
    title: "",
    format: "Single",
    releaseDate: "",
    duration: "",
    keyTempo: "",
    producer: "The Mary's Lost Gaze",
    streamLink: "",
  });

  const [merchForm, setMerchForm] = useState({
    code: "",
    name: "",
    category: "Apparel",
    variant: "",
    price: "",
    stock: "",
    restockStatus: "In Stock",
    webstoreLink: "",
    photoUrl: "",
  });

  const [bioForm, setBioForm] = useState({
    tagline: BAND_CONFIG.tagline,
    paragraph1: BAND_CONFIG.bio.paragraphs[0] || "",
    paragraph2: BAND_CONFIG.bio.paragraphs[1] || "",
    bookingEmail: BAND_CONFIG.bookingEmail,
    epkDriveUrl: BAND_CONFIG.bio.epkDriveUrl || "",
  });

  const handleUnlock = (e) => {
    e.preventDefault();
    if (pin.trim().length >= 4) {
      setUnlocked(true);
      setStatus({ type: "", text: "" });
    } else {
      setStatus({ type: "error", text: "Masukkan PIN yang valid terlebih dahulu." });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const scriptUrl = BAND_CONFIG.sheets.appsScriptUrl;

    if (!scriptUrl) {
      setStatus({
        type: "error",
        text: "VITE_APPS_SCRIPT_URL belum diatur di Environment Variables.",
      });
      return;
    }

    let row = [];
    if (activeSheet === "Tour_Dates") {
      row = [
        sanitizeCell(gigForm.date),
        sanitizeCell(gigForm.tourEvent),
        sanitizeCell(gigForm.venue),
        sanitizeCell(gigForm.city),
        sanitizeCell(gigForm.stageTime),
        sanitizeCell(gigForm.status),
        sanitizeCell(gigForm.ticketLink),
      ];
    } else if (activeSheet === "Discography") {
      row = [
        sanitizeCell(releaseForm.id),
        sanitizeCell(releaseForm.title),
        sanitizeCell(releaseForm.format),
        sanitizeCell(releaseForm.releaseDate),
        sanitizeCell(releaseForm.duration),
        sanitizeCell(releaseForm.keyTempo),
        sanitizeCell(releaseForm.producer),
        sanitizeCell(releaseForm.streamLink),
      ];
    } else if (activeSheet === "Merch_Store") {
      row = [
        sanitizeCell(merchForm.code),          // A: Item Code
        sanitizeCell(merchForm.name),          // B: Item Name
        sanitizeCell(merchForm.category),      // C: Category
        sanitizeCell(merchForm.variant),       // D: Variant / Specifications
        Number(merchForm.price) || 0,          // E: Unit Price
        Number(merchForm.stock) || 0,          // F: Stock Qty
        "",                                    // G: Inventory Value (diisi rumus oleh Apps Script)
        sanitizeCell(merchForm.restockStatus), // H: Restock Status
        "",                                    // I: Notes / Supplier
        sanitizeCell(merchForm.webstoreLink),  // J: Webstore Link
        sanitizeCell(merchForm.photoUrl),      // K: Photo URL
      ];
    } else if (activeSheet === "Bio") {
      row = [
        sanitizeCell(bioForm.tagline),
        sanitizeCell(bioForm.paragraph1),
        sanitizeCell(bioForm.paragraph2),
        sanitizeCell(bioForm.bookingEmail),
        sanitizeCell(bioForm.epkDriveUrl),
      ];
    }

    setSubmitting(true);
    setStatus({ type: "", text: "" });

    try {
      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({
          pin: pin.trim(),
          sheetName: activeSheet,
          row,
        }),
      });
      const result = await response.json();

      if (result.status === "success") {
        setStatus({ type: "success", text: result.message });
      } else {
        setStatus({ type: "error", text: result.message || "Gagal menyimpan data." });
      }
    } catch (err) {
      setStatus({ type: "error", text: "Koneksi gagal: " + err.message });
    } finally {
      setSubmitting(false);
    }
  };

  if (!unlocked) {
    return (
      <form
        onSubmit={handleUnlock}
        className="max-w-sm mx-auto py-6 space-y-4 font-mono bg-[#cfc5cf] border-2 border-[#5c4a5c] p-5"
      >
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-11 h-11 bg-[#751a2b] text-white flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-[#1c151e]">TMLG_OS Admin Gate</h3>
          <p className="text-xs text-[#3b303c]">
            Masukkan PIN Apps Script untuk mengelola konten database band.
          </p>
        </div>

        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Masukkan PIN..."
          className="w-full px-3 py-2 bg-white border border-[#5c4a5c] text-sm text-[#1c151e] focus:outline-none"
          required
        />

        {status.text && (
          <p className="text-xs text-[#8f1d32] font-bold text-center">{status.text}</p>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-[#751a2b] hover:bg-[#912136] text-white text-xs font-bold"
        >
          Unlock CMS
        </button>
      </form>
    );
  }

  return (
    <div className="space-y-4 font-mono text-xs bg-[#cfc5cf] border-2 border-[#5c4a5c] p-4 text-[#1c151e]">
      <div className="flex flex-wrap gap-1.5 border-b border-[#8f7d8f] pb-3">
        {[
          { id: "Tour_Dates", label: "+ Tour Dates" },
          { id: "Discography", label: "+ Discography" },
          { id: "Merch_Store", label: "+ Merch Store" },
          { id: "Bio", label: "Edit Bio" },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setActiveSheet(tab.id);
              setStatus({ type: "", text: "" });
            }}
            className={`px-3 py-1.5 font-bold ${
              activeSheet === tab.id
                ? "bg-[#751a2b] text-white"
                : "win95-btn text-[#1c151e]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {activeSheet === "Tour_Dates" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <InputField
              label="Date (YYYY-MM-DD)"
              value={gigForm.date}
              onChange={(v) => setGigForm({ ...gigForm, date: v })}
              required
            />
            <InputField
              label="Tour / Event"
              value={gigForm.tourEvent}
              onChange={(v) => setGigForm({ ...gigForm, tourEvent: v })}
              required
            />
            <InputField
              label="Venue"
              value={gigForm.venue}
              onChange={(v) => setGigForm({ ...gigForm, venue: v })}
              required
            />
            <InputField
              label="City & Country"
              value={gigForm.city}
              onChange={(v) => setGigForm({ ...gigForm, city: v })}
              required
            />
            <InputField
              label="Stage Time"
              value={gigForm.stageTime}
              onChange={(v) => setGigForm({ ...gigForm, stageTime: v })}
            />
            <InputField
              label="Ticket Status"
              value={gigForm.status}
              onChange={(v) => setGigForm({ ...gigForm, status: v })}
            />
            <div className="sm:col-span-2">
              <InputField
                label="Ticket / RSVP Link (https://...)"
                value={gigForm.ticketLink}
                onChange={(v) => setGigForm({ ...gigForm, ticketLink: v })}
              />
            </div>
          </div>
        )}

        {activeSheet === "Discography" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <InputField
              label="Release ID (TMLG-002)"
              value={releaseForm.id}
              onChange={(v) => setReleaseForm({ ...releaseForm, id: v })}
              required
            />
            <InputField
              label="Track Title"
              value={releaseForm.title}
              onChange={(v) => setReleaseForm({ ...releaseForm, title: v })}
              required
            />
            <InputField
              label="Format (Single / EP / Album)"
              value={releaseForm.format}
              onChange={(v) => setReleaseForm({ ...releaseForm, format: v })}
            />
            <InputField
              label="Release Date (YYYY-MM-DD)"
              value={releaseForm.releaseDate}
              onChange={(v) => setReleaseForm({ ...releaseForm, releaseDate: v })}
            />
            <InputField
              label="Duration (04:30)"
              value={releaseForm.duration}
              onChange={(v) => setReleaseForm({ ...releaseForm, duration: v })}
            />
            <InputField
              label="Key & Tempo"
              value={releaseForm.keyTempo}
              onChange={(v) => setReleaseForm({ ...releaseForm, keyTempo: v })}
            />
            <InputField
              label="Producer / Studio"
              value={releaseForm.producer}
              onChange={(v) => setReleaseForm({ ...releaseForm, producer: v })}
            />
            <InputField
              label="Streaming Platform Link"
              value={releaseForm.streamLink}
              onChange={(v) => setReleaseForm({ ...releaseForm, streamLink: v })}
            />
          </div>
        )}

        {activeSheet === "Merch_Store" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <InputField
              label="Item Code (MERCH-01)"
              value={merchForm.code}
              onChange={(v) => setMerchForm({ ...merchForm, code: v })}
              required
            />
            <InputField
              label="Item Name"
              value={merchForm.name}
              onChange={(v) => setMerchForm({ ...merchForm, name: v })}
              required
            /> 
            <InputField
              label="Category"
              value={merchForm.category}
              onChange={(v) => setMerchForm({ ...merchForm, category: v })}
            />
            <InputField
              label="Variant / Specifications"
              value={merchForm.variant}
              onChange={(v) => setMerchForm({ ...merchForm, variant: v })}
            />
            <InputField
              label="Unit Price (angka, misal: 185000)"
              type="number"
              value={merchForm.price}
              onChange={(v) => setMerchForm({ ...merchForm, price: v })}
              required
            />
            <InputField
              label="Stock Qty (angka)"
              type="number"
              value={merchForm.stock}
              onChange={(v) => setMerchForm({ ...merchForm, stock: v })}
              required
            />
            <InputField
              label="Restock Status"
              value={merchForm.restockStatus}
              onChange={(v) => setMerchForm({ ...merchForm, restockStatus: v })}
            />
            <InputField
              label="Webstore Link (opsional)"
              value={merchForm.webstoreLink}
              onChange={(v) => setMerchForm({ ...merchForm, webstoreLink: v })}
            />
            <div className="sm:col-span-2">
              <InputField
                label="Photo URL (link gambar langsung / Google Drive)"
                value={merchForm.photoUrl}
                onChange={(v) => setMerchForm({ ...merchForm, photoUrl: v })}
              />
            </div>
          </div>
        )}

        {activeSheet === "Bio" && (
          <div className="space-y-2.5">
            <InputField
              label="Tagline"
              value={bioForm.tagline}
              onChange={(v) => setBioForm({ ...bioForm, tagline: v })}
              required
            />
            <TextAreaField
              label="Paragraph 1"
              value={bioForm.paragraph1}
              onChange={(v) => setBioForm({ ...bioForm, paragraph1: v })}
              required
            />
            <TextAreaField
              label="Paragraph 2"
              value={bioForm.paragraph2}
              onChange={(v) => setBioForm({ ...bioForm, paragraph2: v })}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <InputField
                label="Booking Email"
                value={bioForm.bookingEmail}
                onChange={(v) => setBioForm({ ...bioForm, bookingEmail: v })}
              />
              <InputField
                label="EPK Drive URL (https://...)"
                value={bioForm.epkDriveUrl}
                onChange={(v) => setBioForm({ ...bioForm, epkDriveUrl: v })}
              />
            </div>
          </div>
        )}

        {status.text && (
          <div
            className={`p-2.5 border flex items-center gap-2 font-bold ${
              status.type === "success"
                ? "bg-emerald-100 border-emerald-700 text-emerald-900"
                : "bg-red-100 border-red-700 text-red-900"
            }`}
          >
            {status.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 shrink-0" />
            )}
            <span>{status.text}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#751a2b] hover:bg-[#912136] disabled:opacity-50 text-white font-bold"
        >
          <Send className="w-3.5 h-3.5" />
          {submitting
            ? "Menyimpan..."
            : activeSheet === "Bio"
            ? "Simpan Perubahan Bio"
            : `Kirim ke ${activeSheet}`}
        </button>
      </form>
    </div>
  );
}

function InputField({ label, value, onChange, type = "text", required = false }) {
  return (
    <label className="block space-y-1">
      <span className="text-[11px] font-bold text-[#2b222d]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-2.5 py-1.5 bg-white border border-[#5c4a5c] text-xs text-[#1c151e] focus:outline-none"
      />
    </label>
  );
}

function TextAreaField({ label, value, onChange, required = false }) {
  return (
    <label className="block space-y-1">
      <span className="text-[11px] font-bold text-[#2b222d]">{label}</span>
      <textarea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className="w-full px-2.5 py-1.5 bg-white border border-[#5c4a5c] text-xs text-[#1c151e] focus:outline-none"
      />
    </label>
  );
}