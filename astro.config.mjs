// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { execSync } from "node:child_process";

const gitHash = execSync("git rev-parse --short HEAD").toString().trim();
const buildDate = new Date().toISOString().slice(0, 10);

export default defineConfig({
  site: "https://kelset.dev",
  trailingSlash: "always",
  // Astro 7 defaults to JSX whitespace rules, which drop the space when an
  // inline link starts a new source line; HTML rules keep prose intact.
  compressHTML: true,
  integrations: [
    sitemap({
      // /lab/ is a scratch space for comparing design options, not a page
      filter: (page) => !page.includes("/404") && !page.includes("/lab/"),
    }),
  ],
  build: {
    // The whole design system is a few KB — inlining removes the only
    // render-blocking requests and gets first paint under budget.
    inlineStylesheets: "always",
  },
  vite: {
    define: {
      // real build info for the footer — the site is a repo, say so honestly
      __GIT_HASH__: JSON.stringify(gitHash),
      __BUILD_DATE__: JSON.stringify(buildDate),
    },
  },
});
