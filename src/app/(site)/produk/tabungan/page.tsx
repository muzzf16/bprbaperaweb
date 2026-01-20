import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { CheckCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Produk Tabungan - BPR Bapera",
    description: "Rencanakan masa depan dengan pilihan produk tabungan dari BPR Bapera. Aman, menguntungkan, dan dijamin LPS.",
};

// Import dynamic fetching
import { getProductsByCategory } from "@/lib/sanity-queries";

interface SanityProduct {
    _id: string;
    title: string;
    interestRate?: string;
    shortDescription?: string;
    features?: string[];
    requirements?: string[];
}

// Async Server Component
export default async function TabunganPage() {
    // Fetch products
    const products = await getProductsByCategory('tabungan');

    return (
        <main>
            <PageHeader
                title="Produk Tabungan"
                description="Simpan dana Anda dengan aman dan nikmati berbagai keuntungan menarik."
                breadcrumb={[{ label: "Produk", href: "#" }, { label: "Tabungan", href: "/produk/tabungan" }]}
            />

            <div className="container mx-auto px-4 md:px-6 py-12 bg-gray-50">
                <div className="grid gap-8">
                    {/* Empty State */}
                    {products.length === 0 && (
                        <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm">
                            <p className="text-gray-500">Belum ada produk tabungan yang ditampilkan.</p>
                        </div>
                    )}

                    {products.map((product: SanityProduct) => (
                        <div key={product._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 p-8 flex flex-col md:flex-row gap-8">
                            <div className="md:w-1/4 flex flex-col items-center justify-center text-center p-4 bg-blue-50 rounded-xl">
                                {/* Icon Fallback */}
                                <div className="h-16 w-16 text-blue-900 mb-4 flex items-center justify-center bg-blue-100 rounded-full">
                                    <span className="text-2xl font-bold">Rp</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{product.title}</h3>
                                <p className="text-amber-600 font-bold mt-2">{product.interestRate}</p>
                            </div>

                            <div className="md:w-3/4 flex flex-col">
                                <p className="text-gray-600 mb-4 text-lg">
                                    {product.shortDescription || "Deskripsi tabungan BPR Bapera yang menguntungkan."}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-6">
                                    {product.features?.map((f: string) => (
                                        <div key={f} className="flex items-start">
                                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                            <span className="text-gray-700 text-sm">{f}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <h4 className="font-semibold text-gray-900 mb-2 text-sm uppercase tracking-wider">Persyaratan</h4>
                                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-1">
                                        {/* Requirements are optional in schema, handle safely */}
                                        {(product.requirements || []).map((req: string) => (
                                            <li key={req}>{req}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <section className="bg-blue-900 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Ingin Buka Tabungan?</h2>
                    <p className="text-blue-100 mb-6">Kunjungi kantor kas atau cabang terdekat kami dengan membawa KTP dan setoran awal.</p>
                    <Link href="/kontak" className="inline-block px-8 py-3 bg-amber-500 text-blue-900 font-bold rounded-full hover:bg-amber-400 transition shadow">
                        Lihat Lokasi Kantor
                    </Link>
                </div>
            </section>
        </main>
    );
}
