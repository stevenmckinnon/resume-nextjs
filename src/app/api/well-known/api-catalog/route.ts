import { NextResponse } from "next/server";

const BASE = "https://stevemckinnon.co.uk";
const IANA = "https://www.iana.org/assignments/relation";

export async function GET() {
  const catalog = {
    linkset: [
      {
        anchor: BASE,
        [`${IANA}/describedby`]: [
          { href: `${BASE}/.well-known/agent-skills/index.json`, type: "application/json" },
        ],
        [`${IANA}/service-doc`]: [
          { href: BASE, type: "text/html" },
        ],
      },
      {
        anchor: `${BASE}/api/send`,
        [`${IANA}/service-doc`]: [
          { href: BASE, type: "text/html" },
        ],
      },
      {
        anchor: `${BASE}/mcp`,
        [`${IANA}/service-desc`]: [
          { href: `${BASE}/.well-known/mcp/server-card.json`, type: "application/json" },
        ],
      },
    ],
  };

  return new NextResponse(JSON.stringify(catalog, null, 2), {
    headers: {
      "Content-Type": "application/linkset+json",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
