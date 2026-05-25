# Product Requirements Document (PRD)
# Website Resmi BPR Bapera Batang

---

| Informasi Dokumen | Detail |
|---|---|
| **Nama Proyek** | BPR Bapera Website |
| **Versi** | 1.0 |
| **Tanggal** | 24 Mei 2026 |
| **Status** | In Development |
| **URL Produksi** | https://bprbaperabatang.com |
| **Repository** | bprbaperaweb |

---

## Daftar Isi

1. [Ringkasan Eksekutif](#1-ringkasan-eksekutif)
2. [Tujuan & Sasaran](#2-tujuan--sasaran)
3. [Target Pengguna](#3-target-pengguna)
4. [Tech Stack & Arsitektur](#4-tech-stack--arsitektur)
5. [Sitemap & Struktur Halaman](#5-sitemap--struktur-halaman)
6. [Spesifikasi Fitur](#6-spesifikasi-fitur)
7. [Komponen Sistem](#7-komponen-sistem)
8. [Data Layer & CMS](#8-data-layer--cms)
9. [Persyaratan Non-Fungsional](#9-persyaratan-non-fungsional)
10. [Kepatuhan Regulasi (Compliance)](#10-kepatuhan-regulasi-compliance)
11. [Konvensi Pengembangan](#11-konvensi-pengembangan)
12. [Roadmap & Prioritas](#12-roadmap--prioritas)
13. [Kriteria Acceptance](#13-kriteria-acceptance)
14. [Lampiran](#14-lampiran)

---

## 1. Ringkasan Eksekutif

Website BPR Bapera Batang adalah platform digital resmi **Bank Perkreditan Rakyat Bapera** yang berlokasi di Jl. Jend. Sudirman No.72, Batang, Jawa Tengah. Website ini berfungsi sebagai:

- **Kanal informasi produk** perbankan (Kredit, Tabungan, Deposito)
- **Alat simulasi kredit** interaktif untuk calon nasabah
- **Portal transparansi** laporan keuangan dan tata kelola (GCG)
- **Sarana edukasi keuangan** melalui artikel literasi
- **Kanal komunikasi** dan pengaduan nasabah

Website dibangun dengan pendekatan **server-side rendering (SSR)** menggunakan Next.js 14 App Router, terintegrasi dengan **Sanity CMS** untuk manajemen konten dinamis, dan mematuhi regulasi **OJK** serta penjaminan **LPS**.

---

## 2. Tujuan & Sasaran

### 2.1 Tujuan Bisnis

| # | Tujuan | Metrik Keberhasilan |
|---|---|---|
| 1 | Meningkatkan visibilitas digital BPR Bapera | Peningkatan traffic organik 50% dalam 6 bulan |
| 2 | Mempermudah akses informasi produk perbankan | Bounce rate < 40% pada halaman produk |
| 3 | Meningkatkan lead nasabah baru | Minimal 20 leads/bulan melalui form kontak & simulasi |
| 4 | Memenuhi kewajiban transparansi OJK | 100% dokumen wajib tersedia dan up-to-date |
| 5 | Edukasi literasi keuangan masyarakat | Minimal 3 artikel edukasi baru per bulan |

### 2.2 Tujuan Teknis

- **Performance**: Lighthouse score ≥ 90 untuk semua kategori
- **Aksesibilitas**: WCAG 2.1 Level AA compliance
- **SEO**: Ranking halaman 1 Google untuk keyword lokal "BPR Batang"
- **Uptime**: 99.5% availability

---

## 3. Target Pengguna

### 3.1 Persona Utama

#### Persona 1: Pelaku UMKM (Primer)
- **Demografi**: Pria/Wanita, 25-55 tahun, pedagang pasar/pemilik warung di Batang
- **Kebutuhan**: Modal usaha cepat cair, syarat ringan, angsuran fleksibel
- **Perilaku digital**: Menggunakan smartphone, familiar WhatsApp, browsing via Chrome
- **Pain point**: Proses kredit bank umum yang berbelit

#### Persona 2: Karyawan/Profesional (Sekunder)
- **Demografi**: Pria/Wanita, 25-45 tahun, karyawan swasta/PNS
- **Kebutuhan**: Kredit konsumtif (renovasi, pendidikan), tabungan aman
- **Perilaku digital**: Membandingkan produk online sebelum datang ke kantor
- **Pain point**: Kurang informasi suku bunga dan syarat produk BPR

#### Persona 3: Investor Deposito
- **Demografi**: Pria/Wanita, 35-65 tahun, memiliki dana idle
- **Kebutuhan**: Imbal hasil lebih tinggi dari bank umum, dijamin LPS
- **Perilaku digital**: Mencari perbandingan suku bunga deposito
- **Pain point**: Keraguan keamanan dana di BPR

#### Persona 4: Regulator & Auditor (Internal)
- **Demografi**: Tim OJK, auditor, komisaris
- **Kebutuhan**: Akses laporan keuangan, GCG, dan informasi kepatuhan
- **Perilaku digital**: Mengakses dokumen resmi secara berkala

---

## 4. Tech Stack & Arsitektur

### 4.1 Technology Stack

| Layer | Teknologi | Versi | Keterangan |
|---|---|---|---|
| **Framework** | Next.js (App Router) | 14.2.x | SSR & SSG support |
| **Runtime** | React | 18.x | Server & Client Components |
| **Language** | TypeScript | 5.x | Strict mode enabled |
| **Styling** | Tailwind CSS | 3.4.x | Utility-first CSS |
| **CMS** | Sanity | 3.68.x | Headless CMS dengan Studio terintegrasi |
| **Animasi** | Framer Motion | 12.x | Micro-animations & transitions |
| **Icons** | Lucide React | 0.556.x | Konsisten icon set |
| **Class Utils** | clsx + tailwind-merge | latest | Dynamic class composition |
| **Font** | Inter (Google Fonts) | — | Via `next/font` auto-optimization |

### 4.2 Arsitektur Direktori

```
src/
├── app/                        # Next.js App Router (Pages & Routing)
│   ├── layout.tsx              # Root layout (Header + Footer wrapper)
│   ├── page.tsx                # Homepage
│   ├── robots.ts               # SEO robots config
│   ├── sitemap.ts              # Dynamic sitemap generation
│   ├── api/                    # API routes
│   ├── studio/                 # Sanity Studio (embedded)
│   ├── produk/                 # Product pages
│   │   ├── kredit/             # Credit products listing
│   │   ├── tabungan/           # Savings products listing
│   │   └── deposito/           # Deposit products listing
│   ├── simulasi-kredit/        # Credit simulator
│   ├── tentang-kami/           # About us
│   ├── komisaris-direksi/      # Board of Directors
│   ├── kontak/                 # Contact page
│   ├── artikel-edukasi/        # Educational articles
│   │   └── [slug]/             # Dynamic article detail
│   ├── laporan-keuangan/       # Financial reports
│   ├── laporan-gcg/            # GCG reports
│   ├── suku-bunga/             # Interest rates table
│   ├── compliance/             # Compliance pages
│   │   ├── privacy-policy/
│   │   ├── terms-conditions/
│   │   └── disclaimer/
│   ├── form-pengaduan/         # Complaint form
│   ├── admin/                  # Internal admin page
│   └── (studio)/               # Embedded Sanity Studio
│
├── components/
│   ├── layout/                 # Header, Footer, PageHeader
│   ├── ui/                     # Button, Input, Container, Section
│   ├── features/               # CreditSimulator, FormPengaduan, TableInterest
│   ├── product/                # CardProduct
│   └── compliance/             # LPSBadge, OJKBadge
│
├── config/                     # Centralized configuration
│   ├── site.config.ts          # Site metadata & SEO
│   ├── navigation.config.ts    # Nav links, footer links, quick links
│   └── contact.config.ts       # Contact info & office locations
│
├── data/                       # Static data content (fallback)
│   ├── products.data.ts        # Credit products
│   ├── savings-deposits.data.ts # Savings & deposit products
│   └── articles.data.ts        # Educational articles
│
├── lib/                        # Utilities & integrations
│   ├── utils.ts                # cn(), formatCurrency(), calculateInstallment()
│   ├── sanity.ts               # Sanity client instance
│   ├── sanity-queries.ts       # GROQ queries for products & articles
│   ├── analytics.ts            # Analytics utilities
│   ├── api-utils.ts            # API helper functions
│   ├── constants.ts            # App-wide constants
│   ├── data.ts                 # Data re-exports
│   └── hooks/                  # Custom React hooks
│       ├── useForm.ts          # Form validation hook
│       ├── useMediaQuery.ts    # Responsive breakpoint hook
│       └── useScrollPosition.ts # Scroll tracking hook
│
├── sanity/                     # Sanity CMS configuration
│   ├── env.ts                  # Environment variables
│   └── schemaTypes/            # Content schemas
│       ├── product.ts          # Product schema (kredit/tabungan/deposito)
│       └── article.ts          # Article schema (edukasi/berita/promo)
│
├── types/                      # TypeScript definitions
│   ├── product.types.ts        # Product, ProductCategory, ProductFilter
│   ├── article.types.ts        # Article, ArticleCategory, ArticleFilter
│   ├── common.types.ts         # NavLink, ContactInfo, ApiResponse, Pagination
│   └── component.types.ts      # BreadcrumbItem, PageHeaderProps, ButtonProps, etc.
│
└── styles/
    └── globals.css             # Global styles & Tailwind imports
```

### 4.3 Keputusan Arsitektur Kunci

1. **Data Layer Separation** — Data statis (`src/data/`) terpisah dari logic, memungkinkan update konten tanpa ubah kode. Sanity CMS menjadi primary source; data statis sebagai fallback.
2. **Centralized Configuration** — Single source of truth di `src/config/` untuk navigasi, kontak, dan metadata site.
3. **Type Safety** — TypeScript strict mode + JSDoc comments untuk self-documenting code.
4. **Component Hierarchy** — Mengikuti Atomic Design: UI (atoms) → Product (molecules) → Features (organisms) → Layout (templates).
5. **Hybrid Data Sourcing** — Server Components fetch dari Sanity CMS; halaman statis menggunakan `src/data/` sebagai fallback.

---

## 5. Sitemap & Struktur Halaman

### 5.1 Sitemap Visual

```
🏠 Beranda (/)
│
├── 📋 Tentang Kami (/tentang-kami)
│   └── Komisaris & Direksi (/komisaris-direksi)
│
├── 💳 Produk (/produk/*)
│   ├── Kredit (/produk/kredit)
│   │   ├── Kredit Modal Kerja (/produk/kredit/kredit-modal-kerja)
│   │   ├── Kredit Konsumtif (/produk/kredit/kredit-konsumtif)
│   │   └── Kredit Mikro UMKM (/produk/kredit/kredit-umkm)
│   ├── Tabungan (/produk/tabungan)
│   └── Deposito (/produk/deposito)
│
├── 🧮 Simulasi Kredit (/simulasi-kredit)
│
├── 📰 Artikel Edukasi (/artikel-edukasi)
│   └── Detail Artikel (/artikel-edukasi/[slug])
│
├── 📊 Informasi Publik
│   ├── Suku Bunga (/suku-bunga)
│   ├── Laporan Keuangan (/laporan-keuangan)
│   └── Laporan GCG (/laporan-gcg)
│
├── 📞 Kontak (/kontak)
│
├── ⚖️ Legal & Compliance
│   ├── Kebijakan Privasi (/compliance/privacy-policy)
│   ├── Syarat & Ketentuan (/compliance/terms-conditions)
│   ├── Disclaimer (/compliance/disclaimer)
│   └── Form Pengaduan (/form-pengaduan)
│
└── 🔧 Sanity Studio (/studio) [Internal Admin]
```

### 5.2 Navigasi

#### Header Navigation (Main)
| Menu | Path | Tipe |
|---|---|---|
| Beranda | `/` | Link |
| Tentang Kami | `/tentang-kami` | Link |
| Produk | — | Dropdown |
| ↳ Kredit | `/produk/kredit` | Sub-link |
| ↳ Tabungan | `/produk/tabungan` | Sub-link |
| ↳ Deposito | `/produk/deposito` | Sub-link |
| Simulasi Kredit | `/simulasi-kredit` | Link |
| Laporan | `/laporan-keuangan` | Link |
| Kontak | `/kontak` | Link |

#### Footer Navigation
- **Perusahaan**: Tentang Kami, Visi & Misi, Struktur Organisasi, Komisaris & Direksi
- **Produk**: Kredit Modal Kerja, Kredit Konsumtif, Tabungan Bapera, Deposito Berjangka
- **Informasi**: Suku Bunga, Laporan Keuangan, Laporan GCG
- **Legal**: Kebijakan Privasi, Syarat & Ketentuan, Disclaimer, Form Pengaduan

---

## 6. Spesifikasi Fitur

### 6.1 F-01: Homepage (Beranda)

**Path**: `/`
**Prioritas**: 🔴 Critical

| Seksi | Deskripsi | Status |
|---|---|---|
| **Hero Section** | Background image dengan overlay, heading utama, tagline, 2 CTA button (Ajukan Kredit + Buka Tabungan) | ✅ Implementasi |
| **Keunggulan** | 3 card: Aman & Terdaftar (OJK/LPS), Bunga Kompetitif, Proses Cepat | ✅ Implementasi |
| **Produk Unggulan** | 3 CardProduct: Kredit Modal Kerja, Tabungan, Deposito | ✅ Implementasi |
| **CTA Section** | Background biru gelap dengan pattern, heading + tombol "Hubungi Kami" | ✅ Implementasi |
| **Artikel Edukasi** | Seksi artikel edukasi sudah hadir dan menampilkan tiga posting terbaru | ✅ Implementasi |
| **Testimoni** | Seksi testimoni nasabah sudah hadir di homepage | ✅ Implementasi |

**Acceptance Criteria**:
- [ ] Hero section responsive di mobile, tablet, desktop
- [ ] CTA button navigasi ke halaman yang benar
- [ ] Product cards menampilkan icon, judul, deskripsi, dan link
- [ ] Lazy loading untuk gambar hero
- [ ] LCP (Largest Contentful Paint) < 2.5s

---

### 6.2 F-02: Halaman Produk Kredit

**Path**: `/produk/kredit`
**Prioritas**: 🔴 Critical

**Produk yang ditampilkan** (dari Sanity CMS):

| Produk | Suku Bunga | Tenor | Plafon |
|---|---|---|---|
| Kredit Modal Kerja | 1.25% flat/bulan | 6 – 36 bulan | s.d. Rp 500 juta |
| Kredit Konsumtif | 1.5% flat/bulan | 12 – 60 bulan | Sesuai kemampuan |
| Kredit Mikro UMKM | 1.0% flat/bulan | 3 – 24 bulan | Sesuai kebutuhan |

**Fitur halaman**:
- PageHeader dengan breadcrumb
- Daftar produk dari Sanity CMS (async Server Component)
- Empty state handling ketika belum ada data di CMS
- Tiap produk menampilkan: icon, judul, deskripsi singkat, fitur (max 4), link detail
- Layout alternating (odd-even card direction)
- CTA section "Bingung Memilih Produk?" dengan link ke kontak

**Acceptance Criteria**:
- [ ] Data di-fetch dari Sanity CMS secara real-time (SSR)
- [ ] Fallback ke empty state yang informatif jika CMS kosong
- [ ] Setiap produk memiliki link ke halaman detail `/produk/kredit/[slug]`
- [ ] Metadata SEO ter-set (title, description)

---

### 6.3 F-03: Halaman Produk Tabungan

**Path**: `/produk/tabungan`
**Prioritas**: 🔴 Critical

**Produk yang ditampilkan**:

| Produk | Suku Bunga | Setoran Awal |
|---|---|---|
| Tabungan Bapera | 2.5% p.a | Rp 50.000 |
| Simpanan Pelajar | 2.0% p.a | Rp 10.000 |

**Fitur halaman**:
- Data dari Sanity CMS
- Menampilkan fitur, suku bunga, dan persyaratan
- CTA "Ingin Buka Tabungan?" dengan link ke kontak

---

### 6.4 F-04: Halaman Produk Deposito

**Path**: `/produk/deposito`
**Prioritas**: 🔴 Critical

**Produk yang ditampilkan**:

| Produk | Suku Bunga | Tenor | Min. Penempatan |
|---|---|---|---|
| Deposito Berjangka | s.d. 6.75% p.a | 1, 3, 6, 12 bulan | Rp 5.000.000 |

**Fitur utama**: Bunga tinggi, pilihan jangka waktu, bisa dijadikan jaminan kredit (Back to Back), dijamin LPS.

---

### 6.5 F-05: Simulasi Kredit

**Path**: `/simulasi-kredit`
**Prioritas**: 🔴 Critical

**Deskripsi**: Kalkulator interaktif untuk menghitung estimasi angsuran kredit.

**Input fields**:
| Field | Tipe | Validasi |
|---|---|---|
| Jumlah Pinjaman | Number input | Min Rp 1.000.000, Max Rp 500.000.000 |
| Jangka Waktu (Bulan) | Number/Slider | Min 3, Max 60 bulan |
| Suku Bunga (% / tahun) | Number input | Default sesuai produk |
| Metode Bunga | Select | Flat / Efektif (Anuitas) |

**Output (SimulationResult)**:
| Field | Format |
|---|---|
| Angsuran per Bulan | `formatCurrency()` → "Rp X.XXX.XXX" |
| Total Pembayaran | `formatCurrency()` |
| Total Bunga | `formatCurrency()` |

**Perhitungan** (dari `src/lib/utils.ts`):
- **Flat**: `totalInterest = principal × (rate/100) × (tenor/12)` → angsuran = `(principal + interest) / tenor`
- **Anuitas/Efektif**: `angsuran = P × [i(1+i)^n] / [(1+i)^n - 1]` dimana `i = rate/100/12`

**Acceptance Criteria**:
- [ ] Real-time calculation tanpa submit button
- [ ] Format mata uang Indonesia (Rp dengan titik pemisah ribuan)
- [ ] Validasi input dengan feedback visual
- [ ] Mobile-friendly interface
- [ ] Disclaimer: "Hasil simulasi bersifat estimasi"

---

### 6.6 F-06: Tabel Suku Bunga

**Path**: `/suku-bunga`
**Prioritas**: 🟡 High

**Komponen**: `TableInterest` (`src/components/features/TableInterest.tsx`)

**Data yang ditampilkan**:
- Suku bunga kredit per produk
- Suku bunga tabungan
- Suku bunga deposito per tenor
- Tanggal berlaku

---

### 6.7 F-07: Artikel Edukasi

**Path**: `/artikel-edukasi` dan `/artikel-edukasi/[slug]`
**Prioritas**: 🟡 High

**Sumber data**: Sanity CMS (schema `article`)

**Kategori artikel**:
- Edukasi Keuangan
- Berita
- Promo

**Fitur listing page**:
- Grid/list view artikel
- Filter berdasarkan kategori
- Gambar thumbnail, judul, excerpt, tanggal, kategori
- Sorted by publishedAt descending

**Fitur detail page**:
- Rich text content (Sanity Portable Text)
- Gambar in-article
- Informasi author
- Breadcrumb navigation
- Share buttons (optional future)

**Acceptance Criteria**:
- [ ] Artikel di-manage sepenuhnya dari Sanity Studio
- [ ] Slug auto-generated dari judul
- [ ] Gambar optimized via `next/image`
- [ ] SEO metadata per artikel (title, description, og:image)

---

### 6.8 F-08: Form Pengaduan Nasabah

**Path**: `/form-pengaduan`
**Prioritas**: 🔴 Critical (Wajib OJK)

**Komponen**: `FormPengaduan` (`src/components/features/FormPengaduan.tsx`)

**Input fields**:
| Field | Tipe | Required |
|---|---|---|
| Nama Lengkap | Text | ✅ |
| No. KTP/NIK | Text | ✅ |
| Email | Email | ✅ |
| No. Telepon | Tel | ✅ |
| Jenis Pengaduan | Select | ✅ |
| Deskripsi Pengaduan | Textarea | ✅ |
| Bukti Pendukung | File Upload | ❌ |

**Validasi** (menggunakan `useForm` hook):
- Email: regex validation via `isValidEmail()`
- Phone: Indonesian format via `isValidPhoneNumber()`
- Required fields validation
- Error message per field

**Acceptance Criteria**:
- [ ] Form validation real-time
- [ ] Tombol submit disabled saat form invalid
- [ ] Konfirmasi sukses setelah submit
- [ ] Data terkirim ke endpoint API atau email
- [ ] Sesuai POJK tentang mekanisme pengaduan nasabah

---

### 6.9 F-09: Halaman Profil Perusahaan

| Path | Konten | Status |
|---|---|---|
| `/tentang-kami` | Sejarah, profil singkat BPR Bapera | ✅ Implementasi |
| `/komisaris-direksi` | Profil komisaris dan direksi | ✅ Implementasi |
| `/visi-misi` | Visi, misi, dan nilai-nilai perusahaan | 🟡 Planned |
| `/struktur-organisasi` | Bagan organisasi | 🟡 Planned |

**Prioritas**: 🟡 High

---

### 6.10 F-10: Halaman Kontak

**Path**: `/kontak`
**Prioritas**: 🔴 Critical

**Informasi yang ditampilkan** (dari `contact.config.ts`):

| Data | Value |
|---|---|
| Alamat | Jl. Jend. Sudirman No.72, Batang, Jawa Tengah |
| Telepon | (0285) 392078 |
| Email | bprbapera_btg@yahoo.co.id |
| WhatsApp | 6281234567890 |
| Jam Kerja | Senin-Jumat 08:00-16:00, Sabtu 08:00-12:00 |

**Fitur**:
- Informasi kontak lengkap
- Peta lokasi (Google Maps embed placeholder)
- Form kontak cepat
- Link WhatsApp langsung
- Departemen kontak (CS, Kredit, Compliance, Pengaduan)

---

### 6.11 F-11: Laporan & Transparansi

| Path | Konten | Prioritas |
|---|---|---|
| `/laporan-keuangan` | Download laporan keuangan berkala | 🔴 Critical |
| `/laporan-gcg` | Laporan Good Corporate Governance | 🔴 Critical |
| `/gcg` | Tata kelola perusahaan | 🟡 Planned |
| `/informasi-risiko` | Informasi profil risiko | 🟡 Planned |

**Format**: PDF downloadable, tabel ringkasan online.

---

### 6.12 F-12: Compliance & Legal

| Path | Konten |
|---|---|
| `/compliance/privacy-policy` | Privacy policy |
| `/compliance/terms-conditions` | Syarat & ketentuan |
| `/compliance/disclaimer` | Disclaimer |

**Komponen pendukung**:
- `OJKBadge` — Badge/logo terdaftar OJK (KEP-XXX/OJK/2020)
- `LPSBadge` — Badge penjaminan LPS (maks. Rp 2 Miliar)

---

## 7. Komponen Sistem

### 7.1 Layout Components

| Komponen | File | Deskripsi |
|---|---|---|
| `Header` | `components/layout/Header.tsx` | Navigasi utama, responsive hamburger menu, dropdown produk |
| `Footer` | `components/layout/Footer.tsx` | 4-kolom footer links, info kontak, social media, badge OJK/LPS |
| `PageHeader` | `components/layout/PageHeader.tsx` | Reusable page header dengan title, description, breadcrumb |

### 7.2 UI Components (Atomic/Reusable)

| Komponen | File | Props Utama |
|---|---|---|
| `Button` | `components/ui/Button.tsx` | variant, size, disabled, onClick |
| `Input` | `components/ui/Input.tsx` | label, error, type, placeholder |
| `Container` | `components/ui/Container.tsx` | children, className |
| `Section` | `components/ui/Section.tsx` | children, className, bgColor |

### 7.3 Feature Components

| Komponen | File | Deskripsi |
|---|---|---|
| `CreditSimulator` | `components/features/CreditSimulator.tsx` | Kalkulator angsuran kredit interaktif |
| `FormPengaduan` | `components/features/FormPengaduan.tsx` | Form pengaduan nasabah dengan validasi |
| `TableInterest` | `components/features/TableInterest.tsx` | Tabel suku bunga produk |

### 7.4 Domain Components

| Komponen | File | Deskripsi |
|---|---|---|
| `CardProduct` | `components/product/CardProduct.tsx` | Card display produk dengan icon, title, description, link |
| `OJKBadge` | `components/compliance/OJKBadge.tsx` | Badge/logo registrasi OJK |
| `LPSBadge` | `components/compliance/LPSBadge.tsx` | Badge penjaminan LPS |

### 7.5 Custom Hooks

| Hook | File | Fungsi |
|---|---|---|
| `useForm` | `lib/hooks/useForm.ts` | Form state management, validation, error handling |
| `useMediaQuery` | `lib/hooks/useMediaQuery.ts` | Responsive breakpoint detection |
| `useScrollPosition` | `lib/hooks/useScrollPosition.ts` | Scroll position tracking (untuk sticky header, dsb) |

### 7.6 Utility Functions

| Function | Deskripsi |
|---|---|
| `cn()` | Merge Tailwind classes (clsx + tailwind-merge) |
| `formatCurrency(amount, showPrefix?)` | Format ke "Rp 1.000.000" |
| `formatDate(date, format)` | Format tanggal Indonesia (short/long/numeric) |
| `slugify(text)` | Convert string ke URL slug |
| `truncate(text, maxLength)` | Truncate dengan ellipsis |
| `debounce(func, delay)` | Debounce function execution |
| `calculateInstallment(...)` | Hitung angsuran flat/anuitas |
| `calculateFlatInterest(...)` | Simulasi bunga flat → SimulationResult |
| `calculateEffectiveInterest(...)` | Simulasi bunga efektif → SimulationResult |
| `isValidPhoneNumber(phone)` | Validasi format nomor HP Indonesia |
| `isValidEmail(email)` | Validasi format email |

---

## 8. Data Layer & CMS

### 8.1 Sanity CMS Configuration

| Config | Value |
|---|---|
| Studio Path | `/studio` (embedded di Next.js) |
| API Version | Configured via `src/sanity/env.ts` |
| Dataset | Configured via environment variable |

### 8.2 Content Schemas

#### Schema: `product`
```
Fields:
  - title (string) — Nama Produk
  - slug (slug, source: title) — URL slug
  - category (string, list: kredit/tabungan/deposito)
  - shortDescription (text, 3 rows)
  - description (array of blocks) — Rich text
  - interestRate (string) — e.g., "0.75% flat / bulan"
  - features (array of string) — Keunggulan
  - requirements (array of string) — Syarat & Ketentuan
  - icon (string) — Lucide icon name
```

#### Schema: `article`
```
Fields:
  - title (string) — Judul Artikel
  - slug (slug, source: title)
  - author (string, default: "BPR Bapera Team")
  - mainImage (image, hotspot)
  - category (string, list: Edukasi Keuangan/Berita/Promo)
  - publishedAt (datetime)
  - excerpt (text, 4 rows)
  - body (array of blocks + images) — Rich text content
```

### 8.3 GROQ Queries

| Query | Function | Deskripsi |
|---|---|---|
| Products by category | `getProductsByCategory(category)` | Ambil semua produk per kategori |
| Product by slug | `getProductBySlug(slug)` | Ambil detail produk tunggal |
| All articles | `getArticles()` | Ambil semua artikel (sorted by date) |
| Article by slug | `getArticleBySlug(slug)` | Ambil detail artikel + author |

### 8.4 Static Data Fallback

Data statis di `src/data/` berfungsi sebagai:
- **Fallback** jika Sanity CMS tidak tersedia
- **Seed data** untuk development
- **Reference** untuk struktur data yang expected

---

## 9. Persyaratan Non-Fungsional

### 9.1 Performance

| Metrik | Target | Tool Pengukuran |
|---|---|---|
| Lighthouse Performance | ≥ 90 | Chrome DevTools |
| LCP (Largest Contentful Paint) | < 2.5s | Web Vitals |
| FID (First Input Delay) | < 100ms | Web Vitals |
| CLS (Cumulative Layout Shift) | < 0.1 | Web Vitals |
| TTI (Time to Interactive) | < 3.5s | Lighthouse |
| Bundle Size (First Load JS) | < 100KB | Next.js build output |

### 9.2 SEO

- ✅ Dynamic `<title>` dan `<meta description>` per halaman
- ✅ Open Graph metadata (og:type, og:locale, og:image)
- ✅ Twitter Card metadata
- ✅ Automatic `robots.ts` generation
- ✅ Dynamic `sitemap.ts` generation
- ✅ Structured data / JSON-LD (recommended to add)
- ✅ `<html lang="id">` untuk bahasa Indonesia
- ✅ Semantic HTML5 elements
- [ ] Canonical URLs
- [ ] Schema.org LocalBusiness markup

### 9.3 Responsivitas

| Breakpoint | Range | Target Device |
|---|---|---|
| Mobile | < 768px | Smartphone |
| Tablet | 768px – 1024px | iPad/Tablet |
| Desktop | > 1024px | Laptop/Desktop |

### 9.4 Browser Support

| Browser | Versi Minimum |
|---|---|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |
| Samsung Internet | 14+ |

### 9.5 Aksesibilitas

- Keyboard navigation pada semua interactive elements
- ARIA labels pada icon buttons dan form elements
- Sufficient color contrast ratio (WCAG AA: 4.5:1)
- Focus visible indicators
- Alt text pada semua gambar
- Skip-to-content link

### 9.6 Security

- HTTPS enforced
- Input sanitization pada semua form
- CSP (Content Security Policy) headers
- Rate limiting pada API routes
- XSS prevention (React default escaping)
- CORS configuration untuk Sanity API

---

## 10. Kepatuhan Regulasi (Compliance)

### 10.1 Kewajiban OJK (Otoritas Jasa Keuangan)

| Kewajiban | Halaman Terkait | Status |
|---|---|---|
| Publikasi laporan keuangan | `/laporan-keuangan` | ✅ Ada |
| Informasi produk & layanan lengkap | `/produk/*` | ✅ Ada |
| Transparansi suku bunga | `/suku-bunga` | ✅ Ada |
| Mekanisme pengaduan nasabah | `/form-pengaduan` | ✅ Ada |
| Informasi GCG | `/laporan-gcg` | ✅ Ada |
| Informasi profil risiko | `/informasi-risiko` | 🟡 Planned |
| Nomor registrasi OJK visible | `OJKBadge` di footer | ✅ Ada |
| Kebijakan privasi | `/compliance/privacy-policy` | ✅ Ada |
| Syarat & ketentuan layanan | `/compliance/terms-conditions` | ✅ Ada |

### 10.2 LPS (Lembaga Penjamin Simpanan)

| Kewajiban | Implementasi | Status |
|---|---|---|
| Informasi status penjaminan | `LPSBadge` di footer | ✅ Ada |
| Batas penjaminan | Maks. Rp 2.000.000.000 | ✅ Configured |
| Syarat penjaminan | Dalam konten halaman deposito | 🟡 Perlu review |

### 10.3 Badge Compliance yang Wajib Ditampilkan

1. **Logo OJK** — "Berizin dan Diawasi oleh Otoritas Jasa Keuangan"
2. **Logo LPS** — "Simpanan Dijamin oleh Lembaga Penjamin Simpanan"
3. **Nomor Registrasi** — KEP-XXX/OJK/2020 (harus diupdate dengan nomor aktual)

---

## 11. Konvensi Pengembangan

### 11.1 Coding Standards

```
1. Selalu gunakan type definitions dari `@/types`
2. Import data dari `@/data` (fallback) atau `@/lib/sanity-queries` (primary)
3. Gunakan reusable components dari `@/components/ui`
4. Jaga komponen tetap kecil dan terfokus (Single Responsibility Principle)
5. Konfigurasi global HANYA dari `@/config`
6. Gunakan `cn()` untuk conditional Tailwind classes
7. Selalu tambahkan JSDoc comments pada fungsi publik
8. Ikuti TypeScript strict mode — tidak boleh ada `any` yang tidak perlu
```

### 11.2 Naming Conventions

| Entitas | Konvensi | Contoh |
|---|---|---|
| Component files | PascalCase | `CardProduct.tsx` |
| Utility files | camelCase | `utils.ts` |
| Config files | kebab-case.config | `site.config.ts` |
| Data files | kebab-case.data | `products.data.ts` |
| Type files | kebab-case.types | `product.types.ts` |
| Route folders | kebab-case (Indonesian) | `simulasi-kredit/` |
| CSS classes | Tailwind utilities | `bg-blue-900 text-white` |

### 11.3 Git Workflow

```
Branching:
  main         → Production
  develop      → Development/staging
  feature/*    → Fitur baru
  fix/*        → Bug fixes
  content/*    → Konten update

Commit Format:
  feat: [deskripsi]     → Fitur baru
  fix: [deskripsi]      → Bug fix
  content: [deskripsi]  → Update konten
  style: [deskripsi]    → Styling changes
  refactor: [deskripsi] → Code refactoring
```

### 11.4 Environment Variables

| Variable | Deskripsi | Required |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL produksi | ✅ |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID | ✅ |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name | ✅ |
| `SANITY_API_READ_TOKEN` | Sanity read token | ✅ |

---

## 12. Roadmap & Prioritas

### Phase 1: Foundation (Current) ✅

- [x] Setup Next.js 14 + TypeScript + Tailwind
- [x] Arsitektur direktori dan type system
- [x] Layout components (Header, Footer)
- [x] Homepage dengan hero, keunggulan, produk unggulan, CTA
- [x] Halaman produk (Kredit, Tabungan, Deposito)
- [x] Simulasi kredit (CreditSimulator)
- [x] Tabel suku bunga (TableInterest)
- [x] Integrasi Sanity CMS
- [x] Sanity schemas (Product, Article)
- [x] Halaman profil perusahaan
- [x] Form pengaduan nasabah
- [x] Compliance badges (OJK, LPS)
- [x] SEO dasar (metadata, sitemap, robots)

### Phase 2: Content & Enhancement 🟡

- [ ] Migrasi penuh konten dari data statis ke Sanity CMS
- [x] Halaman detail produk individual (`/produk/kredit/[slug]`)
- [ ] Halaman detail deposito per tenor
- [x] Seksi artikel edukasi di homepage
- [x] Seksi testimoni nasabah
- [ ] Google Maps integration di halaman kontak
- [ ] WhatsApp floating button
- [ ] Animasi scroll (Framer Motion)
- [ ] Schema.org structured data (LocalBusiness, FinancialProduct)
- [ ] Update nomor registrasi OJK aktual
- [ ] Koordinat peta kantor aktual
- [ ] Email resmi (bukan Yahoo)
- [x] Download PDF laporan keuangan

### Phase 3: Advanced Features 🔵

- [ ] Newsletter subscription
- [ ] Blog/news filter dan search
- [ ] Multi-language support (ID/EN)
- [ ] Dark mode toggle
- [ ] Form pengajuan kredit online
- [ ] Online appointment booking
- [ ] Live chat integration
- [ ] Analytics dashboard (Google Analytics / Plausible)
- [ ] Performance monitoring (Sentry)
- [ ] PWA (Progressive Web App) support

### Phase 4: Digital Banking (Future) 🟣

- [ ] Internet banking / mobile banking portal
- [ ] Status pengajuan kredit online
- [ ] E-statement
- [ ] QR payment integration
- [ ] Digital signature untuk dokumen

---

## 13. Kriteria Acceptance

### 13.1 Definition of Done (Per Fitur)

Setiap fitur dianggap selesai jika memenuhi:

- [ ] Kode ter-compile tanpa error TypeScript
- [ ] Responsive di 3 breakpoint (mobile, tablet, desktop)
- [ ] SEO metadata ter-set (title, description, og tags)
- [ ] Aksesibilitas keyboard navigation berfungsi
- [ ] Loading state dan error state ter-handle
- [ ] Data dari CMS ter-render dengan benar
- [ ] Empty state informatif jika tidak ada data
- [ ] Build production sukses (`next build`)
- [ ] Tidak ada console errors di browser
- [ ] Cross-browser testing minimal Chrome + Safari

### 13.2 Quality Gates

| Gate | Threshold | Tool |
|---|---|---|
| TypeScript | Zero errors | `tsc --noEmit` |
| Lint | Zero errors | `next lint` |
| Lighthouse Performance | ≥ 90 | Chrome DevTools |
| Lighthouse Accessibility | ≥ 90 | Chrome DevTools |
| Lighthouse SEO | ≥ 95 | Chrome DevTools |
| Bundle Size | < 100KB first load | `next build` |

---

## 14. Lampiran

### 14.1 Warna Brand

| Warna | Tailwind Class | Hex (approx) | Penggunaan |
|---|---|---|---|
| Biru Utama | `blue-900` | #1e3a5f | Header, CTA background, link utama |
| Biru Terang | `blue-100` | #dbeafe | Icon background, highlight |
| Amber/Emas | `amber-500` | #f59e0b | CTA button, aksen, highlight |
| Amber Terang | `amber-400` | #fbbf24 | Hover state |
| Abu-abu Latar | `gray-50` | #f9fafb | Background halaman |
| Putih | `white` | #ffffff | Card, content area |
| Hijau Sukses | `green-500` | #22c55e | Checklist, status sukses |

### 14.2 Tipografi

| Element | Font | Weight | Size (Tailwind) |
|---|---|---|---|
| Heading h1 | Inter | extrabold (800) | `text-4xl md:text-6xl` |
| Heading h2 | Inter | bold (700) | `text-3xl md:text-4xl` |
| Heading h3 | Inter | bold (700) | `text-xl` – `text-2xl` |
| Body | Inter | regular (400) | `text-base` – `text-lg` |
| Caption/Label | Inter | semibold (600) | `text-sm` |

### 14.3 Social Media Links

| Platform | URL |
|---|---|
| Facebook | https://facebook.com/bprbapera |
| Instagram | https://instagram.com/bprbapera |
| Twitter/X | https://twitter.com/bprbapera |
| YouTube | https://youtube.com/@bprbapera |

### 14.4 Jam Operasional

| Hari | Jam |
|---|---|
| Senin – Jumat | 08:00 – 16:00 WIB |
| Sabtu | 08:00 – 12:00 WIB |
| Minggu & Libur | Tutup |

---

> **Dokumen ini merupakan panduan hidup (living document) yang harus di-update seiring perkembangan proyek. Setiap perubahan fitur, arsitektur, atau keputusan teknis harus tercermin dalam dokumen ini.**
