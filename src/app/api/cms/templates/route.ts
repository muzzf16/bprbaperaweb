import { NextResponse } from "next/server";
import { readTemplates, writeTemplates, generateCmsId } from "@/lib/local-cms";
import { isAuthenticated } from "@/app/api/cms/auth/route";

export async function GET() {
  try {
    const templates = await readTemplates();
    return NextResponse.json(templates);
  } catch (error) {
    return NextResponse.json({ error: "Unable to read templates" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const template = await request.json();
    const templates = await readTemplates();
    const newTemplate = {
      ...template,
      id: generateCmsId("template"),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    templates.push(newTemplate);
    await writeTemplates(templates);
    return NextResponse.json({ success: true, template: newTemplate });
  } catch (error) {
    return NextResponse.json({ error: "Unable to save template" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updatedTemplate = await request.json();
    const templates = await readTemplates();
    const index = templates.findIndex((template) => template.id === updatedTemplate.id);
    if (index === -1) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }
    templates[index] = {
      ...templates[index],
      ...updatedTemplate,
      updatedAt: new Date().toISOString(),
    };
    await writeTemplates(templates);
    return NextResponse.json({ success: true, template: templates[index] });
  } catch (error) {
    return NextResponse.json({ error: "Unable to update template" }, { status: 500 });
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
      return NextResponse.json({ error: "Template id is required" }, { status: 400 });
    }
    const templates = await readTemplates();
    const filtered = templates.filter((template) => template.id !== id);
    await writeTemplates(filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Unable to delete template" }, { status: 500 });
  }
}
