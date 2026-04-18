import { NextResponse } from "next/server";

// HS256 tokens are verified server-side using the shared secret.
// There are no public keys to distribute, so the keyset is empty.
export async function GET() {
  return NextResponse.json(
    { keys: [] },
    {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    },
  );
}
