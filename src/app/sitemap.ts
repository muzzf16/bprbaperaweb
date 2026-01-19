import { MetadataRoute } from 'next';
// In real app, import getProducts/getArticles from lib/sanity

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://bprbapera.co.id';

    // Static routes
    const routes = [
        '',
        '/tentang-kami',
        '/produk/kredit',
        '/produk/tabungan',
        '/produk/deposito',
        '/artikel-edukasi',
        '/simulasi-kredit',
        '/kontak',
        '/compliance/privacy-policy',
        '/compliance/disclaimer',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic routes (placeholder for now until CMS connect)
    /*
    const products = await getProducts();
    const productUrls = products.map((product) => ({
      url: `${baseUrl}/produk/${product.type}/${product.slug}`,
      lastModified: new Date(product.updatedAt),
      changeFrequency: 'weekly',
      priority: 0.9,
    }));
    */

    return [...routes];
}
