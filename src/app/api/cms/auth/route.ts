import { NextResponse } from "next/server";

const AUTH_TOKEN = "bprbapera_local_admin_token";
const ADMIN_USER = {
  username: "admin",
  password: "admin123",
};

const COOKIE_NAME = "cms_admin_session";
const COOKIE_MAX_AGE = 60 * 60 * 24; // 24 hours

export async function GET() {
  return NextResponse.json({ authenticated: false });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;
    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
      const response = NextResponse.json({ success: true, authenticated: true });
      response.cookies.set({
        name: COOKIE_NAME,
        value: AUTH_TOKEN,
        httpOnly: true,
        maxAge: COOKIE_MAX_AGE,
        path: "/",
      });
      return response;
    }

    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    maxAge: 0,
    path: "/",
  });
  return response;
}

export function isAuthenticated(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  return cookieHeader.includes(`${COOKIE_NAME}=${AUTH_TOKEN}`);
}
