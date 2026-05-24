import { NextResponse } from "next/server";
import { readCompany, writeCompany } from "@/lib/custom-db";

function isAuthenticated(request: Request): boolean {
    const cookieHeader = request.headers.get("cookie") || "";
    return cookieHeader.includes("admin_session=bapera_active_auth_token");
}

export async function GET() {
    try {
        const company = await readCompany();
        return NextResponse.json(company);
    } catch (e) {
        return NextResponse.json({ error: "Failed to read company settings" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    if (!isAuthenticated(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const updatedCompany = await request.json();
        const currentCompany = await readCompany();
        
        const mergedCompany = { ...currentCompany, ...updatedCompany };
        await writeCompany(mergedCompany);
        return NextResponse.json({ success: true, company: mergedCompany });
    } catch (e) {
        return NextResponse.json({ error: "Failed to save company settings" }, { status: 500 });
    }
}
