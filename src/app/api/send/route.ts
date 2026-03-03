import { Resend } from "resend";
import { checkBotId } from "botid/server";
import { headers } from "next/headers";
import { z } from "zod";

import EmailTemplate from "@/components/emails/contact";
import type { ReactElement } from "react";
import { DATA } from "@/data/resume";

const resend = new Resend(process.env.RESEND_API_KEY);

// ---------------------------------------------------------------------------
// Rate limiting (in-memory — resets on cold start, sufficient for a portfolio)
// ---------------------------------------------------------------------------
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) return true;

  entry.count++;
  return false;
}

// ---------------------------------------------------------------------------
// Input validation — mirrors the client-side Zod schema
// ---------------------------------------------------------------------------
const contactSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email().min(5).max(100),
  subject: z.string().min(3).max(100),
  message: z.string().min(10).max(1000),
});

// ---------------------------------------------------------------------------
// Sanitization helpers
// ---------------------------------------------------------------------------

/** Strip HTML tags and collapse newlines to a single space. */
function sanitizeLine(value: string): string {
  return value
    .replace(/<[^>]*>/g, "")
    .replace(/[\r\n]+/g, " ")
    .trim();
}

/** Strip HTML tags while preserving newlines (used for the message body). */
function sanitizeBlock(value: string): string {
  return value.replace(/<[^>]*>/g, "").trim();
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function POST(request: Request) {
  const { isBot } = await checkBotId();
  if (isBot) {
    return new Response("Access Denied", { status: 403 });
  }

  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headersList.get("x-real-ip") ??
    "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": "900" } },
    );
  }

  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: "Invalid input", details: result.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const name = sanitizeLine(result.data.name);
    const email = result.data.email.trim();
    const subject = sanitizeLine(result.data.subject);
    const message = sanitizeBlock(result.data.message);

    const { data, error } = await resend.emails.send({
      from: `${name} <noreply@stevenmckinnon.co.uk>`,
      to: [DATA.contact.email],
      subject: subject,
      react: EmailTemplate({
        message,
        name,
        email,
        subject,
      }) as ReactElement<any>,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
