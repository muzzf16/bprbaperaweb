import { Wallet, Briefcase, Home } from "lucide-react";
import type { Product } from "@/types";

/**
 * Credit/Loan Products Data
 * 
 * This file contains all credit product offerings including:
 * - Kredit Modal Kerja (Working Capital Loans)
 * - Kredit Konsumtif (Consumer Loans)
 * - Kredit Mikro UMKM (Micro Business Loans)
 */
export const CREDIT_PRODUCTS: Product[] = [
    {
        id: "kredit-wirausaha",
        slug: "kredit-modal-kerja",
        title: "Kredit Modal Kerja",
        shortDescription: "Solusi tambahan modal untuk pengembangan usaha Anda dengan bunga kompetitif.",
        description: "Kredit Modal Kerja ditujukan bagi kebutuhan modal usaha, baik untuk perdagangan, industri, maupun jasa. Fasilitas ini membantu Anda menjaga cash flow dan meningkatkan kapasitas bisnis.",
        icon: Wallet,
        interestRate: "1.25% flat / bulan",
        minTenor: "6 Bulan",
        maxTenor: "36 Bulan",
        features: [
            "Proses cepat dan mudah",
            "Plafon hingga Rp 500.000.000",
            "Bunga bersaing sistem Flat/Anuitas",
            "Bisa pelunasan dipercepat"
        ],
        requirements: [
            "Fotokopi KTP Suami Istri",
            "Fotokopi Kartu Keluarga & Surat Nikah",
            "Legalitas Usaha (NIB/SIUP/TDP)",
            "Laporan Keuangan Sederhana",
            "Fotokopi Agunan (SHM/BPKB)"
        ]
    },
    {
        id: "kredit-konsumtif",
        slug: "kredit-konsumtif",
        title: "Kredit Konsumtif",
        shortDescription: "Dana tunai untuk kebutuhan pribadi seperti renovasi rumah, pendidikan, dll.",
        description: "Kredit Serbaguna untuk memenuhi berbagai kebutuhan konsumtif Anda, mulai dari biaya pendidikan, renovasi rumah, pernikahan, hingga liburan.",
        icon: Home,
        interestRate: "1.5% flat / bulan",
        minTenor: "12 Bulan",
        maxTenor: "60 Bulan",
        features: [
            "Punggutan biaya provisi rendah",
            "Tenor fleksibel hingga 5 tahun",
            "Plafon disesuaikan kemampuan bayar"
        ],
        requirements: [
            "Karyawan Tetap / Professional",
            "Slip Gaji 3 Bulan Terakhir",
            "SK Pengangkatan Karyawan",
            "Fotokopi KTP & KK"
        ]
    },
    {
        id: "kredit-umkm",
        slug: "kredit-umkm",
        title: "Kredit Mikro UMKM",
        shortDescription: "Pinjaman khusus pedagang pasar dan usaha mikro dengan syarat sangat ringan.",
        description: "Kabar gembira bagi pelaku UMKM! Dapatkan akses permodalan mudah tanpa jaminan yang memberatkan untuk membesarkan warung atau lapak Anda.",
        icon: Briefcase,
        interestRate: "1.0% flat / bulan",
        minTenor: "3 Bulan",
        maxTenor: "24 Bulan",
        features: [
            "Tanpa biaya administrasi awal",
            "Angsuran bisa harian/mingguan",
            "Pendampingan usaha gratis"
        ],
        requirements: [
            "Memiliki usaha aktif min. 1 tahun",
            "KTP & KK",
            "Surat Keterangan Usaha dari Desa/Kelurahan"
        ]
    }
];
