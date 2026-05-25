import React from "react";
import Image from "next/image";
import type { CmsPage, CmsSection, CmsBlock } from "@/types/cms.types";

function renderTextBlock(block: CmsBlock) {
  const content = String(block.props?.content || "");
  return (
    <div className="prose prose-invert max-w-none">
      <p>{content}</p>
    </div>
  );
}

function renderImageBlock(block: CmsBlock) {
  const src = String(block.props?.src || block.props?.path || "");
  const alt = String(block.props?.alt || "Image");
  return src ? (
    <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
      <Image src={src} alt={alt} width={1200} height={700} className="w-full h-auto object-cover" unoptimized />
    </div>
  ) : null;
}

function renderCtaBlock(block: CmsBlock) {
  return (
    <div className="rounded-[2rem] bg-amber-500/10 border border-amber-500/20 p-8 text-center">
      <h2 className="text-2xl font-bold text-white mb-3">{String(block.props?.title || "Aksi Tindakan")}</h2>
      <p className="text-slate-300 mb-6">{String(block.props?.description || "Tambahkan ajakan bertindak di sini.")}</p>
      {block.props?.buttonText && block.props?.buttonHref ? (
        <a
          href={String(block.props.buttonHref)}
          className="inline-flex rounded-full bg-amber-500 px-6 py-3 text-sm font-bold text-blue-950 hover:bg-amber-400 transition"
        >
          {String(block.props.buttonText)}
        </a>
      ) : null}
    </div>
  );
}

function renderFeatureGrid(block: CmsBlock) {
  const items = Array.isArray(block.props?.items) ? block.props.items : [];
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {items.map((item: any, index: number) => (
        <div key={index} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
          <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
          <p className="text-slate-400">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

function renderTestimonial(block: CmsBlock) {
  const items = Array.isArray(block.props?.items) ? block.props.items : [];
  return (
    <div className="space-y-6">
      {items.map((item: any, index: number) => (
        <div key={index} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
          <p className="text-slate-300 italic">“{item.quote}”</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-300 font-bold">{item.author?.[0] || "A"}</div>
            <div>
              <p className="text-white font-semibold">{item.author}</p>
              <p className="text-slate-400 text-sm">{item.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function renderProductGrid(block: CmsBlock) {
  const items = Array.isArray(block.props?.items) ? block.props.items : [];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item: any, index: number) => (
        <div key={index} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-400 mb-2">Produk</p>
          <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
          <p className="text-slate-400 mb-4">{item.summary}</p>
          {item.href ? (
            <a href={item.href} className="text-amber-300 text-sm font-semibold hover:text-amber-200">
              Pelajari lebih lanjut →
            </a>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function renderArticleList(block: CmsBlock) {
  const items = Array.isArray(block.props?.items) ? block.props.items : [];
  return (
    <div className="space-y-4">
      {items.map((item: any, index: number) => (
        <article key={index} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5 shadow-lg shadow-black/20">
          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
          <p className="text-slate-400">{item.excerpt}</p>
          {item.href ? (
            <a href={item.href} className="text-amber-300 text-sm font-semibold hover:text-amber-200">
              Baca selengkapnya →
            </a>
          ) : null}
        </article>
      ))}
    </div>
  );
}

function renderSpacer(block: CmsBlock) {
  const height = Number(block.props?.height || 40);
  return <div style={{ height }} className="w-full" />;
}

function renderCustomHtml(block: CmsBlock) {
  const html = String(block.props?.html || "");
  return html ? <div className="prose prose-invert" dangerouslySetInnerHTML={{ __html: html }} /> : null;
}

function renderGallery(block: CmsBlock) {
  const items = Array.isArray(block.props?.items) ? block.props.items : [];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item: any, index: number) => (
        <div key={index} className="overflow-hidden rounded-3xl border border-white/10 bg-slate-950">
          <img src={item.src} alt={item.alt || "Gallery image"} className="h-56 w-full object-cover" />
          <div className="p-4">
            <p className="text-sm font-semibold text-white">{item.caption}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function renderFaq(block: CmsBlock) {
  const items = Array.isArray(block.props?.items) ? block.props.items : [];
  return (
    <div className="space-y-3">
      {items.map((item: any, index: number) => (
        <details key={index} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
          <summary className="cursor-pointer text-white font-semibold">{item.question}</summary>
          <p className="mt-3 text-slate-400">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}

function renderBlock(block: CmsBlock) {
  switch (block.type) {
    case "hero":
      return (
        <div className="rounded-[2.5rem] bg-gradient-to-r from-blue-950 via-slate-900 to-slate-800 p-12 text-white shadow-2xl border border-white/10">
          <h1 className="text-4xl font-extrabold mb-4">{String(block.props?.heading || "Judul Hero")}</h1>
          <p className="text-slate-300 mb-6">{String(block.props?.subheading || "Deskripsi hero singkat untuk pengunjung.")}</p>
          {Array.isArray(block.props?.actions) ? (
            <div className="flex flex-wrap gap-3">
              {block.props.actions.map((action: any, idx: number) => (
                <a
                  key={idx}
                  href={String(action.href || "#")}
                  className="rounded-full bg-amber-500 px-5 py-3 text-sm font-bold text-blue-950 hover:bg-amber-400 transition"
                >
                  {String(action.label || "Tindakan")}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      );
    case "image":
      return renderImageBlock(block);
    case "cta":
      return renderCtaBlock(block);
    case "featureGrid":
      return renderFeatureGrid(block);
    case "testimonial":
      return renderTestimonial(block);
    case "productGrid":
      return renderProductGrid(block);
    case "articleList":
      return renderArticleList(block);
    case "spacer":
      return renderSpacer(block);
    case "customHtml":
      return renderCustomHtml(block);
    case "gallery":
      return renderGallery(block);
    case "faq":
      return renderFaq(block);
    case "text":
    default:
      return renderTextBlock(block);
  }
}

function renderSection(section: CmsSection) {
  return (
    <section key={section.id} className="space-y-6 py-12">
      {section.title ? <h2 className="text-3xl font-bold text-white">{section.title}</h2> : null}
      <div className="space-y-6">
        {section.blocks.map((block) => (
          <div key={block.id}>{renderBlock(block)}</div>
        ))}
      </div>
    </section>
  );
}

export function renderCmsPage(page: CmsPage) {
  return (
    <div className="container mx-auto px-4 py-16">
      <header className="mb-12 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-500 font-semibold">Halaman CMS</p>
        <h1 className="text-5xl font-black text-white mt-4">{page.title}</h1>
      </header>
      <div className="space-y-16">
        {page.sections.map((section) => renderSection(section))}
      </div>
    </div>
  );
}
