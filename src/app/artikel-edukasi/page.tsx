import Link from "next/link";
import PageHeader from "@/components/layout/PageHeader";
import { Calendar, User } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next";
import { getArticles } from "@/lib/sanity-queries";

export const metadata: Metadata = {
    title: "Artikel & Edukasi - BPR Bapera",
    description: "Informasi terkini, tips keuangan, dan berita seputar BPR Bapera.",
};

export default async function ArtikelPage() {
    const articles = await getArticles();

    return (
        <main>
            <PageHeader
                title="Artikel & Edukasi"
                description="Tingkatkan literasi keuangan Anda dengan tips dan informasi bermanfaat."
                breadcrumb={[{ label: "Artikel", href: "/artikel-edukasi" }]}
            />

            <div className="container mx-auto px-4 md:px-6 py-12 bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Empty State */}
                    {articles.length === 0 && (
                        <div className="col-span-full text-center py-12 bg-white rounded-xl shadow-sm">
                            <p className="text-gray-500">Belum ada artikel yang dipublikasikan.</p>
                        </div>
                    )}

                    {articles.map((article: any) => (
                        <article key={article._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 flex flex-col h-full">
                            {/* Placeholder image if no real image */}
                            <div className="h-48 bg-gray-200 relative">
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400 font-medium overflow-hidden">
                                    {article.imageUrl ? (
                                        <Image
                                            src={article.imageUrl}
                                            alt={article.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <span className="opacity-30 p-4 text-center">{article.title}</span>
                                    )}
                                </div>
                                {article.category && (
                                    <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                        {article.category}
                                    </div>
                                )}
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
                                    <span className="flex items-center">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString("id-ID") : "-"}
                                    </span>
                                    <span className="flex items-center">
                                        <User className="h-3 w-3 mr-1" />
                                        {article.author?.name || "Admin"}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-900 transition-colors">
                                    <Link href={`/artikel-edukasi/${article.slug}`}>
                                        {article.title}
                                    </Link>
                                </h3>

                                <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                                    {article.excerpt}
                                </p>

                                <div className="mt-auto">
                                    <Link
                                        href={`/artikel-edukasi/${article.slug}`}
                                        className="text-blue-900 font-semibold text-sm hover:underline"
                                    >
                                        Baca Selengkapnya &rarr;
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </main>
    );
}
