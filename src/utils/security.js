export function sanitizeUrl(rawUrl) {
  if (!rawUrl || typeof rawUrl !== "string") return "";
  const trimmed = rawUrl.trim();
  if (!trimmed) return "";

  const normalized =
    trimmed.startsWith("http://") || trimmed.startsWith("https://")
      ? trimmed
      : `https://${trimmed}`;

  try {
    const parsed = new URL(normalized);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.href;
    }
    return "";
  } catch {
    return "";
  }
}

export function sanitizeSheetCell(value) {
  if (value === null || value === undefined) return "";
  const str = String(value)
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, 500);

  if (/^[=+\-@]/.test(str)) {
    return `'${str}`;
  }
  return str;
}
