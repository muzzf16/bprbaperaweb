export type CmsPageStatus = "draft" | "published";

export type CmsBlockType =
  | "hero"
  | "text"
  | "image"
  | "productGrid"
  | "articleList"
  | "testimonial"
  | "cta"
  | "spacer"
  | "featureGrid"
  | "customHtml"
  | "gallery"
  | "faq";

export interface CmsSeo {
  title: string;
  description: string;
  ogImage?: string;
  canonical?: string;
}

export interface CmsBlock {
  id: string;
  type: CmsBlockType;
  props: Record<string, unknown>;
  variant?: string;
}

export interface CmsSection {
  id: string;
  type: string;
  title?: string;
  settings?: Record<string, unknown>;
  blocks: CmsBlock[];
}

export interface CmsPage {
  id: string;
  slug: string;
  title: string;
  status: CmsPageStatus;
  seo: CmsSeo;
  sections: CmsSection[];
  createdAt: string;
  updatedAt: string;
  metadata?: Record<string, unknown>;
}

export interface CmsAsset {
  id: string;
  type: "image" | "file";
  path: string;
  name: string;
  altText?: string;
  createdAt: string;
}

export interface CmsTemplate {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  sections: CmsSection[];
}
