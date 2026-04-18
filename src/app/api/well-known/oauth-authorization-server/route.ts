import { NextResponse } from "next/server";

const BASE = "https://stevemckinnon.co.uk";

export async function GET() {
  return NextResponse.json(
    {
      issuer: BASE,
      authorization_endpoint: `${BASE}/oauth/authorize`,
      token_endpoint: `${BASE}/oauth/token`,
      jwks_uri: `${BASE}/oauth/jwks`,
      grant_types_supported: ["client_credentials"],
      response_types_supported: ["code"],
      token_endpoint_auth_methods_supported: ["none"],
      scopes_supported: ["mcp:read"],
      response_modes_supported: ["query"],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
