// src/app/api/auth/callback/route.ts
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const codeVerifier = req.cookies.get("pkce_verifier")?.value;

  if (!code || !codeVerifier) {
    return NextResponse.json(
      { error: "Missing authorization code or PKCE verifier" },
      { status: 400 }
    );
  }

  // Exchange code + verifier for access token
  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Accept: "application/json",
    },
    body: new URLSearchParams({
      client_id: process.env.AUTH_GITHUB_ID!,
      client_secret: process.env.AUTH_GITHUB_SECRET!,
      code,
      redirect_uri: "http://localhost:3000/api/auth/callback/github",
      grant_type: "authorization_code",
      code_verifier: codeVerifier,
    }),
  });

  const data = await tokenRes.json();

  console.log("GitHub token response:", data);

  // Prepare redirect response
  const res = NextResponse.redirect(new URL("/dashboard", req.url));

  // Clear PKCE verifier cookie
  res.cookies.set("pkce_verifier", "", { maxAge: 0 });

  // Save access token (⚠️ in production use server-side sessions instead)
  if (data.access_token) {
    (await cookies()).set("access_token", data.access_token, {
      httpOnly: false, // set to true if you only want server to read it
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
    (await cookies()).set("login_method", "github", {
      httpOnly: false, // set to true if you only want server to read it
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  return res;
}
