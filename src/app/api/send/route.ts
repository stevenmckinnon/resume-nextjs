import { Resend } from "resend";
import { checkBotId } from "botid/server";

import EmailTemplate from "@/components/emails/contact";
import type { ReactElement } from "react";
import { DATA } from "@/data/resume";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const { isBot } = await checkBotId();

  if (isBot) {
    return new Response("Access Denied", { status: 403 });
  }

  try {
    const { name, email, message, subject } = await request.json();
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
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
