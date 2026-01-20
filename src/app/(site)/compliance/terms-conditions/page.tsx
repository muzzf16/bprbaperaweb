import PageHeader from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui";

export default function TermsConditionsPage() {
    return (
        <>
            <PageHeader
                title="Syarat & Ketentuan"
                description="Ketentuan penggunaan website BPR Bapera"
                breadcrumb={[{ label: "Syarat & Ketentuan", href: "/compliance/terms-conditions" }]}
            />

            <Section>
                <Container size="lg">
                    <div className="prose max-w-none text-gray-700 space-y-8">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Penerimaan Syarat</h2>
                            <p>
                                Dengan mengakses dan menggunakan website PT BPR Bapera, Anda menerima dan setuju untuk terikat oleh syarat dan ketentuan ini.
                                Jika Anda tidak setuju dengan bagian mana pun dari syarat dan ketentuan ini, Anda tidak boleh menggunakan website kami.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Hak Kekayaan Intelektual</h2>
                            <p>
                                Konten, tata letak, desain, data, grafik, dan materi lain pada website ini dilindungi oleh hak cipta dan hukum kekayaan intelektual lainnya.
                                Anda tidak boleh mereproduksi, mendistribusikan, memodifikasi, menampilkan, atau menggunakan materi apapun tanpa izin tertulis sebelumnya dari kami.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Penggunaan yang Dilarang</h2>
                            <p>Anda setuju untuk tidak menggunakan website ini untuk:</p>
                            <ul className="list-disc pl-5 space-y-2 mt-2">
                                <li>Tujuan yang melanggar hukum atau dilarang oleh peraturan perundang-undangan.</li>
                                <li>Mengirimkan virus, malware, atau kode berbahaya lainnya.</li>
                                <li>Mencoba mendapatkan akses tidak sah ke sistem komputer kami.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Perubahan Syarat</h2>
                            <p>
                                PT BPR Bapera berhak untuk mengubah syarat dan ketentuan ini kapan saja tanpa pemberitahuan sebelumnya.
                                Penggunaan berkelanjutan Anda atas website ini setelah perubahan tersebut merupakan persetujuan Anda terhadap syarat dan ketentuan yang baru.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>
        </>
    );
}
