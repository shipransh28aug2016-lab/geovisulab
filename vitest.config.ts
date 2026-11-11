import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  test: {
    include: ["src/**/*.test.ts", "atlas/**/*.test.ts"],
    environment: "node",
    // Data-integrity suites read the committed atlas corpus; keep them deterministic.
    pool: "forks",
  },
});
