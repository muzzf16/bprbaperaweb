import PageHeader from "@/components/layout/PageHeader";
import { Download, ShieldCheck } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Laporan GCG - BPR Bapera",
    description: "Laporan Tata Kelola Perusahaan (Good Corporate Governance) PT BPR Bapera.",
};

interface Report {
    year: string;
    title: string;
    fileUrl: string;
}

const GCG_REPORTS: Report[] = [
    { year: "2023", title: "Laporan GCG Tahun 2023", fileUrl: "#" },
    { year: "2022", title: "Laporan GCG Tahun 2022", fileUrl: "#" },
    { year: "2021", title: "Laporan GCG Tahun 2021", fileUrl: "#" },
];

export default function LaporanGCGPage() {
    return (
        <main>
            <PageHeader
                title="Laporan Tata Kelola (GCG)"
                description="Komitmen kami dalam menjalankan prinsip transparansi, akuntabilitas, tanggung jawab, independensi, dan kewajaran."
                breadcrumb={[{ label: "Laporan", href: "/laporan-keuangan" }, { label: "GCG", href: "/laporan-gcg" }]}
            />

            <div className="container mx-auto px-4 md:px-6 py-12 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    {/* Section Info */}
                    <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100 flex items-start gap-4">
                        <ShieldCheck className="h-12 w-12 text-blue-900 flex-shrink-0" />
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Penerapan GCG</h2>
                            <p className="text-gray-600 leading-relaxed">
                                BPR Bapera berkomitmen untuk melaksanakan Good Corporate Governance (GCG) di setiap jenjang organisasi. Penerapan GCG merupakan salah satu upaya kami untuk melindungi kepentingan stakeholder dan meningkatkan kepatuhan terhadap peraturan perundang-undangan yang berlaku.
                            </p>
                        </div>
                    </div>

                    {/* Archive */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="border-b border-gray-100 p-6 bg-amber-50">
                            <h2 className="text-xl font-bold text-gray-900">Arsip Laporan GCG</h2>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {GCG_REPORTS.map((report, idx) => (
                                <div key={idx} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-gray-50 transition">
                                    <div>
                                        <h3 className="font-bold text-gray-800 text-lg mb-1">{report.title}</h3>
                                        <p className="text-sm text-gray-500">Periode Pelaporan: {report.year}</p>
                                    </div>

                                    <a
                                        href={report.fileUrl}
                                        className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-blue-900 text-blue-900 text-sm font-medium rounded-lg hover:bg-blue-50 transition"
                                    >
                                        <Download className="h-4 w-4 mr-2" /> Download PDF
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
