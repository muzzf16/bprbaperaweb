import fs from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";
import { readAssets, writeAssets, generateCmsId } from "@/lib/local-cms";
import { isAuthenticated } from "@/app/api/cms/auth/route";

const PUBLIC_UPLOADS = path.join(process.cwd(), "public", "uploads");

async function ensureUploadFolder() {
  await fs.mkdir(PUBLIC_UPLOADS, { recursive: true });
}

function safeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").toLowerCase();
}

export async function GET() {
  try {
    const assets = await readAssets();
    return NextResponse.json(assets);
  } catch (error) {
    return NextResponse.json({ error: "Unable to read assets" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const contentType = request.headers.get("content-type") || "";
    let assetData: any;

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      const name = String(formData.get("name") || "uploaded-asset");
      const altText = String(formData.get("altText") || "");
      const type = String(formData.get("type") || "file") as "image" | "file";

      if (!file || !(file instanceof Blob)) {
        return NextResponse.json({ error: "File is required" }, { status: 400 });
      }

      await ensureUploadFolder();
      const filename = `${Date.now()}-${safeFilename(String(file.name))}`;
      const targetPath = path.join(PUBLIC_UPLOADS, filename);
      const buffer = Buffer.from(await file.arrayBuffer());
      await fs.writeFile(targetPath, buffer);

      assetData = {
        name,
        altText,
        type,
        path: `/uploads/${filename}`,
      };
    } else {
      assetData = await request.json();
    }

    const assets = await readAssets();
    const newAsset = {
      ...assetData,
      id: generateCmsId("asset"),
      createdAt: new Date().toISOString(),
    };
    assets.push(newAsset);
    await writeAssets(assets);
    return NextResponse.json({ success: true, asset: newAsset });
  } catch (error) {
    return NextResponse.json({ error: "Unable to save asset" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Asset id is required" }, { status: 400 });
    }
    const assets = await readAssets();
    const filtered = assets.filter((asset) => asset.id !== id);
    await writeAssets(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Unable to delete asset" }, { status: 500 });
  }
}
