import fs from "fs/promises";
import path from "path";
import type { CmsAsset, CmsPage, CmsTemplate } from "@/types/cms.types";

const DB_DIR = path.join(process.cwd(), "src", "data", "db");
const PAGES_PATH = path.join(DB_DIR, "pages.json");
const TEMPLATES_PATH = path.join(DB_DIR, "templates.json");
const ASSETS_PATH = path.join(DB_DIR, "assets.json");

async function ensureDb() {
  await fs.mkdir(DB_DIR, { recursive: true });
}

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  await ensureDb();
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T;
  } catch {
    await fs.writeFile(filePath, JSON.stringify(fallback, null, 4), "utf-8");
    return fallback;
  }
}

async function writeJson<T>(filePath: string, data: T): Promise<void> {
  await ensureDb();
  await fs.writeFile(filePath, JSON.stringify(data, null, 4), "utf-8");
}

export async function readPages(): Promise<CmsPage[]> {
  return readJson<CmsPage[]>(PAGES_PATH, []);
}

export async function writePages(pages: CmsPage[]): Promise<void> {
  return writeJson(PAGES_PATH, pages);
}

export async function readTemplates(): Promise<CmsTemplate[]> {
  return readJson<CmsTemplate[]>(TEMPLATES_PATH, []);
}

export async function writeTemplates(templates: CmsTemplate[]): Promise<void> {
  return writeJson(TEMPLATES_PATH, templates);
}

export async function readAssets(): Promise<CmsAsset[]> {
  return readJson<CmsAsset[]>(ASSETS_PATH, []);
}

export async function writeAssets(assets: CmsAsset[]): Promise<void> {
  return writeJson(ASSETS_PATH, assets);
}

export function generateCmsId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
}
