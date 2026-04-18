import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
  logging: {
    browserToTerminal: true,
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Link",
            value:
              '</.well-known/api-catalog>; rel="api-catalog", </sitemap.xml>; rel="sitemap", </mcp>; rel="service-desc"',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/.well-known/api-catalog",
        destination: "/api/well-known/api-catalog",
      },
      {
        source: "/.well-known/oauth-authorization-server",
        destination: "/api/well-known/oauth-authorization-server",
      },
      {
        source: "/.well-known/oauth-protected-resource",
        destination: "/api/well-known/oauth-protected-resource",
      },
    ];
  },
};

export default withBotId(nextConfig);
