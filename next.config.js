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
      { hostname: "utfs.io" },
      { hostname: "localhost" },
      { hostname: "randomuser.me" },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://us-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://us.i.posthog.com/:path*",
      },
      {
        source: "/saas",
        destination:
          "https://docs.google.com/document/d/e/2PACX-1vQTwm5Dnpkqajoxvuuh2XIXCtXlj6nyFxP5khRiyFaYSWDtJUAaX_wGI1D6H6VGpA/pub",
      },
      {
        source: "/privacy",
        destination:
          "https://docs.google.com/document/d/e/2PACX-1vSFryh8tuExtEPszK-fSFsIBwxIjWKqovmb0t2EoepZk8lPfYBCw_rFg8d_qdUczlX2TDn_YhMvFokE/pub",
      },
      {
        source: "/dataprocessing",
        destination:
          "https://docs.google.com/document/d/e/2PACX-1vSw3SRmlDvRTKsLwvMnGoJpimqIgqw2wBrkZojnQBDDAr4KiFKpYT6sQtvBGnghqA/pub",
      },
    ];
  },
});

// for trpc + axiom logs
// https://github.com/axiomhq/next-axiom/issues/64
// https://www.imakewebsites.ca/posts/axiom-logging-nextjs-api-routes/
export default config;
