import Link from "next/link";
import { notFound } from "next/navigation";
import PageHeader from "@/components/layout/PageHeader";
import { ARTICLES } from "@/lib/data";
import { Calendar, User, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";
import { Metadata } from "next";

type Props = {
    params: { slug: string }
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    const article = ARTICLES.find((a) => a.slug === params.slug);

    if (!article) {
        return {
            title: "Artikel Tidak Ditemukan",
        };
    }

    return {
        title: `${article.title} - BPR Bapera`,
        description: article.excerpt,
    };
}

export default function ArticleDetailPage({ params }: Props) {
    const article = ARTICLES.find((a) => a.slug === params.slug);

    if (!article) {
        notFound();
    }

    return (
        <main>
            <PageHeader
                title={article.category}
                breadcrumb={[
                    { label: "Artikel", href: "/artikel-edukasi" },
                    { label: "Baca", href: "#" }
                ]}
            />

            <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 bg-white">
                <div className="max-w-3xl mx-auto">
                    {/* Meta Top */}
                    <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center text-amber-600 font-bold uppercase tracking-wider">
                            {article.category}
                        </span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2" />
                            {article.publishedAt}
                        </span>
                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                        <span className="flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            Admin BPR
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
                        {article.title}
                    </h1>

                    {/* Featured Image */}
                    <div className="relative h-[250px] md:h-[400px] w-full rounded-2xl overflow-hidden mb-10 bg-gray-200">
                        <Image
                            src={`https://placehold.co/800x600/1e3a8a/orange?text=${encodeURIComponent(article.title)}`}
                            alt={article.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div
                        className="prose prose-lg max-w-none text-gray-700 mb-12"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/* Share */}
                    <div className="border-t border-b border-gray-100 py-6 mb-12 flex items-center justify-between">
                        <span className="font-bold text-gray-900 flex items-center">
                            <Share2 className="h-5 w-5 mr-2" /> Bagikan Artikel
                        </span>
                        <div className="flex space-x-4">
                            <button className="p-2 bg-blue-50 text-blue-900 rounded-full hover:bg-blue-100 transition"><Facebook className="h-4 w-4" /></button>
                            <button className="p-2 bg-blue-50 text-blue-400 rounded-full hover:bg-blue-100 transition"><Twitter className="h-4 w-4" /></button>
                            <button className="p-2 bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition"><Linkedin className="h-4 w-4" /></button>
                        </div>
                    </div>

                    {/* Other Articles */}
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Artikel Lainnya</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {ARTICLES.filter(a => a.id !== article.id).slice(0, 2).map((other) => (
                                <Link key={other.id} href={`/artikel-edukasi/${other.slug}`} className="group block bg-gray-50 rounded-xl p-4 hover:bg-blue-50 transition border border-gray-100">
                                    <span className="text-xs text-amber-600 font-bold uppercase mb-2 block">{other.category}</span>
                                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-blue-900 transition-colors mb-2">
                                        {other.title}
                                    </h4>
                                    <p className="text-sm text-gray-500 line-clamp-2">{other.excerpt}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
