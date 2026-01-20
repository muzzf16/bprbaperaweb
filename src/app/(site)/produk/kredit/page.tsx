import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Produk Kredit - BPR Bapera",
    description: "Pilihan produk kredit BPR Bapera untuk berbagai kebutuhan Anda. Modal kerja, konsumtif, dan investasi.",
};

// Import dynamic fetching
import { getProductsByCategory } from "@/lib/sanity-queries";

interface SanityProduct {
    _id: string;
    title: string;
    slug: string;
    shortDescription?: string;
    description?: Array<{ children?: Array<{ text?: string }> }>;
    features?: string[];
}

// This is a Server Component, so we can make it async
export default async function KreditPage() {
    // Fetch products from Sanity (with cache revalidation)
    const products = await getProductsByCategory('kredit');



    return (
        <main>
            <PageHeader
                title="Produk Kredit"
                description="Solusi pendanaan cepat dan aman untuk wujudkan rencana Anda."
                breadcrumb={[{ label: "Produk", href: "#" }, { label: "Kredit", href: "/produk/kredit" }]}
            />

            <div className="container mx-auto px-4 md:px-6 py-12 bg-gray-50">
                <div className="grid gap-10">
                    {/* Handle empty state */}
                    {products.length === 0 && (
                        <div className="text-center py-10 bg-white rounded-xl shadow-sm">
                            <p className="text-gray-500">Belum ada produk kredit yang ditampilkan saat ini.</p>
                        </div>
                    )}

                    {products.map((product: SanityProduct, index: number) => (
                        <div
                            key={product._id}
                            className={`flex flex-col md:flex-row bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                        >
                            {/* Icon/Image Area */}
                            <div className="bg-blue-900 w-full md:w-1/3 p-10 flex items-center justify-center text-white">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        {/* Since Sanity stores icon name as string, fallback to generic for now */}
                                        <CheckCircle className="h-10 w-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold">{product.title}</h3>
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-8 md:p-10 w-full md:w-2/3 flex flex-col justify-center">
                                <p className="text-gray-600 mb-6 text-lg">
                                    {/* Sanity uses optional chaining safely */}
                                    {product.shortDescription || product.description?.[0]?.children?.[0]?.text || "Deskripsi produk"}
                                </p>

                                <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {product.features?.slice(0, 4).map((feature: string) => (
                                        <div key={feature} className="flex items-center text-sm font-medium text-gray-700">
                                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href={`/produk/kredit/${product.slug}`}
                                    className="inline-flex items-center font-bold text-blue-900 hover:text-amber-600 transition-colors w-fit group"
                                >
                                    Pelajari Selengkapnya
                                    <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <section className="bg-amber-500 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold text-blue-900 mb-4">Bingung Memilih Produk?</h2>
                    <p className="text-blue-900/80 mb-8 max-w-2xl mx-auto">
                        Konsultasikan kebutuhan Anda dengan tim marketing kami. Kami akan merekomendasikan produk pinjaman yang paling sesuai dengan kemampuan Anda.
                    </p>
                    <Link href="/kontak" className="px-8 py-3 bg-white text-blue-900 font-bold rounded-full hover:bg-gray-100 transition shadow-lg">
                        Hubungi Marketing
                    </Link>
                </div>
            </section>
        </main>
    );
}
