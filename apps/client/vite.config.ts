import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import type { Config } from "@swc/types";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log("Using SWC for transformation");
  return {
    plugins: [
      react({
        tsDecorators: true,
        useAtYourOwnRisk_mutateSwcOptions(options: Config) {
          if (!options.jsc) {
            options.jsc = {
              parser: { syntax: "typescript", decorators: true },
              transform: { decoratorVersion: "2022-03" },
            };
          }
        },
      }),
    ],
    build: {
      sourcemap: true,
      minify: "esbuild",
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL || "http://localhost:8080",
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
