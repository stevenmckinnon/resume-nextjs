import { NextResponse } from "next/server";

const BASE = "https://stevemckinnon.co.uk";

export async function GET() {
  return NextResponse.json(
    {
      resource: BASE,
      authorization_servers: [BASE],
      scopes_supported: ["mcp:read"],
      bearer_methods_supported: ["header"],
    },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
