import { NextResponse } from "next/server";
import { readReports, writeReports } from "@/lib/custom-db";

// Helper to check authentication
function isAuthenticated(request: Request): boolean {
    const cookieHeader = request.headers.get("cookie") || "";
    return cookieHeader.includes("admin_session=bapera_active_auth_token");
}

export async function GET(request: Request) {
    try {
        const reports = await readReports();
        return NextResponse.json(reports);
    } catch (e) {
        return NextResponse.json({ error: "Failed to read reports" }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!isAuthenticated(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const newReport = await request.json();
        const reports = await readReports();
        
        newReport.id = `rep-${Date.now()}`;
        
        reports.push(newReport);
        await writeReports(reports);
        return NextResponse.json({ success: true, report: newReport });
    } catch (e) {
        return NextResponse.json({ error: "Failed to save report" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    if (!isAuthenticated(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    try {
        const updatedReport = await request.json();
        const reports = await readReports();
        
        const index = reports.findIndex((r) => r.id === updatedReport.id);
        if (index === -1) {
            return NextResponse.json({ error: "Report not found" }, { status: 404 });
        }
        
        reports[index] = { ...reports[index], ...updatedReport };
        await writeReports(reports);
        return NextResponse.json({ success: true, report: reports[index] });
    } catch (e) {
        return NextResponse.json({ error: "Failed to update report" }, { status: 500 });
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
        
        let reports = await readReports();
        const index = reports.findIndex((r) => r.id === id);
        if (index === -1) {
            return NextResponse.json({ error: "Report not found" }, { status: 404 });
        }
        
        reports = reports.filter((r) => r.id !== id);
        await writeReports(reports);
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: "Failed to delete report" }, { status: 500 });
    }
}
