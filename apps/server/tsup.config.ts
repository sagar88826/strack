import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  target: "node20",
  clean: true,
  splitting: false,
  sourcemap: true,
  minify: false,
  bundle: true,
  dts: false,
  esbuildOptions(options) {
    options.alias = {
      "@server": new URL("./src", import.meta.url).pathname,
    };
  },
});
