export function sanitizeUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== "string") return "";
  let trimmed = rawUrl.trim();
  if (!trimmed) return "";

  // Tambahkan https:// otomatis jika user hanya menulis domain (mis. store.tmlg.band/...)
  if (!/^https?:\/\//i.test(trimmed) && !/^mailto:/i.test(trimmed)) {
    trimmed = "https://" + trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    if (["http:", "https:", "mailto:"].includes(parsed.protocol)) {
      return parsed.toString();
    }
  } catch {
    return "";
  }
  return "";
}

export function sanitizeCell(value) {
  if (value === null || value === undefined) return "";
  const str = String(value).trim().slice(0, 1500);
  // Cegah formula injection di spreadsheet (=, +, -, @)
  return /^[=+\-@]/.test(str) ? `'${str}` : str;
}