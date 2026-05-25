import { NextResponse } from "next/server";
import { readPages, writePages, generateCmsId } from "@/lib/local-cms";
import { isAuthenticated } from "@/app/api/cms/auth/route";

export async function GET() {
  try {
    const pages = await readPages();
    return NextResponse.json(pages);
  } catch (error) {
    return NextResponse.json({ error: "Unable to read CMS pages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const page = await request.json();
    const pages = await readPages();
    const newPage = {
      ...page,
      id: generateCmsId("page"),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    pages.push(newPage);
    await writePages(pages);
    return NextResponse.json({ success: true, page: newPage });
  } catch (error) {
    return NextResponse.json({ error: "Unable to save page" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updatedPage = await request.json();
    const pages = await readPages();
    const index = pages.findIndex((page) => page.id === updatedPage.id);
    if (index === -1) {
      return NextResponse.json({ error: "Page not found" }, { status: 404 });
    }
    pages[index] = {
      ...pages[index],
      ...updatedPage,
      updatedAt: new Date().toISOString(),
    };
    await writePages(pages);
    return NextResponse.json({ success: true, page: pages[index] });
  } catch (error) {
    return NextResponse.json({ error: "Unable to update page" }, { status: 500 });
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
      return NextResponse.json({ error: "Page id is required" }, { status: 400 });
    }
    const pages = await readPages();
    const filtered = pages.filter((page) => page.id !== id);
    await writePages(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Unable to delete page" }, { status: 500 });
  }
}
