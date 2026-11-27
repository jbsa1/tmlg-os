import Papa from "papaparse";
import { BAND_CONFIG } from "../config/bandConfig";

export async function fetchSheetTab(tabName) {
  const sheetId = BAND_CONFIG.sheets.spreadsheetId;
  if (!sheetId) throw new Error("Spreadsheet ID belum diatur");

  // Tambahkan cache-buster (_t) agar perubahan di Google Sheets lebih cepat terbaca
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
    tabName
  )}&_t=${Math.floor(Date.now() / 60000)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Gagal memuat tab ${tabName}: HTTP ${response.status}`);
  }

  const csvText = await response.text();
  const parsed = Papa.parse(csvText, {
    skipEmptyLines: true,
  });

  const rows = parsed.data || [];
  if (rows.length < 2) return [];

  // Cari baris header (bisa di baris 0 untuk tab Bio, atau baris 3 untuk tab dengan banner judul)
  const knownHeaders = [
    "Release ID",
    "Date",
    "Item Code",
    "Tagline",
    "Track Title",
    "Venue",
    "Item Name",
  ];

  let headerRowIndex = rows.findIndex((r) =>
    r.some((cell) => knownHeaders.includes(String(cell).trim()))
  );

  if (headerRowIndex === -1) {
    headerRowIndex = 0;
  }

  const headers = rows[headerRowIndex].map((h) => String(h).trim());
  const dataRows = rows.slice(headerRowIndex + 1);

  return dataRows
    .map((row) => {
      const obj = {};
      headers.forEach((header, idx) => {
        if (header) {
          obj[header] = row[idx] !== undefined ? String(row[idx]).trim() : "";
        }
      });
      return obj;
    })
    .filter((obj) => {
      const values = Object.values(obj).filter(Boolean);
      // Abaikan baris kosong atau baris "Total" di Merch_Store
      if (values.length === 0) return false;
      if (obj["Item Code"] === "Total") return false;
      return true;
    });
}