import type { Article } from "@/types";

/**
 * Educational Articles Data
 * 
 * Contains financial literacy and educational content for customers
 */
export const ARTICLES: Article[] = [
    {
        id: "1",
        slug: "tips-mengelola-keuangan-usaha-kecil",
        title: "5 Tips Jitu Mengelola Keuangan Usaha Kecil",
        excerpt: "Pelajari cara mengatur arus kas agar bisnis UMKM Anda tetap sehat dan berkembang.",
        category: "Edukasi Keuangan",
        publishedAt: "10 Desember 2024",
        image: "/images/article-1.jpg",
        content: `
            <p>Mengelola keuangan adalah jantung dari keberhasilan usaha kecil. Banyak pelaku UMKM yang memiliki produk bagus namun gagal karena manajemen kas yang buruk.</p>
            <h3>1. Pisahkan Keuangan Pribadi dan Usaha</h3>
            <p>Kesalahan paling umum adalah mencampuradukkan uang belanja dapur dengan modal dagangan.</p>
            <h3>2. Catat Setiap Transaksi</h3>
            <p>Gunakan buku kas sederhana atau aplikasi pencatatan keuangan.</p>
            <h3>3. Putar Kembali Laba</h3>
            <p>Jangan terburu-buru menikmati keuntungan. Gunakan untuk menambah stok atau perbaikan alat.</p>
        `
    },
    {
        id: "2",
        slug: "manfaat-deposito-bpr",
        title: "Kenapa Deposito BPR Lebih Menguntungkan?",
        excerpt: "Bunga lebih tinggi dibanding bank umum dan tetap dijamin LPS. Simak penjelasannya.",
        category: "Produk",
        publishedAt: "05 Desember 2024",
        image: "/images/article-2.jpg",
        content: `
            <p>BPR menawarkan suku bunga deposito yang lebih menarik dibandingkan bank umum. Hal ini diizinkan oleh LPS.</p>
            <p>Keamanan dana Anda tetap terjamin selama:</p>
            <ul>
                <li>Tercatat dalam pembukuan bank</li>
                <li>Tingkat bunga tidak melebihi penjaminan LPS</li>
                <li>Tidak melakukan tindakan yang merugikan bank</li>
            </ul>
        `
    },
    {
        id: "3",
        slug: "waspada-investasi-bodong",
        title: "Waspada Investasi Bodong! Kenali Cirinya",
        excerpt: "Jangan tergiur keuntungan instan yang tidak masuk akal. Ini ciri-ciri investasi ilegal.",
        category: "Literasi",
        publishedAt: "01 Desember 2024",
        image: "/images/article-3.jpg",
        content: `
            <p>Akhir-akhir ini marak penawaran investasi dengan imbal hasil fantastis. Masyarakat perlu waspada.</p>
            <p>Ciri-ciri investasi bodong:</p>
            <ul>
                <li>Menjanjikan keuntungan pasti dan tinggi dalam waktu singkat</li>
                <li>Produk investasi tidak jelas</li>
                <li>Menggunakan skema ponzi (member get member)</li>
             </ul>
             <p>Pastikan selalu 2L: Legal dan Logis.</p>
        `
    }
];
