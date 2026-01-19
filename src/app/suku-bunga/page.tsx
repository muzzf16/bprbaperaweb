import PageHeader from "@/components/layout/PageHeader";
import TableInterest from "@/components/features/TableInterest";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Suku Bunga - BPR Bapera",
    description: "Informasi suku bunga tabungan dan deposito terbaru BPR Bapera.",
};

export default function SukuBungaPage() {
    return (
        <main>
            <PageHeader
                title="Suku Bunga"
                description="Transparansi suku bunga untuk produk simpanan Anda. Nikmati imbal hasil yang kompetitif."
                breadcrumb={[{ label: "Suku Bunga", href: "/suku-bunga" }]}
            />

            <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-amber-500 pl-4">Tabel Suku Bunga Dana</h2>
                    <TableInterest />

                    <div className="mt-12 p-6 bg-blue-50 rounded-xl">
                        <h3 className="text-lg font-bold text-blue-900 mb-2">Simulasi Hasil Investasi</h3>
                        <p className="text-gray-700 mb-4">Ingin tahu estimasi pengembalian dana Anda? Gunakan kalkulator simulasi kami.</p>
                        {/* Link to simulation would go here */}
                    </div>
                </div>
            </div>
        </main>
    );
}
