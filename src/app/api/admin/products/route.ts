import { NextResponse } from "next/server";
import { readProducts, writeProducts } from "@/lib/custom-db";

// Helper to check authentication
function isAuthenticated(request: Request): boolean {
    const cookieHeader = request.headers.get("cookie") || "";
    return cookieHeader.includes("admin_session=bapera_active_auth_token");
}

export async function GET(request: Request) {
    try {
        const products = await readProducts();
        return NextResponse.json(products);
    } catch (e) {
        return NextResponse.json({ error: "Failed to read products" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!isAuthenticated(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const newProduct = await request.json();
        const products = await readProducts();
        
        // Generate random or custom ID based on slug
        newProduct.id = newProduct.slug || `prod-${Date.now()}`;
        
        products.push(newProduct);
        await writeProducts(products);
        return NextResponse.json({ success: true, product: newProduct });
    } catch (e) {
        return NextResponse.json({ error: "Failed to save product" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    if (!isAuthenticated(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const updatedProduct = await request.json();
        const products = await readProducts();
        
        const index = products.findIndex((p) => p.id === updatedProduct.id || p.slug === updatedProduct.slug);
        if (index === -1) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        
        products[index] = { ...products[index], ...updatedProduct };
        await writeProducts(products);
        return NextResponse.json({ success: true, product: products[index] });
    } catch (e) {
        return NextResponse.json({ error: "Failed to update product" }, { status: 500 });
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
        
        let products = await readProducts();
        const index = products.findIndex((p) => p.id === id);
        if (index === -1) {
            return NextResponse.json({ error: "Product not found" }, { status: 404 });
        }
        
        products = products.filter((p) => p.id !== id);
        await writeProducts(products);
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Failed to delete product" }, { status: 500 });
    }
}
