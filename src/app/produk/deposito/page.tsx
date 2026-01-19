import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { CheckCircle, Landmark, ShieldCheck } from "lucide-react";
import { Metadata } from "next";
import { getProductsByCategory } from "@/lib/sanity-queries";

export const metadata: Metadata = {
    title: "Produk Deposito - BPR Bapera",
    description: "Investasi berjangka dengan suku bunga kompetitif dan dijamin LPS. Pilihan tepat untuk mengembangkan dana Anda.",
};

export default async function DepositoPage() {
    // Fetch dynamic data
    const products = await getProductsByCategory('deposito');
    return (
        <main>
            <PageHeader
                title="Deposito Berjangka"
                description="Optimalkan dana Anda dengan instrumen investasi yang aman dan menguntungkan."
                breadcrumb={[{ label: "Produk", href: "#" }, { label: "Deposito", href: "/produk/deposito" }]}
            />

            <div className="container mx-auto px-4 md:px-6 py-12 bg-white">
                <div className="max-w-4xl mx-auto">
                    {/* Intro Card */}
                    <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-8 md:p-12 text-white text-center shadow-xl mb-12">
                        <ShieldCheck className="h-20 w-20 mx-auto text-amber-400 mb-6" />
                        <h2 className="text-3xl font-bold mb-4">Investasi Aman, Bunga Maksimal</h2>
                        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                            Deposito BPR Bapera adalah pilihan tepat bagi Anda yang menginginkan kepastian keuntungan. Dana Anda aman karena dijamin oleh Lembaga Penjamin Simpanan (LPS).
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                                <span className="block text-2xl font-bold text-amber-400">1 Bulan</span>
                                <span className="text-xs text-blue-200">Tenor Min</span>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                                <span className="block text-2xl font-bold text-amber-400">12 Bulan</span>
                                <span className="text-xs text-blue-200">Tenor Max</span>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                                <span className="block text-2xl font-bold text-amber-400">5 Jt</span>
                                <span className="text-xs text-blue-200">Min. Penempatan</span>
                            </div>
                            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                                <span className="block text-2xl font-bold text-amber-400">6.75%</span>
                                <span className="text-xs text-blue-200">Max Bunga</span>
                            </div>
                        </div>
                    </div>

                    // Product Details - Dynamic
                    <div className="grid gap-12">
                        {/* Empty State */}
                        {products.length === 0 && (
                            <div className="text-center py-12 bg-gray-50 rounded-xl">
                                <p className="text-gray-500">Informasi produk deposito sedang diperbarui.</p>
                            </div>
                        )}

                        {products.map((product: any) => (
                            <div key={product._id}>
                                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                                    <Landmark className="h-6 w-6 mr-3 text-blue-900" />
                                    {product.title}
                                </h3>

                                <p className="text-gray-600 mb-6">{product.shortDescription}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                                    {product.features?.map((feature: string, idx: number) => (
                                        <div key={idx} className="flex p-4 border border-gray-100 rounded-xl bg-gray-50 items-center">
                                            <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-4 flex-shrink-0">
                                                <span className="text-blue-900 font-bold text-sm">{idx + 1}</span>
                                            </div>
                                            <span className="text-gray-700 font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="bg-amber-50 rounded-xl p-8 border border-amber-100">
                                    <h4 className="text-lg font-bold text-gray-900 mb-4">Persyaratan Pembukaan</h4>
                                    <ul className="space-y-3">
                                        {(product.requirements || []).map((req: string) => (
                                            <li key={req} className="flex items-start">
                                                <CheckCircle className="h-5 w-5 text-amber-600 mr-3 mt-0.5" />
                                                <span className="text-gray-800">{req}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-8">
                                        <Link href="/kontak" className="text-blue-900 font-semibold hover:underline">
                                            Hubungi Kami untuk Penempatan &rarr;
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
