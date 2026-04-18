"use client";

import { useEffect } from "react";

export function WebMCP() {
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const mc = (navigator as unknown as Record<string, unknown>).modelContext as
      | { registerTool?: (...args: unknown[]) => void }
      | undefined;
    if (!mc?.registerTool) return;

    const controller = new AbortController();
    const { signal } = controller;

    mc.registerTool({
      name: "navigate_to_section",
      description: "Smoothly scroll to a section of Steve McKinnon's portfolio page",
      inputSchema: {
        type: "object",
        properties: {
          section: {
            type: "string",
            enum: ["about", "skills", "experience", "education", "projects", "contact"],
            description: "The portfolio section to navigate to",
          },
        },
        required: ["section"],
      },
      execute: async ({ section }: { section: string }) => {
        const el = document.getElementById(section);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return { success: true, section };
        }
        return { success: false, error: `Section "${section}" not found` };
      },
      signal,
    });

    mc.registerTool({
      name: "get_resume",
      description: "Fetch Steve McKinnon's full resume as markdown",
      inputSchema: { type: "object", properties: {} },
      execute: async () => {
        const res = await fetch("/api/markdown");
        const markdown = await res.text();
        return { markdown };
      },
      signal,
    });

    return () => controller.abort();
  }, []);

  return null;
}
