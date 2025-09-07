// src/app/api/auth/login/route.ts
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

function base64URLEncode(buffer: Buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function generateCodeVerifier() {
  return base64URLEncode(crypto.randomBytes(32)); // ~43 chars
}

function generateCodeChallenge(verifier: string) {
  return base64URLEncode(
    crypto.createHash("sha256").update(verifier).digest()
  );
}

export async function GET(req: NextRequest) {
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = generateCodeChallenge(codeVerifier);
  console.log(req)

  // Store verifier in a cookie
  const res = NextResponse.redirect(
    `https://github.com/login/oauth/authorize?` +
      new URLSearchParams({
        client_id: process.env.AUTH_GITHUB_ID!,
        redirect_uri: "http://localhost:3000/api/auth/callback/github",
        scope: "read:user user:email",
        state: crypto.randomBytes(16).toString("hex"),
        response_type: "code",
        code_challenge: codeChallenge,
        code_challenge_method: "S256",
      }).toString()
  );

  res.cookies.set("pkce_verifier", codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  return res;
}