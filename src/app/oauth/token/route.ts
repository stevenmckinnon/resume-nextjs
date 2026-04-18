import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const ISSUER = "https://stevemckinnon.co.uk";
const SECRET =
  process.env.OAUTH_JWT_SECRET ?? "portfolio-secret-replace-in-production";

function b64url(input: string | Buffer): string {
  const buf = typeof input === "string" ? Buffer.from(input) : input;
  return buf.toString("base64url");
}

function signJWT(payload: Record<string, unknown>): string {
  const header = b64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = b64url(JSON.stringify(payload));
  const sig = createHmac("sha256", SECRET)
    .update(`${header}.${body}`)
    .digest("base64url");
  return `${header}.${body}.${sig}`;
}

async function parseGrant(request: NextRequest): Promise<string | null> {
  const ct = request.headers.get("content-type") ?? "";
  if (ct.includes("application/x-www-form-urlencoded")) {
    const text = await request.text();
    return new URLSearchParams(text).get("grant_type");
  }
  try {
    const json = await request.json();
    return json.grant_type ?? null;
  } catch {
    return null;
  }
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function POST(request: NextRequest) {
  const grantType = await parseGrant(request);

  if (grantType !== "client_credentials") {
    return NextResponse.json(
      { error: "unsupported_grant_type" },
      { status: 400, headers: CORS },
    );
  }

  const now = Math.floor(Date.now() / 1000);
  const token = signJWT({
    iss: ISSUER,
    sub: "mcp-client",
    aud: ISSUER,
    iat: now,
    exp: now + 3600,
    scope: "mcp:read",
  });

  return NextResponse.json(
    {
      access_token: token,
      token_type: "Bearer",
      expires_in: 3600,
      scope: "mcp:read",
    },
    { headers: CORS },
  );
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}
