import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        
        // Simple secure local credentials (can be updated by user)
        if (username === "admin" && password === "bapera123") {
            const response = NextResponse.json({ success: true, message: "Login successful!" });
            
            // Set cookie for session persistence (lasts 1 day)
            response.cookies.set("admin_session", "bapera_active_auth_token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 60 * 60 * 24, // 24 hours
                path: "/"
            });
            
            return response;
        }
        
        return NextResponse.json({ success: false, message: "Username atau password salah!" }, { status: 401 });
    } catch (e) {
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}

export async function GET(request: Request) {
    // Check if session cookie exists
    const cookieHeader = request.headers.get("cookie") || "";
    if (cookieHeader.includes("admin_session=bapera_active_auth_token")) {
        return NextResponse.json({ authenticated: true });
    }
    return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function DELETE() {
    const response = NextResponse.json({ success: true, message: "Logged out!" });
    response.cookies.set("admin_session", "", { maxAge: 0, path: "/" });
    return response;
}
