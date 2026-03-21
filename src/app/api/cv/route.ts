import { readFile } from "fs/promises";
import { NextResponse } from "next/server";
import { join } from "path";

export async function GET() {
  const file = await readFile(join(process.cwd(), "public", "cv.pdf"));

  return new NextResponse(file, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Steve McKinnon CV.pdf"',
    },
  });
}
