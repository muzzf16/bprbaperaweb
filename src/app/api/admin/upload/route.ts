import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

// Helper to check authentication
function isAuthenticated(request: Request): boolean {
    const cookieHeader = request.headers.get("cookie") || "";
    return cookieHeader.includes("admin_session=bapera_active_auth_token");
}

export async function POST(request: Request) {
    if (!isAuthenticated(request)) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    try {
        const formData = await request.formData();
        const file = formData.get("file") as Blob | null;
        const uploadType = formData.get("type") as string | null; // "product" | "report"
        
        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }
        
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Define directory based on upload type
        const uploadSubdir = uploadType === "report" ? "reports" : "uploads";
        const uploadDir = path.join(process.cwd(), "public", uploadSubdir);
        
        // Ensure directory exists
        await fs.mkdir(uploadDir, { recursive: true });
        
        // Create unique name
        const originalName = (file as any).name || "file";
        const sanitizedName = originalName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
        const uniqueFileName = `${Date.now()}_${sanitizedName}`;
        const filePath = path.join(uploadDir, uniqueFileName);
        
        // Write file
        await fs.writeFile(filePath, buffer);
        
        const fileUrl = `/${uploadSubdir}/${uniqueFileName}`;
        return NextResponse.json({ success: true, fileUrl });
        
    } catch (e) {
        console.error("Upload error", e);
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }
}
