import { NextResponse } from "next/server";
import { readArticles, writeArticles } from "@/lib/custom-db";

function isAuthenticated(request: Request): boolean {
    const cookieHeader = request.headers.get("cookie") || "";
    return cookieHeader.includes("admin_session=bapera_active_auth_token");
}

export async function GET() {
    try {
        const articles = await readArticles();
        return NextResponse.json(articles);
    } catch (e) {
        return NextResponse.json({ error: "Failed to read articles" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!isAuthenticated(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const newArticle = await request.json();
        const articles = await readArticles();
        
        newArticle.id = newArticle.slug || `art-${Date.now()}`;
        newArticle.publishedAt = new Date().toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
        
        articles.unshift(newArticle);
        await writeArticles(articles);
        return NextResponse.json({ success: true, article: newArticle });
    } catch (e) {
        return NextResponse.json({ error: "Failed to save article" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    if (!isAuthenticated(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const updatedArticle = await request.json();
        const articles = await readArticles();
        
        const index = articles.findIndex((a) => a.id === updatedArticle.id || a.slug === updatedArticle.slug);
        if (index === -1) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }
        
        articles[index] = { ...articles[index], ...updatedArticle };
        await writeArticles(articles);
        return NextResponse.json({ success: true, article: articles[index] });
    } catch (e) {
        return NextResponse.json({ error: "Failed to update article" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    if (!isAuthenticated(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        if (!id) {
            return NextResponse.json({ error: "ID required" }, { status: 400 });
        }
        
        let articles = await readArticles();
        const index = articles.findIndex((a) => a.id === id);
        if (index === -1) {
            return NextResponse.json({ error: "Article not found" }, { status: 404 });
        }
        
        articles = articles.filter((a) => a.id !== id);
        await writeArticles(articles);
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Failed to delete article" }, { status: 500 });
    }
}
