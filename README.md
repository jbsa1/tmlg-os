# TMLG_OS v1.0 — The Mary's Lost Gaze

Antarmuka sistem operasi retro interaktif (*Dreamy Gothic OS*) untuk band **The Mary's Lost Gaze**, dibangun dengan React, Vite, dan Tailwind CSS.

## Cara Menjalankan di Lokal

1. Ekstrak folder ini dan masuk ke direktorinya:
   ```bash
   cd tmlg-os
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Salin `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```
4. Jalankan server development:
   ```bash
   npm run dev
   ```

## Cara Deploy ke Netlify

1. Upload seluruh isi folder `tmlg-os` ke repository GitHub (pastikan file `.env` tidak ikut terunggah karena sudah diblokir `.gitignore`), ATAU drag-and-drop folder `dist` setelah menjalankan `npm run build`.
2. Jika deploy lewat GitHub ke Netlify, masukkan variabel berikut di **Site configuration → Environment variables**:
   - `VITE_YOUTUBE_API_KEY`
   - `VITE_YOUTUBE_CHANNEL_ID`
   - `VITE_SPREADSHEET_ID`
   - `VITE_APPS_SCRIPT_URL` (URL `/exec` dari Google Apps Script untuk `Admin_CMS.app`)
3. Klik **Deploy site**.

## Akses Admin CMS
Buka URL `https://domain-netlify-kalian.netlify.app/#/admin` dan masukkan PIN Admin yang dikonfigurasi di Google Apps Script.
