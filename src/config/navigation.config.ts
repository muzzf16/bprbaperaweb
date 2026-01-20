import type { NavLink } from "@/types";

/**
 * Main navigation configuration
 * Used in header/navigation components
 */
export const NAV_LINKS: NavLink[] = [
    {
        label: "Beranda",
        href: "/"
    },
    {
        label: "Tentang Kami",
        href: "#",
        children: [
            { label: "Profil Perusahaan", href: "/tentang-kami" },
            { label: "Komisaris & Direksi", href: "/komisaris-direksi" },
        ]
    },
    {
        label: "Produk",
        href: "#",
        children: [
            { label: "Kredit", href: "/produk/kredit" },
            { label: "Tabungan", href: "/produk/tabungan" },
            { label: "Deposito", href: "/produk/deposito" },
            { label: "Suku Bunga", href: "/suku-bunga" },
        ]
    },
    {
        label: "Simulasi Kredit",
        href: "/simulasi-kredit"
    },
    {
        label: "Laporan",
        href: "/laporan-keuangan"
    },
    {
        label: "Kontak",
        href: "/kontak"
    },
];

/**
 * Footer navigation links
 */
export const FOOTER_LINKS = {
    company: [
        { label: "Tentang Kami", href: "/tentang-kami" },
        { label: "Visi & Misi", href: "/visi-misi" },
        { label: "Struktur Organisasi", href: "/struktur-organisasi" },
        { label: "Komisaris & Direksi", href: "/komisaris-direksi" },
    ],
    products: [
        { label: "Kredit Modal Kerja", href: "/produk/kredit/kredit-modal-kerja" },
        { label: "Kredit Konsumtif", href: "/produk/kredit/kredit-konsumtif" },
        { label: "Tabungan Bapera", href: "/produk/tabungan" },
        { label: "Deposito Berjangka", href: "/produk/deposito" },
    ],
    information: [
        { label: "Suku Bunga", href: "/suku-bunga" },
        { label: "Laporan Keuangan", href: "/laporan-keuangan" },
        { label: "Laporan GCG", href: "/laporan-gcg" },
        { label: "Informasi Risiko", href: "/informasi-risiko" },
    ],
    legal: [
        { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
        { label: "Syarat & Ketentuan", href: "/compliance/terms-conditions" },
        { label: "Form Pengaduan", href: "/form-pengaduan" },
        { label: "Tata Kelola GCG", href: "/gcg" },
    ],
} as const;

/**
 * Quick Links (for hero/CTA sections)
 */
export const QUICK_LINKS = [
    { label: "Ajukan Kredit", href: "/produk/kredit" },
    { label: "Buka Tabungan", href: "/produk/tabungan" },
    { label: "Simulasi Kredit", href: "/simulasi-kredit" },
    { label: "Hubungi Kami", href: "/kontak" },
] as const;
