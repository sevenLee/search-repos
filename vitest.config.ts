import { mergeConfig, defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default defineConfig((env) => mergeConfig(
  viteConfig(env),
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./vitest/setup.ts"],
    },
  }),
));