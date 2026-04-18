import { NextResponse } from "next/server";

// This authorization server only supports client_credentials — no user-facing
// authorization flow is needed. Direct machine clients to the token endpoint.
export async function GET() {
  return NextResponse.json(
    {
      error: "not_supported",
      error_description:
        "Only client_credentials grant is supported. POST to /oauth/token directly.",
      token_endpoint: "https://stevemckinnon.co.uk/oauth/token",
    },
    { status: 400 },
  );
}
