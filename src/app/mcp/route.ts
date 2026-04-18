import { DATA } from "@/data/resume";
import { NextRequest, NextResponse } from "next/server";

const SERVER_INFO = { name: "stevemckinnon-portfolio", version: "1.0.0" };
const PROTOCOL_VERSION = "2024-11-05";

const TOOLS = [
  {
    name: "get_profile",
    description: "Returns Steve McKinnon's professional profile and summary",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_experience",
    description: "Returns Steve McKinnon's full work experience history",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_skills",
    description: "Returns Steve McKinnon's technical skills",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_projects",
    description: "Returns Steve McKinnon's notable projects",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
  {
    name: "get_contact",
    description: "Returns Steve McKinnon's contact information",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
  },
];

function callTool(name: string): string {
  switch (name) {
    case "get_profile":
      return `# ${DATA.name}\n\n**${DATA.description}**\n\n${DATA.summary}\n\n📍 ${DATA.location}`;

    case "get_experience":
      return DATA.work
        .map((w) => {
          const desc = Array.isArray(w.description)
            ? w.description.map((d) => `- ${d}`).join("\n")
            : (w.description ?? "");
          return `## ${w.title} at ${w.company}\n${w.start}${w.end ? ` – ${w.end}` : " – Present"}\n\n${desc}`;
        })
        .join("\n\n");

    case "get_skills":
      return DATA.skills.map((s) => s.name).join(", ");

    case "get_projects":
      return DATA.projects
        .map(
          (p) =>
            `## ${p.name}\n${p.description}${p.website ? `\nWebsite: ${p.website}` : ""}${p.github ? `\nGitHub: ${p.github}` : ""}`,
        )
        .join("\n\n");

    case "get_contact":
      return [
        `Email: ${DATA.contact.email}`,
        ...Object.values(DATA.contact.social).map((s) => `${s.name}: ${s.url}`),
      ].join("\n");

    default:
      throw new Error("Unknown tool");
  }
}

type JsonRpcRequest = {
  jsonrpc: "2.0";
  id?: string | number | null;
  method: string;
  params?: unknown;
};

function handleMessage(msg: JsonRpcRequest): object | null {
  const { id, method } = msg;

  // Notifications have no id — no response
  if (id === undefined) return null;

  switch (method) {
    case "initialize":
      return {
        jsonrpc: "2.0",
        id,
        result: {
          protocolVersion: PROTOCOL_VERSION,
          capabilities: { tools: {} },
          serverInfo: SERVER_INFO,
        },
      };

    case "ping":
      return { jsonrpc: "2.0", id, result: {} };

    case "tools/list":
      return { jsonrpc: "2.0", id, result: { tools: TOOLS } };

    case "tools/call": {
      const { name } = (msg.params ?? {}) as { name?: string };
      if (!name) {
        return { jsonrpc: "2.0", id, error: { code: -32602, message: "Missing tool name" } };
      }
      try {
        const text = callTool(name);
        return { jsonrpc: "2.0", id, result: { content: [{ type: "text", text }] } };
      } catch {
        return { jsonrpc: "2.0", id, error: { code: -32601, message: "Tool not found" } };
      }
    }

    default:
      return { jsonrpc: "2.0", id, error: { code: -32601, message: "Method not found" } };
  }
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, mcp-session-id",
};

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (Array.isArray(body)) {
    const responses = body.map(handleMessage).filter(Boolean);
    return NextResponse.json(responses, { headers: CORS_HEADERS });
  }

  const response = handleMessage(body);
  if (!response) {
    return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
  }

  return NextResponse.json(response, { headers: CORS_HEADERS });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}
