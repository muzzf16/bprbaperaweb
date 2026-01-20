import PageHeader from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui";

export default function DisclaimerPage() {
    return (
        <>
            <PageHeader
                title="Disclaimer"
                description="Penyangkalan dan Batasan Tanggung Jawab"
                breadcrumb={[{ label: "Disclaimer", href: "/compliance/disclaimer" }]}
            />

            <Section>
                <Container size="lg">
                    <div className="prose max-w-none text-gray-700 space-y-8">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Umum</h2>
                            <p>
                                Informasi yang terdapat dalam website ini adalah untuk tujuan informasi umum saja.
                                Informasi ini disediakan oleh PT BPR Bapera dan sementara kami berusaha untuk menjaga informasi tetap terkini dan benar,
                                kami tidak membuat pernyataan atau jaminan dalam bentuk apa pun, tersurat maupun tersirat, tentang kelengkapan,
                                akurasi, keandalan, kesesuaian, atau ketersediaan sehubungan dengan website atau informasi, produk, layanan,
                                atau gambar terkait yang terdapat pada website untuk tujuan apa pun.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Risiko Keuangan</h2>
                            <p>
                                Segala ketergantungan yang Anda tempatkan pada informasi tersebut adalah risiko Anda sendiri.
                                Produk dan layanan keuangan yang dijelaskan dalam website ini mengandung risiko.
                                Kinerja masa lalu tidak menjamin kinerja masa depan. Anda disarankan untuk berkonsultasi dengan penasihat keuangan profesional
                                sebelum membuat keputusan investasi atau keuangan.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Tautan Eksternal</h2>
                            <p>
                                Melalui website ini Anda mungkin dapat terhubung ke website lain yang tidak berada di bawah kendali PT BPR Bapera.
                                Kami tidak memiliki kendali atas sifat, isi, dan ketersediaan sirus-situs tersebut.
                                Pencantuman tautan apa pun tidak serta merta menyiratkan rekomendasi atau mendukung pandangan yang diungkapkan di dalamnya.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Ketersediaan Layanan</h2>
                            <p>
                                Setiap upaya dilakukan untuk menjaga agar website tetap berjalan lancar.
                                Namun, PT BPR Bapera tidak bertanggung jawab atas, dan tidak akan bertanggung jawab atas,
                                website yang sementara tidak tersedia karena masalah teknis di luar kendali kami.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>
        </>
    );
}
