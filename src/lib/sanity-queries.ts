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

// Query to get site global settings (branding, theme, logos)
export const getSiteSettings = async () => {
    return {
        title: "PT BPR Bapera Batang",
        description: "Bank Perekonomian Rakyat Terpercaya di Kabupaten Batang",
        branding: {
            primaryColor: "#091b40",
            accentColor: "#f59e0b"
        }
    };
};

// Query to get interest rates
export const getInterestRates = async () => {
    return [
        { _id: "int-1", productName: "Tabungan Utama", rate: "2.50% p.a.", minBalance: "Rp 100.000", type: "tabungan" },
        { _id: "int-2", productName: "Tabungan Kencana", rate: "3.50% p.a.", minBalance: "Rp 1.000.000", type: "tabungan" },
        { _id: "int-3", productName: "Deposito Berjangka 1 Bulan", rate: "5.00% p.a.", minBalance: "Rp 5.000.000", type: "deposito", period: "1 Bulan" },
        { _id: "int-4", productName: "Deposito Berjangka 3 Bulan", rate: "5.75% p.a.", minBalance: "Rp 5.000.000", type: "deposito", period: "3 Bulan" },
        { _id: "int-5", productName: "Deposito Berjangka 6 Bulan", rate: "6.25% p.a.", minBalance: "Rp 5.000.000", type: "deposito", period: "6 Bulan" },
        { _id: "int-6", productName: "Deposito Berjangka 12 Bulan", rate: "6.75% p.a.", minBalance: "Rp 5.000.000", type: "deposito", period: "12 Bulan" }
    ];
};
