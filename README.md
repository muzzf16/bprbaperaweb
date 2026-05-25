# BPR Bapera Website

Resmi website BPR Bapera Batang, dibangun dengan Next.js 14 App Router, TypeScript, Tailwind CSS, dan Sanity CMS untuk konten dinamis.

## Ringkasan

- **Framework**: Next.js 14
- **CMS**: Sanity CMS (embedded studio di `/studio`)
- **Styling**: Tailwind CSS
- **Bahasa**: TypeScript
- **Folder utama**: `src/app`, `src/components`, `src/config`, `src/lib`, `src/data`
- **Dokumen produk**: `PRD.md`

## Jalankan Aplikasi

```bash
pnpm install
pnpm dev
```

Buka: `http://localhost:3000`

## Struktur Utama

- `src/app` — App Router routes, halaman publik, API routes, dan embedded Sanity Studio
- `src/components/layout` — `Header`, `Footer`, `PageHeader`
- `src/components/ui` — komponen atom seperti `Button`, `Input`, `Container`, `Section`
- `src/components/features` — fitur khusus seperti `CreditSimulator`, `FormPengaduan`, `TableInterest`
- `src/components/product` — `CardProduct`
- `src/lib` — utilitas, queries Sanity, hook custom
- `src/config` — konfigurasi navigasi, site metadata, kontak
- `src/data` — fallback static content dan seed data
- `src/sanity` — konfigurasi dan schema Sanity

## Halaman Penting

- `/` — Homepage
- `/produk/kredit` — Produk kredit
- `/produk/tabungan` — Produk tabungan
- `/produk/deposito` — Produk deposito
- `/simulasi-kredit` — Credit simulator
- `/artikel-edukasi` — Artikel edukasi
- `/laporan-keuangan` — Laporan keuangan
- `/laporan-gcg` — Laporan GCG
- `/suku-bunga` — Tabel suku bunga
- `/form-pengaduan` — Form pengaduan nasabah
- `/kontak` — Halaman kontak
- `/compliance/privacy-policy` — Kebijakan privasi
- `/compliance/terms-conditions` — Syarat & Ketentuan
- `/compliance/disclaimer` — Disclaimer
- `/studio` — Sanity Studio internal

## Catatan Pengembangan

- Konten utama dikelola melalui Sanity CMS dengan fallback data lokal di `src/data`
- Halaman detail produk kredit tersedia di `/produk/kredit/[slug]`
- Halaman kontak masih menggunakan placeholder Google Maps di frontend
- Dokumen `PRD.md` adalah sumber kebenaran untuk fitur dan status build

## Tips

- Gunakan `pnpm lint` untuk pemeriksaan linting
- Gunakan `pnpm build` untuk memverifikasi build produksi
- Perbarui `PRD.md` ketika ada perubahan fitur atau struktur rute
