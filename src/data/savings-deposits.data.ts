import { PiggyBank, Landmark } from "lucide-react";
import type { Product } from "@/types";

/**
 * Savings Products Data
 * 
 * Contains savings account offerings:
 * - Tabungan Bapera (Regular Savings)
 * - Simpanan Pelajar (Student Savings)
 */
export const SAVING_PRODUCTS: Product[] = [
    {
        id: "tabungan-bapera",
        slug: "tabungan-bapera",
        title: "Tabungan Bapera",
        shortDescription: "Tabungan harian dengan fasilitas menarik dan bebas biaya administrasi bulanan.",
        description: "Tabungan Bapera adalah simpanan masyarakat umum yang penarikannya dapat dilakukan setiap saat. Aman, mudah, dan menguntungkan.",
        icon: PiggyBank,
        interestRate: "2.5% p.a",
        minTenor: "-",
        maxTenor: "-",
        features: [
            "Setoran awal ringan hanya Rp 50.000",
            "Bebas biaya administrasi bulanan",
            "Suku bunga kompetitif",
            "Layanan jemput bola (Pick Up Service)"
        ],
        requirements: [
            "Fotokopi KTP / SIM / Paspor yang masih berlaku",
            "Mengisi formulir pembukaan rekening",
            "Setoran awal minimal Rp 50.000"
        ]
    },
    {
        id: "tabungan-pelajar",
        slug: "tabungan-pelajar",
        title: "Simpanan Pelajar",
        shortDescription: "Mendidik generasi muda untuk gemar menabung sejak dini.",
        description: "Tabungan khusus bagi pelajar (Siswa/Mahasiswa) dengan persyaratan mudah dan sederhana serta fitur yang menarik, dalam rangka edukasi dan inklusi keuangan untuk mendorong budaya menabung sejak dini.",
        icon: PiggyBank,
        interestRate: "2.0% p.a",
        minTenor: "-",
        maxTenor: "-",
        features: [
            "Setoran awal hanya Rp 10.000",
            "Buku tabungan atas nama siswa",
            "Bebas biaya ganti buku"
        ],
        requirements: [
            "Kartu Pelajar / Surat Keterangan Sekolah",
            "KTP Orang Tua / Wali",
            "Akte Kelahiran / KK"
        ]
    }
];

/**
 * Deposit Products Data
 * 
 * Contains time deposit offerings:
 * - Deposito Berjangka (Term Deposits)
 */
export const DEPOSIT_PRODUCTS: Product[] = [
    {
        id: "deposito-berjangka",
        slug: "deposito-berjangka",
        title: "Deposito Berjangka",
        shortDescription: "Investasi aman dengan suku bunga tinggi dan jangka waktu fleksibel.",
        description: "Simpanan berjangka dengan suku bunga kompetitif yang memberikan keuntungan pasti dan rasa aman. Dijamin oleh LPS.",
        icon: Landmark,
        interestRate: "Up to 6.75% p.a",
        minTenor: "1 Bulan",
        maxTenor: "12 Bulan",
        features: [
            "Bunga lebih tinggi dari tabungan biasa",
            "Pilihan jangka waktu 1, 3, 6, 12 bulan",
            "Bunga dapat ditransfer ke rekening lain",
            "Dapat dijadikan jaminan kredit (Back to Back)"
        ],
        requirements: [
            "Fotokopi KTP",
            "Mengisi formulir pembukaan bilyet deposito",
            "Penempatan minimal Rp 5.000.000"
        ]
    }
];
