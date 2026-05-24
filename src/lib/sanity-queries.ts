import { readProducts, readArticles } from "./custom-db";

/**
 * Custom Local DB Queries
 * 
 * Replaces remote Sanity CMS GROQ queries with local, zero-dependency,
 * extremely fast file-system reads from our custom JSON database.
 */

// Query to get all products by category
export const getProductsByCategory = async (category: string) => {
    try {
        const products = await readProducts();
        return products.filter((p) => p.category === category);
    } catch (e) {
        console.error("Local DB read error", e);
        return [];
    }
};

// Query to get single product by slug
export const getProductBySlug = async (slug: string) => {
    try {
        const products = await readProducts();
        return products.find((p) => p.slug === slug) || null;
    } catch (e) {
        console.error("Local DB read error", e);
        return null;
    }
};

// Query to get all articles
export const getArticles = async () => {
    try {
        const articles = await readArticles();
        return articles;
    } catch (e) {
        console.error("Local DB read error", e);
        return [];
    }
};

// Query to get single article by slug
export const getArticleBySlug = async (slug: string) => {
    try {
        const articles = await readArticles();
        return articles.find((a) => a.slug === slug) || null;
    } catch (e) {
        console.error("Local DB read error", e);
        return null;
    }
};
