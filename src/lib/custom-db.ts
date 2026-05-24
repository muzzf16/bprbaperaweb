import fs from "fs/promises";
import path from "path";

// Define paths to database files
const DB_DIR = path.join(process.cwd(), "src", "data", "db");
const PRODUCTS_PATH = path.join(DB_DIR, "products.json");
const ARTICLES_PATH = path.join(DB_DIR, "articles.json");
const COMPANY_PATH = path.join(DB_DIR, "company.json");
const REPORTS_PATH = path.join(DB_DIR, "reports.json");

// Helper to ensure database files exist (fallback seed check)
async function ensureDb() {
    try {
        await fs.mkdir(DB_DIR, { recursive: true });
    } catch (e) {
        // Ignore
    }
}

// 1. Products Operations
export async function readProducts(): Promise<any[]> {
    await ensureDb();
    try {
        const data = await fs.readFile(PRODUCTS_PATH, "utf-8");
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

export async function writeProducts(products: any[]): Promise<void> {
    await ensureDb();
    await fs.writeFile(PRODUCTS_PATH, JSON.stringify(products, null, 4), "utf-8");
}

// 2. Articles Operations
export async function readArticles(): Promise<any[]> {
    await ensureDb();
    try {
        const data = await fs.readFile(ARTICLES_PATH, "utf-8");
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
}

export async function writeArticles(articles: any[]): Promise<void> {
    await ensureDb();
    await fs.writeFile(ARTICLES_PATH, JSON.stringify(articles, null, 4), "utf-8");
}

// 3. Company & Custom Layout Operations
export async function readCompany(): Promise<any> {
    await ensureDb();
    try {
        const data = await fs.readFile(COMPANY_PATH, "utf-8");
        return JSON.parse(data);
    } catch (e) {
        return {};
    }
}

export async function writeCompany(company: any): Promise<void> {
    await ensureDb();
    await fs.writeFile(COMPANY_PATH, JSON.stringify(company, null, 4), "utf-8");
}

// 4. Reports Operations
export async function readReports(): Promise<any[]> {
    await ensureDb();
    try {
        const data = await fs.readFile(REPORTS_PATH, "utf-8");
        return JSON.parse(data);
    } catch (e) {
        // Fallback seed reports
        const seedReports = [
            { id: "rep-1", type: "keuangan", year: "2024", period: "Triwulan 1", title: "Laporan Keuangan Publikasi Maret 2024", fileUrl: "#" },
            { id: "rep-2", type: "keuangan", year: "2023", period: "Tahunan", title: "Laporan Keuangan Audit Desember 2023", fileUrl: "#" },
            { id: "rep-3", type: "keuangan", year: "2023", period: "Triwulan 3", title: "Laporan Keuangan Publikasi September 2023", fileUrl: "#" },
            { id: "rep-4", type: "keuangan", year: "2023", period: "Triwulan 2", title: "Laporan Keuangan Publikasi Juni 2023", fileUrl: "#" },
            { id: "rep-5", type: "gcg", year: "2023", title: "Laporan GCG Tahun 2023", fileUrl: "#" },
            { id: "rep-6", type: "gcg", year: "2022", title: "Laporan GCG Tahun 2022", fileUrl: "#" },
            { id: "rep-7", type: "gcg", year: "2021", title: "Laporan GCG Tahun 2021", fileUrl: "#" }
        ];
        await fs.writeFile(REPORTS_PATH, JSON.stringify(seedReports, null, 4), "utf-8");
        return seedReports;
    }
}

export async function writeReports(reports: any[]): Promise<void> {
    await ensureDb();
    await fs.writeFile(REPORTS_PATH, JSON.stringify(reports, null, 4), "utf-8");
}
