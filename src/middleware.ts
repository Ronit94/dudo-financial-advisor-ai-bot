// middleware.ts
import { NextResponse, NextRequest } from "next/server";
// import { adminAuth } from "./lib/firebaseAdmin";

const PROTECTED_ROUTES = ["/dashboard", "/profile", "/settings"];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value; // assume Firebase ID token stored in cookie
  
  const { pathname } = request.nextUrl;

  // Only check protected routes
  if (PROTECTED_ROUTES.some((route) => pathname.startsWith(route))) {
    try {
      if (!token) throw new Error("No token");
    
    //   await adminAuth.verifyIdToken(token);
      return NextResponse.next();
    } catch (err) {
      console.error("Auth error:", err);
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/settings/:path*"], // which routes middleware applies to
};