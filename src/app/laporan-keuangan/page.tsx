import PageHeader from "@/components/layout/PageHeader";
import { Download, FileText } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Laporan Keuangan - BPR Bapera",
    description: "Publikasi laporan keuangan triwulanan dan tahunan PT BPR Bapera sebagai wujud transparansi.",
};

interface Report {
    year: string;
    period: string; // "Triwulan 1" | "Tahunan"
    title: string;
    fileUrl: string;
}

const FINANCE_REPORTS: Report[] = [
    { year: "2024", period: "Triwulan 1", title: "Laporan Keuangan Publikasi Maret 2024", fileUrl: "#" },
    { year: "2023", period: "Tahunan", title: "Laporan Keuangan Audit Desember 2023", fileUrl: "#" },
    { year: "2023", period: "Triwulan 3", title: "Laporan Keuangan Publikasi September 2023", fileUrl: "#" },
    { year: "2023", period: "Triwulan 2", title: "Laporan Keuangan Publikasi Juni 2023", fileUrl: "#" },
];

export default function LaporanKeuanganPage() {
    return (
        <main>
            <PageHeader
                title="Laporan Keuangan"
                description="Akses laporan kinerja keuangan BPR Bapera secara transparan dan akuntabel."
                breadcrumb={[{ label: "Laporan", href: "/laporan-keuangan" }]}
            />

            <div className="container mx-auto px-4 md:px-6 py-12 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        <div className="border-b border-gray-100 p-6 bg-blue-50">
                            <h2 className="text-xl font-bold text-blue-900">Arsip Laporan</h2>
                        </div>

                        <div className="divide-y divide-gray-100">
                            {FINANCE_REPORTS.map((report, idx) => (
                                <div key={idx} className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between hover:bg-gray-50 transition">
                                    <div className="flex items-start">
                                        <div className="bg-amber-100 p-3 rounded-lg mr-4 text-amber-600">
                                            <FileText className="h-6 w-6" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800 text-lg mb-1">{report.title}</h3>
                                            <div className="flex space-x-3 text-sm text-gray-500">
                                                <span className="bg-gray-200 px-2 py-0.5 rounded text-xs font-semibold">{report.year}</span>
                                                <span>{report.period}</span>
                                            </div>
                                        </div>
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

                        {/* Empty State / More generic text */}
                        {FINANCE_REPORTS.length === 0 && (
                            <div className="p-12 text-center text-gray-500">
                                Belum ada laporan yang tersedia saat ini.
                            </div>
                        )}
                    </div>

                    <p className="mt-8 text-center text-gray-500 text-sm">
                        Dokumen disajikan dalam format PDF. Anda memerlukan PDF Reader untuk membuka file.
                    </p>
                </div>
            </div>
        </main>
    );
}
