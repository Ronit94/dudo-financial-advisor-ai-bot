// src/app/api/auth/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();

  console.log(`email from google callback:`, body?.userCred?.user?.email);
  console.log(`name from google callback:`, body?.userCred?.user?.displayName);
  // Clear PKCE verifier cookie
  (await
    // Clear PKCE verifier cookie
    cookies()).set("pkce_verifier", "", { maxAge: 0 });

  if (body?.userCred?.user?.stsTokenManager?.accessToken) {
     (await cookies()).set(
      "access_token", body?.userCred?.user?.stsTokenManager?.accessToken, {
      "httpOnly": false, // set to true if you only want server to read it
      "secure": process.env.NODE_ENV === "production",
      "sameSite": "lax",
      "path": "/"
    });
    (await cookies()).set("login_method", "google", {
      "httpOnly": false, // set to true if you only want server to read it
      "secure": process.env.NODE_ENV === "production",
      "sameSite": "lax",
      "path": "/"
    });
  }

  fetch(`${process.env.NEXTAUTH_URL}/api/user/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: body?.userCred?.user?.email,
      name: body?.userCred?.user?.displayName,
      role: body?.role || "user",
      provider: "google"
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("User registered:", data);
    })
    .catch((err) => {
      console.error("Error registering user:", err);
    });

  return NextResponse.json({ success: true, email: body?.user?.email});
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Missing authorization token" },
      { status: 400 }
    );
  }


  console.log("google token response:", token);

  // Prepare redirect response
  const res = NextResponse.redirect(new URL("/dashboard", req.url));

  // Clear PKCE verifier cookie
  res.cookies.set("pkce_verifier", "", { maxAge: 0 });

  // Save access token (⚠️ in production use server-side sessions instead)
  if (token) {
    res.cookies.set("access_token", token, {
      httpOnly: false, // set to true if you only want server to read it
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  return res;
}