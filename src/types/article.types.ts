/**
 * Article/Blog post interface for educational content
 */
export interface Article {
    /** Unique identifier */
    id: string;

    /** URL-friendly slug */
    slug: string;

    /** Article title */
    title: string;

    /** Short excerpt/summary for previews */
    excerpt: string;

    /** Full article content (HTML or markdown) */
    content: string;

    /** Article category (e.g., "Edukasi Keuangan", "Produk") */
    category: string;

    /** Publication date string */
    publishedAt: string;

    /** Featured image path */
    image: string;
}

/**
 * Article category types
 */
export type ArticleCategory = "Edukasi Keuangan" | "Produk" | "Literasi" | "Berita";

/**
 * Article filter for querying
 */
export interface ArticleFilter {
    category?: ArticleCategory;
    limit?: number;
    offset?: number;
}

/**
 * Sanity CMS article response structure
 */
export interface SanityArticle {
    _id: string;
    title: string;
    slug: string;
    excerpt?: string;
    content?: unknown;
    category?: string;
    publishedAt?: string;
    imageUrl?: string;
    author?: {
        name: string;
        imageUrl?: string;
    };
}
