import { BAND_CONFIG } from "../config/bandConfig";

export async function fetchSheetTab(sheetName) {
  const { spreadsheetId } = BAND_CONFIG.sheets;
  const encodedSheet = encodeURIComponent(sheetName);
  const url = `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?tqx=out:csv&sheet=${encodedSheet}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Gagal memuat tab ${sheetName}`);
  }
  const csvText = await res.text();
  return parseCsvToObjects(csvText);
}

function parseCsvToObjects(csvText) {
  const rows = [];
  let current = "";
  let row = [];
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const next = csvText[i + 1];

    if (char === '"' && inQuotes && next === '"') {
      current += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      row.push(current.trim());
      current = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") i++;
      row.push(current.trim());
      if (row.some((cell) => cell !== "")) rows.push(row);
      row = [];
      current = "";
    } else {
      current += char;
    }
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current.trim());
    if (row.some((cell) => cell !== "")) rows.push(row);
  }

  if (rows.length < 2) return [];

  const headers = rows[0];
  return rows.slice(1).map((values) => {
    const obj = {};
    headers.forEach((header, idx) => {
      obj[header] = values[idx] ?? "";
    });
    return obj;
  });
}
