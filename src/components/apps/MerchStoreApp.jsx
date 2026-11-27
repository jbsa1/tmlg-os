import React, { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
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
    return <p className="font-mono text-xs text-[#261e28]">Memuat katalog merch...</p>;
  }

  return (
    <div className="space-y-3">
      {items.length === 0 ? (
        <p className="font-mono text-xs text-center py-6 bg-[#cfc5cf] border border-[#6e5c6e]">
          Katalog merch sedang diperbarui.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((item, idx) => {
            const isOut =
              Number(item["Stock Qty"]) <= 0 ||
              (item["Restock Status"] || "").toLowerCase().includes("sold");
            const safeImg = sanitizeUrl(item["Webstore Link"]);
            const looksLikeImage = /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(safeImg);

            return (
              <div
                key={item["Item Code"] || idx}
                className="p-3 bg-[#cfc5cf] border-2 border-[#5c4a5c] flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                {/* Preview Gambar atau Ilustrasi Kaos TMLG */}
                <div className="w-28 h-28 shrink-0 bg-[#9b8e9c] border border-[#5c4a5c] flex items-center justify-center overflow-hidden">
                  {looksLikeImage ? (
                    <img
                      src={safeImg}
                      alt={item["Item Name"]}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-2">
                      <span className="font-serif font-bold text-sm text-[#751a2b] block">
                        TMLG
                      </span>
                      <span className="font-mono text-[9px] text-[#241c26]">
                        {item["Category"] || "MERCH"}
                      </span>
                    </div>
                  )}
                </div>

                {/* Detail & Tombol Order via WA */}
                <div className="flex-1 text-center sm:text-left space-y-1">
                  <h4 className="font-serif text-base font-bold text-[#1c151e]">
                    {item["Item Name"]}
                  </h4>
                  <p className="font-mono text-xs text-[#3b303c]">
                    {item["Variant / Specifications"]}
                  </p>
                  <p className="font-mono text-xs font-bold text-[#751a2b]">
                    {item["Unit Price"]} • {item["Restock Status"] || "In Stock"}
                  </p>
                </div>

                <div className="shrink-0">
                  {isOut ? (
                    <span className="px-3 py-1.5 bg-stone-500 text-white font-mono text-xs">
                      Sold Out
                    </span>
                  ) : (
                    <a
                      href={buildWhatsappLink(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#4a414c] hover:bg-[#322b33] text-white border border-[#1d1720] font-mono text-xs shadow"
                    >
                      Order via WA
                      <span className="w-4 h-4 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                        <MessageCircle className="w-3 h-3 fill-current" />
                      </span>
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