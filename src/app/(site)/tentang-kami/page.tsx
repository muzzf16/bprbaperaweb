import PageHeader from "@/components/layout/PageHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tentang Kami - BPR Bapera",
    description: "Profil PT BPR Bapera. Bank Perkreditan Rakyat yang aman, sehat, dan terpercaya.",
};

export default function TentangKamiPage() {
    return (
        <main>
            <PageHeader
                title="Tentang Kami"
                description="Mengenal lebih dekat BPR Bapera sebagai mitra keuangan terpercaya Anda."
                breadcrumb={[{ label: "Tentang Kami", href: "/tentang-kami" }]}
            />

            <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 bg-white">
                <div className="max-w-4xl mx-auto space-y-12">

                    {/* Section 1: Introduction */}
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="md:w-1/2">
                            <div className="relative h-64 w-full rounded-2xl overflow-hidden shadow-lg bg-gray-200">
                                {/* Place holder for office image */}
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium">FOTO KANTOR</div>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <h2 className="text-3xl font-bold text-blue-900 mb-4">Sekilas BPR Bapera</h2>
                            <div className="w-20 h-1 bg-amber-500 mb-6"></div>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                PT BPR Bapera adalah Bank Perkreditan Rakyat yang berdiri sejak tahun 2005. Kami hadir dengan komitmen kuat untuk mendukung pertumbuhan ekonomi mikro, kecil, dan menengah di wilayah operasional kami.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                Sebagai lembaga keuangan yang terdaftar dan diawasi oleh Otoritas Jasa Keuangan (OJK), serta dijamin oleh Lembaga Penjamin Simpanan (LPS), kami mengutamakan prinsip kehati-hatian (prudential banking) dan tata kelola perusahaan yang baik (GCG) dalam setiap layanan kami.
                            </p>
                        </div>
                    </div>

                    {/* Section 2: Visi Misi */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100">
                            <h3 className="text-2xl font-bold text-blue-900 mb-4">Visi</h3>
                            <p className="text-gray-700 italic text-lg">
                                &quot;Menjadi BPR yang Sehat, Kuat, dan Terpercaya pilihan utama masyarakat.&quot;
                            </p>
                        </div>
                        <div className="bg-amber-50 p-8 rounded-2xl border border-amber-100">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Misi</h3>
                            <ul className="space-y-3 text-gray-700 list-disc list-inside">
                                <li>Memberikan pelayanan prima kepada seluruh nasabah.</li>
                                <li>Membantu pengembangan UMKM melalui penyaluran kredit yang sehat.</li>
                                <li>Meningkatkan kesejahteraan stakeholder dan karyawan.</li>
                                <li>Menjalankan operasional perbankan sesuai regulasi yang berlaku.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Section 3: Core Values */}
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-8">Nilai-Nilai Perusahaan</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {['Integritas', 'Profesional', 'Inovatif', 'Pelayanan'].map(val => (
                                <div key={val} className="p-6 rounded-xl shadow-md border border-gray-100 bg-white hover:-translate-y-1 transition transform">
                                    <h4 className="font-bold text-blue-900 text-lg">{val}</h4>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
