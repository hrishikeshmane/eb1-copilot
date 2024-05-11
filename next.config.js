/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");
import { withAxiom } from "next-axiom";

/** @type {import("next").NextConfig} */
const config = withAxiom({
  transpilePackages: ["next-mdx-remote"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});

// for trpc + axiom logs
// https://github.com/axiomhq/next-axiom/issues/64
// https://www.imakewebsites.ca/posts/axiom-logging-nextjs-api-routes/
export default config;
