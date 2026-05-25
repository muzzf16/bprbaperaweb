import { notFound } from "next/navigation";
import { readPages } from "@/lib/local-cms";
import { renderCmsPage } from "@/lib/page-renderer.tsx";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const pages = await readPages();
  const page = pages.find((item) => item.slug === `/${params.slug}` || item.slug === params.slug);
  if (!page) {
    return { title: "Halaman Tidak Ditemukan" };
  }
  return {
    title: page.seo?.title || page.title,
    description: page.seo?.description || `Halaman ${page.title}`,
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    alternates: {
      canonical: page.seo?.canonical || `/${params.slug}`
    }
  };
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const pages = await readPages();
  const page = pages.find((item) => item.slug === `/${params.slug}` || item.slug === params.slug);

  if (!page || page.status !== "published") {
    notFound();
  }

  return renderCmsPage(page);
}
