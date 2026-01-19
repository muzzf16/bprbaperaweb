import PageHeader from "@/components/layout/PageHeader";
import { Container, Section } from "@/components/ui";

export default function PrivacyPolicyPage() {
    return (
        <>
            <PageHeader
                title="Kebijakan Privasi"
                description="Komitmen kami melindungi data pribadi anda"
                breadcrumb={[{ label: "Kebijakan Privasi", href: "/compliance/privacy-policy" }]}
            />

            <Section>
                <Container size="lg">
                    <div className="prose max-w-none text-gray-700 space-y-8">
                        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 mb-8">
                            <p className="font-medium text-blue-900">
                                PT BPR Bapera berkomitmen untuk melindungi dan menghormati privasi Anda.
                                Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda
                                sesuai dengan peraturan perundang-undangan yang berlaku, termasuk UU Pelindungan Data Pribadi (UU PDP).
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">1. Data yang Kami Kumpulkan</h2>
                            <p className="mb-2">Kami dapat mengumpulkan dan memproses data berikut tentang Anda:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Informasi yang Anda berikan dengan mengisi formulir di situs kami (seperti formulir pengaduan, simulasi kredit).</li>
                                <li>Korespondensi jika Anda menghubungi kami.</li>
                                <li>Detail kunjungan Anda ke situs kami dan sumber daya yang Anda akses.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">2. Penggunaan Data</h2>
                            <p className="mb-2">Kami menggunakan informasi yang kami miliki tentang Anda dengan cara-cara berikut:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Untuk memastikan konten dari situs kami disajikan dengan cara yang paling efektif untuk Anda.</li>
                                <li>Untuk memberikan informasi, produk, atau layanan yang Anda minta dari kami.</li>
                                <li>Untuk memberitahu Anda tentang perubahan pada layanan kami.</li>
                            </ul>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">3. Keamanan Data</h2>
                            <p>
                                Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi data pribadi Anda
                                dari akses, penggunaan, pengungkapan, perubahan, atau penghancuran yang tidak sah.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">4. Hak Anda</h2>
                            <p>
                                Anda memiliki hak untuk meminta akses ke, koreksi, atau penghapusan data pribadi Anda.
                                Anda juga berhak untuk menolak pemrosesan data pribadi Anda.
                                Untuk menggunakan hak-hak ini, silakan hubungi Petugas Perlindungan Data kami.
                            </p>
                        </div>
                    </div>
                </Container>
            </Section>
        </>
    );
}
