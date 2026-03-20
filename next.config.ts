import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  cacheComponents: true,
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
  },
  logging: {
    // @ts-expect-error -- browserToTerminal is documented in Next.js 16.2 but types not yet updated
    browserToTerminal: true,
  },
};

export default withBotId(nextConfig);
