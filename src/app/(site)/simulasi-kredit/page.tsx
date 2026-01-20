import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import CreditSimulator from "@/components/features/CreditSimulator";
import { Metadata } from "next";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Simulasi Kredit - BPR Bapera",
    description: "Hitung estimasi angsuran kredit Anda dengan mudah menggunakan kalkulator simulasi kredit BPR Bapera.",
};

export default function SimulasiKreditPage() {
    return (
        <main>
            <PageHeader
                title="Simulasi Kredit"
                description="Rencanakan keuangan Anda dengan matang sebelum mengajukan pinjaman."
                breadcrumb={[{ label: "Simulasi Kredit", href: "/simulasi-kredit" }]}
            />

            <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 bg-gray-50">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2">
                            <CreditSimulator />
                        </div>

                        <div className="space-y-8">
                            <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-amber-500">
                                <h3 className="text-xl font-bold mb-4 text-gray-900">Siap Mengajukan?</h3>
                                <p className="text-gray-600 mb-6 text-sm">
                                    Jika hitungan angsuran sudah sesuai dengan kemampuan Anda, segera ajukan kredit sekarang. Proses cepat dan syarat mudah.
                                </p>
                                <Link
                                    href="/produk/kredit"
                                    className="block w-full py-3 bg-blue-900 text-white text-center rounded-lg font-semibold hover:bg-blue-800 transition shadow-lg"
                                >
                                    Pilih Produk Kredit
                                </Link>
                            </div>

                            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                                <h3 className="text-lg font-bold mb-3 text-blue-900">Dokumen Persyaratan</h3>
                                <ul className="space-y-2 text-sm text-gray-700">
                                    <li className="flex items-start">
                                        <ArrowRight className="h-4 w-4 mr-2 text-amber-500 flex-shrink-0 mt-0.5" />
                                        Fotokopi KTP Suami & Istri
                                    </li>
                                    <li className="flex items-start">
                                        <ArrowRight className="h-4 w-4 mr-2 text-amber-500 flex-shrink-0 mt-0.5" />
                                        Fotokopi Kartu Keluarga & Surat Nikah
                                    </li>
                                    <li className="flex items-start">
                                        <ArrowRight className="h-4 w-4 mr-2 text-amber-500 flex-shrink-0 mt-0.5" />
                                        Slip Gaji / Bukti Usaha
                                    </li>
                                    <li className="flex items-start">
                                        <ArrowRight className="h-4 w-4 mr-2 text-amber-500 flex-shrink-0 mt-0.5" />
                                        Fotokopi NPWP (plafon &gt; 50jt)
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
