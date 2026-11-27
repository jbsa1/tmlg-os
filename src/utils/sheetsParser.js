import { BAND_CONFIG } from "../config/bandConfig";

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ",") {
        row.push(cell);
        cell = "";
      } else if (ch === "\r" && next === "\n") {
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
        i++;
      } else if (ch === "\n" || ch === "\r") {
        row.push(cell);
        rows.push(row);
        row = [];
        cell = "";
      } else {
        cell += ch;
      }
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows.filter((r) => r.some((c) => c.trim() !== ""));
}

export async function fetchSheetTab(tabName) {
  const sheetId = BAND_CONFIG.sheets.spreadsheetId;
  if (!sheetId) throw new Error("Spreadsheet ID belum diatur");

  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(
    tabName
  )}&_t=${Math.floor(Date.now() / 60000)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Gagal memuat tab ${tabName}: HTTP ${response.status}`);
  }

  const csvText = await response.text();
  const rows = parseCsv(csvText);
  if (rows.length < 2) return [];

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
    r.some((c) => knownHeaders.includes(String(c).trim()))
  );

  if (headerRowIndex === -1) {
    headerRowIndex = 0;
  }

  const headers = rows[headerRowIndex].map((h) => String(h).trim());
  const dataRows = rows.slice(headerRowIndex + 1);

  return dataRows
    .map((r) => {
      const obj = {};
      headers.forEach((header, idx) => {
        if (header) {
          obj[header] = r[idx] !== undefined ? String(r[idx]).trim() : "";
        }
      });
      return obj;
    })
    .filter((obj) => {
      const values = Object.values(obj).filter(Boolean);
      if (values.length === 0) return false;
      if (obj["Item Code"] === "Total") return false;
      return true;
    });
}