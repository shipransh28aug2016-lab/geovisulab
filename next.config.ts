import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Atlas JSON/GeoJSON is read dynamically with node:fs, so the tracer cannot see it. Include it
  // explicitly in every server function that touches the corpus (Vercel / standalone output).
  outputFileTracingIncludes: {
    "/api/atlas/**": ["./atlas/data/pilot/**/*"],
  },
  outputFileTracingExcludes: {
    "*": ["./atlas/raw/**", "./atlas/cache/**"],
  },
};

export default nextConfig;
