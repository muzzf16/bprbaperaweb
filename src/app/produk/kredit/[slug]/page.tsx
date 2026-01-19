import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import { CREDIT_PRODUCTS } from "@/lib/data";
import { Check, FileText, BarChart3, Clock, ArrowLeft } from "lucide-react";
import { Metadata } from "next";

type Props = {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const product = CREDIT_PRODUCTS.find((p) => p.slug === params.slug);

    if (!product) {
        return {
            title: "Produk Tidak Ditemukan",
        };
    }

    return {
        title: `${product.title} - BPR Bapera`,
        description: product.shortDescription,
    };
}

export default function CreditDetailPage({ params }: Props) {
    const product = CREDIT_PRODUCTS.find((p) => p.slug === params.slug);

    if (!product) {
        notFound();
    }

    return (
        <main>
            <PageHeader
                title={product.title}
                description={product.shortDescription}
                breadcrumb={[
                    { label: "Produk", href: "#" },
                    { label: "Kredit", href: "/produk/kredit" },
                    { label: product.title, href: `/produk/kredit/${product.slug}` }
                ]}
            />

            <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 bg-white">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Content */}
                    <div className="lg:w-2/3">
                        <div className="prose max-w-none text-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 mb-4">Deskripsi Produk</h2>
                            <p className="mb-8 leading-relaxed text-lg">
                                {product.description}
                            </p>

                            <h3 className="text-xl font-bold text-gray-900 mb-4">Fitur Utama</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                {product.features.map(f => (
                                    <div key={f} className="flex items-start p-4 bg-gray-50 rounded-lg">
                                        <Check className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                                        <span className="font-medium">{f}</span>
                                    </div>
                                ))}
                            </div>

                            <h3 className="text-xl font-bold text-gray-900 mb-4">Persyaratan Dokumen</h3>
                            <ul className="space-y-3 mb-8">
                                {product.requirements.map(req => (
                                    <li key={req} className="flex items-center text-gray-700">
                                        <div className="h-2 w-2 bg-amber-500 rounded-full mr-3"></div>
                                        {req}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt-10 pt-10 border-t border-gray-100">
                            <Link href="/produk/kredit" className="inline-flex items-center text-gray-500 hover:text-blue-900 font-medium">
                                <ArrowLeft className="h-4 w-4 mr-2" /> Kembali ke Daftar Produk Kredit
                            </Link>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="lg:w-1/3">
                        <div className="bg-blue-900 text-white p-8 rounded-2xl shadow-xl sticky top-24">
                            <h3 className="text-xl font-bold mb-6 border-b border-blue-700 pb-4">Informasi Produk</h3>

                            <div className="space-y-6">
                                <div className="flex items-start">
                                    <BarChart3 className="h-6 w-6 text-amber-400 mr-4 flex-shrink-0" />
                                    <div>
                                        <p className="text-blue-200 text-sm">Suku Bunga</p>
                                        <p className="font-bold text-lg">{product.interestRate}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <Clock className="h-6 w-6 text-amber-400 mr-4 flex-shrink-0" />
                                    <div>
                                        <p className="text-blue-200 text-sm">Jangka Waktu</p>
                                        <p className="font-bold text-lg">{product.minTenor} s/d {product.maxTenor}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <FileText className="h-6 w-6 text-amber-400 mr-4 flex-shrink-0" />
                                    <div>
                                        <p className="text-blue-200 text-sm">Syarat Mudah</p>
                                        <p className="font-bold text-lg">Proses 3-5 Hari Kerja</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-blue-800">
                                <Link
                                    href="/simulasi-kredit"
                                    className="block w-full py-3 bg-amber-500 hover:bg-amber-400 text-blue-900 font-bold text-center rounded-lg transition mb-3"
                                >
                                    Simulasi Angsuran
                                </Link>
                                <Link
                                    href="/kontak"
                                    className="block w-full py-3 bg-transparent border border-white hover:bg-white/10 text-white font-bold text-center rounded-lg transition"
                                >
                                    Ajukan Sekarang
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
