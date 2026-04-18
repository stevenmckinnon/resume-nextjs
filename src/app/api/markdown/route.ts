import { DATA } from "@/data/resume";
import { NextResponse } from "next/server";

function generateMarkdown(): string {
  const skills = DATA.skills.map((s) => s.name).join(", ");

  const work = DATA.work
    .map((w) => {
      const desc = Array.isArray(w.description)
        ? w.description.map((d) => `- ${d}`).join("\n")
        : w.description ?? "";
      return `### ${w.title} — ${w.company}\n${w.start}${w.end ? ` to ${w.end}` : " to Present"} · ${w.location ?? ""}\n\n${desc}`;
    })
    .join("\n\n");

  const education = DATA.education
    .map(
      (e) =>
        `### ${e.degree}\n${e.school} · ${e.start} to ${e.end}`,
    )
    .join("\n\n");

  const projects = DATA.projects
    .map(
      (p) =>
        `### ${p.name}\n${p.description}${p.website ? `\nWebsite: ${p.website}` : ""}${p.github ? `\nGitHub: ${p.github}` : ""}`,
    )
    .join("\n\n");

  const socials = Object.values(DATA.contact.social)
    .map((s) => `- [${s.name}](${s.url})`)
    .join("\n");

  return `# ${DATA.name}

**${DATA.description}**

${DATA.summary}

📍 ${DATA.location} · ✉️ ${DATA.contact.email}

---

## Skills

${skills}

---

## Work Experience

${work}

---

## Education

${education}

---

## Projects

${projects}

---

## Contact

${socials}
`.trim();
}

export async function GET() {
  const markdown = generateMarkdown();
  const tokens = Math.ceil(new TextEncoder().encode(markdown).length / 4);

  return new NextResponse(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "x-markdown-tokens": String(tokens),
    },
  });
}
