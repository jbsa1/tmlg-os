import React, { useEffect, useState } from "react";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { BAND_CONFIG } from "../../config/bandConfig";
import { fetchSheetTab } from "../../utils/sheetsParser";
import { sanitizeUrl } from "../../utils/security";

export default function MerchStoreApp() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSheetTab("Merch_Store")
      .then(setItems)
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  const buildWhatsappLink = (item) => {
    const message = `Halo admin ${BAND_CONFIG.bandName}, saya mau pesan merch:\n- Item: ${
      item["Item Name"]
    }\n- Varian/Ukuran: ${item["Variant / Specifications"] || "-"}\n- Harga: ${
      item["Unit Price"]
    }\nApakah stoknya masih tersedia?`;

    return `https://wa.me/${BAND_CONFIG.whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
  };

  if (loading) {
    return <p className="font-mono text-xs text-stone-400">Memuat katalog merch...</p>;
  }

  return (
    <div className="space-y-3 font-mono">
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <span className="text-xs text-stone-400 flex items-center gap-1.5">
          <ShoppingBag className="w-3.5 h-3.5 text-[#d4445c]" />
          OFFICIAL MERCHANDISE
        </span>
      </div>

      {items.length === 0 ? (
        <p className="text-xs text-stone-400 py-6 text-center">
          Katalog merch sedang diperbarui.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((item, idx) => {
            const isOut =
              Number(item["Stock Qty"]) <= 0 ||
              (item["Restock Status"] || "").toLowerCase().includes("sold");
            const safeImgOrLink = sanitizeUrl(item["Webstore Link"]);
            const looksLikeImage = /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(
              safeImgOrLink
            );

            return (
              <div
                key={item["Item Code"] || idx}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between gap-3"
              >
                <div className="space-y-1.5">
                  {looksLikeImage && (
                    <img
                      src={safeImgOrLink}
                      alt={item["Item Name"]}
                      className="w-full h-36 object-cover rounded-lg border border-white/10 mb-2"
                    />
                  )}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#7c1d2e]/30 text-[#f28598]">
                      {item["Category"] || "Merch"}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      {item["Restock Status"] || (isOut ? "Sold Out" : "In Stock")}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white">
                    {item["Item Name"]}
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    {item["Variant / Specifications"]}
                  </p>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-stone-100">
                    {item["Unit Price"]}
                  </span>

                  {isOut ? (
                    <span className="px-3 py-1.5 rounded bg-stone-800 text-stone-500 text-xs cursor-not-allowed">
                      Sold Out
                    </span>
                  ) : (
                    <a
                      href={buildWhatsappLink(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-800 hover:bg-emerald-700 text-white text-xs transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> Order via WA
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
