import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => ({
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react":  ["react", "react-dom"],
          "vendor-router": ["react-router-dom"],
          "vendor-ui":     ["@radix-ui/react-slot", "class-variance-authority", "clsx"],
        },
      },
    },
    // Silence the chunk size warning since we've intentionally split things
    chunkSizeWarningLimit: 300,
  },
  plugins: [
    tsconfigPaths(),
    react(),
    // Only runs when you do: ANALYZE=true npm run build
    mode === "analyze" && visualizer({
      open: true,
      gzip: true,
      filename: "bundle-analysis.html",
    }),
  ].filter(Boolean),
  server: {
    port: 3000,
    host: "0.0.0.0",
    strictPort: true,
  },
}));