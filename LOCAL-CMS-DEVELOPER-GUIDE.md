# Local CMS Developer Guide

## Tujuan

Dokumen ini adalah panduan pengembang untuk mengubah sistem CMS saat ini menjadi CMS lokal independen yang profesional, lengkap, dan mirip builder layout Elementor.

CMS lokal ini akan:
- berjalan sepenuhnya tanpa koneksi cloud API eksternal
- menyimpan konten dan konfigurasi di filesystem lokal (`src/data/db/*.json`)
- menyediakan admin panel untuk manajemen konten, halaman, asset, dan layout
- mendukung page builder visual, template, dan reusable blocks
- tetap terintegrasi dengan Next.js App Router

## Ringkasan Kondisi Saat Ini

Proyek sudah memiliki:
- halaman admin: `src/app/admin/page.tsx`
- API admin: `src/app/api/admin/*`
- sistem data file lokal: `src/lib/custom-db.ts`
- fallback data lokal di `src/data/db/`
- beberapa halaman yang sudah membaca data dari backend lokal
- route Sanity Studio yang masih ada di `src/app/(studio)/studio/[[...tool]]/page.tsx`

Untuk pengembangan selanjutnya, fokus utama:
1. membuat CMS lokal sepenuhnya profesional
2. membangun page builder / layout builder
3. memperluas API lokal dan data model
4. mematikan ketergantungan Sanity jika tidak diperlukan

## Sasaran Utama

### CMS Lokal Profesional

- CRUD konten berbasis JSON
- authentication untuk admin
- manajemen aset (gambar/file upload)
- manajemen halaman & template
- drag-and-drop block builder
- preview halaman real-time
- seo metadata
- draft/publish workflow
- history/generate changelog minimal

### Builder Layout

- sekumpulan block/section siap pakai
- layout multi-kolom
- pengaturan desain (warna, spacing, align)
- reusable section/template
- rendering halaman pada frontend

## Arsitektur yang Direkomendasikan

### 1. Data Layer

Simpan semua data CMS di `src/data/db/`:
- `pages.json`
- `templates.json`
- `blocks.json`
- `products.json`
- `articles.json`
- `company.json`
- `reports.json`
- `assets.json`

Buat wrapper akses data di `src/lib/local-cms.ts` (atau ganti `custom-db.ts`):
- read/write file JSON
- validasi schema input
- fallback seed data
- lock sederhana bila perlu

### 2. API Layer

Buat API path untuk setiap domain:
- `src/app/api/cms/pages/route.ts`
- `src/app/api/cms/templates/route.ts`
- `src/app/api/cms/blocks/route.ts`
- `src/app/api/cms/assets/route.ts`
- `src/app/api/cms/settings/route.ts`
- `src/app/api/cms/auth/route.ts`

Fungsi API:
- GET list & detail
- POST create
- PUT update
- DELETE remove
- PATCH publish / draft / restore

### 3. Admin Panel

Refactor admin page menjadi dashboard builder dengan modul:
- `src/components/admin/Sidebar.tsx`
- `src/components/admin/PageList.tsx`
- `src/components/admin/PageEditor.tsx`
- `src/components/admin/BlockLibrary.tsx`
- `src/components/admin/BlockCard.tsx`
- `src/components/admin/SettingsPanel.tsx`
- `src/components/admin/AssetManager.tsx`

Gunakan state management:
- React Context, `zustand`, atau `useReducer`
- `@dnd-kit/core` untuk drag/drop
- preview state dan builder state terpisah

### 4. Rendering Frontend

Frontend page renderer harus membaca halaman dari JSON dan merender section/block.

Buat fungsi render generik di:
- `src/lib/page-renderer.ts`

Block types pertama:
- hero
- text
- image
- feature grid
- product cards
- article cards
- testimonial
- cta
- tabel suku bunga
- laporan list
- form pengaduan

## Model Data yang Disarankan

### `Page` (contoh)

```ts
interface CmsPage {
  id: string;
  slug: string;
  title: string;
  status: "draft" | "published";
  seo: {
    title: string;
    description: string;
    ogImage?: string;
    canonical?: string;
  };
  sections: CmsSection[];
  metadata?: Record<string, any>;
}
```

### `Section`

```ts
interface CmsSection {
  id: string;
  type: string;
  settings: Record<string, any>;
  blocks: CmsBlock[];
}
```

### `Block`

```ts
interface CmsBlock {
  id: string;
  type: string;
  props: Record<string, any>;
}
```

### `Asset`

```ts
interface CmsAsset {
  id: string;
  type: "image" | "file";
  path: string;
  name: string;
  uploadedAt: string;
}
```

## Roadmap Pengembangan

### Fase 1 — CMS Lokal Stabil

1. Perkuat `src/lib/custom-db.ts` menjadi wrapper CMS lengkap.
2. Tambah validasi baik di API maupun admin.
3. Buat `pages.json`, `templates.json`, `assets.json` di `src/data/db/`.
4. Tambah endpoint `api/cms/pages` dan `api/cms/assets`.
5. Perbarui frontend untuk membaca page data dari JSON lokal.

### Fase 2 — Builder Layout Dasar

1. Rancang `Page Editor` dengan canvas drop zone.
2. Implementasikan block library dasar.
3. Tambahkan drag/drop melalui `@dnd-kit/core`.
4. Tambahkan panel settings untuk properti block.
5. Implementasikan preview halaman.

### Fase 3 — Fitur CMS Profesional

1. Reusable templates / section library.
2. Asset manager lokal dengan upload.
3. Draft/publish workflow.
4. SEO metadata editor.
5. Undo/redo & history.
6. User auth + role minimal.

### Fase 4 — Refinement & Dokumentasi

1. Dokumentasi developer dan user.
2. Testing end-to-end.
3. Optimasi perf dan UX.
4. Siapkan deploy ke server self-hosted atau VPS.

## Daftar File Pengembangan

### Data & Model
- `src/data/db/pages.json`
- `src/data/db/templates.json`
- `src/data/db/assets.json`
- `src/data/db/products.json`
- `src/data/db/articles.json`
- `src/lib/local-cms.ts`
- `src/types/cms.types.ts`

### API
- `src/app/api/cms/auth/route.ts`
- `src/app/api/cms/pages/route.ts`
- `src/app/api/cms/templates/route.ts`
- `src/app/api/cms/blocks/route.ts`
- `src/app/api/cms/assets/route.ts`
- `src/app/api/cms/settings/route.ts`

### Admin UI
- `src/app/admin/page.tsx`
- `src/components/admin/Sidebar.tsx`
- `src/components/admin/PageEditor.tsx`
- `src/components/admin/BlockLibrary.tsx`
- `src/components/admin/AssetManager.tsx`
- `src/components/admin/PagePreview.tsx`

### Rendering
- `src/lib/page-renderer.ts`
- `src/lib/block-renderers/*`

## Implementasi Awal yang Disarankan

### 1. Buat tipe data CMS

Buat `src/types/cms.types.ts` dengan model page, section, block, asset, template.

### 2. Tambahkan API CMS

Buat endpoint API dasar untuk `pages` dan `assets` terlebih dahulu.

### 3. Perluas admin dengan builder sederhana

Buat layout admin:
- list halaman
- buat halaman baru
- edit page sections
- tambah block
- simpan ke JSON

### 4. Buat page renderer generik

Buat helper agar frontend bisa merender page dari JSON.

### 5. Migrasi konten dari Sanity

Simpan semua data produk dan artikel ke JSON lokal. Ubah source code yang masih memanggil `sanity-queries` menjadi baca dari `local-cms`.

## Catatan Deployment

- CMS lokal membutuhkan write access ke filesystem.
- Hindari deploy ke platform static-only tanpa filesystem (Vercel serverless live write tidak cocok).
- Gunakan server Node.js / Docker dengan mount folder `src/data/db/`.

## Best Practices

- Gunakan schema type untuk semua payload API
- Jaga struktur data tetap backward-compatible
- Pisahkan logic builder dari preview renderer
- Selalu simpan data ke JSON yang gampang dibaca manusia
- Jangan gunakan `any` kecuali perlu

## Langkah Berikutnya

1. Buat dokumentasi ini di repo sebagai referensi.
2. Mulai dengan `src/types/cms.types.ts` dan `src/lib/local-cms.ts`.
3. Kembangkan API CMS lokal minimal.
4. Refactor admin page ke builder modular.
5. Tutup semua ketergantungan ke Sanity jika target benar-benar independen.
