import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    coverage: {
      provider: "istanbul", // or 'v8'
    },
    setupFiles: ["./vitest.setup.js"],
    environment: "jsdom",
    include: ["**/__tests__/*.{test,spec}.{js,jsx,ts,tsx}"],
  },
});
