/* The default share card (public/og.png, 1200×630): the home page hero, set
   as a picture — the name, the five lines crossing edge to edge, the doodle as
   the interchange. It is what a link to the site looks like in a chat or a
   feed; articles with a cover use that instead.

   It is a committed file, not a build step, because rendering it needs a
   browser. Regenerate it when the name, the lines or the doodle change:

     node scripts/og-card.mjs

   Needs Chrome (set CHROME=/path/to/chrome if it isn't in the usual place). */

import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const b64 = (p) => readFileSync(join(root, p)).toString("base64");

const chrome = [
  process.env.CHROME,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].find((p) => p && existsSync(p));
if (!chrome) throw new Error("Chrome not found — set CHROME=/path/to/chrome");

/* Day-theme values, copied from src/styles/global.css. The band is the same
   gradient Hero.astro draws, scaled up, yellow casing included. */
const html = `<!doctype html>
<meta charset="utf-8">
<style>
  @font-face {
    font-family: Archivo;
    font-weight: 400 900;
    font-stretch: 62% 125%;
    src: url(data:font/woff2;base64,${b64("src/assets/fonts/archivo-subset.woff2")}) format("woff2-variations");
  }
  :root {
    --bg: oklch(98.5% 0.004 95);
    --ink: oklch(19% 0.02 265);
    --ink-muted: oklch(47% 0.02 265);
  }
  * { box-sizing: border-box; margin: 0; }
  html, body { width: 1200px; height: 630px; }
  body {
    background: var(--bg);
    color: var(--ink);
    font-family: Archivo, sans-serif;
    font-synthesis: none;
    -webkit-font-smoothing: antialiased;
    position: relative;
    overflow: hidden;
  }
  .pad { padding-inline: 64px; }
  .eyebrow {
    padding-block-start: 62px;
    font-size: 21px;
    font-stretch: 82%;
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
    color: var(--ink-muted);
  }
  h1 {
    margin-block-start: 18px;
    font-size: 99px;
    font-stretch: 125%;
    font-weight: 900;
    line-height: 0.9;
    letter-spacing: -0.045em;
    white-space: nowrap;
  }
  .band {
    position: absolute;
    inset-inline: 0;
    inset-block-start: 318px;
    block-size: 123px;
    background: linear-gradient(
      to bottom,
      oklch(58% 0.22 31) 0 15px,
      transparent 15px 27px,
      oklch(52% 0.175 256) 27px 42px,
      transparent 42px 54px,
      oklch(53% 0.135 152) 54px 69px,
      transparent 69px 79px,
      var(--ink) 79px 81px,
      oklch(84% 0.168 90) 81px 96px,
      var(--ink) 96px 98px,
      transparent 98px 108px,
      oklch(54% 0.2 305) 108px 123px
    );
  }
  .hub {
    position: absolute;
    inset-inline-end: 96px;
    inset-block-start: calc(318px + 61.5px - 123px);
    inline-size: 246px;
    block-size: 246px;
    border-radius: 50%;
    background: oklch(99% 0.003 95);
    border: 7px solid var(--ink);
    box-shadow: 0 0 0 10px var(--bg);
    overflow: hidden;
  }
  .hub img { display: block; inline-size: 100%; block-size: 100%; }
  .site {
    position: absolute;
    inset-inline-start: 64px;
    inset-block-end: 58px;
    font-size: 34px;
    font-stretch: 112%;
    font-weight: 800;
    letter-spacing: -0.02em;
  }
  .site span { color: var(--ink-muted); }
</style>
<body>
  <p class="pad eyebrow">Writing · talks · side quests</p>
  <h1 class="pad">Lorenzo Sciandra</h1>
  <div class="band"></div>
  <div class="hub"><img src="data:image/png;base64,${b64("src/assets/profile.png")}" alt=""></div>
  <p class="site">kelset<span>.dev</span></p>
</body>`;

const dir = mkdtempSync(join(tmpdir(), "og-card-"));
const page = join(dir, "card.html");
const shot = join(dir, "card.png");
writeFileSync(page, html);

execFileSync(
  chrome,
  [
    "--headless=new",
    "--hide-scrollbars",
    "--force-device-scale-factor=1",
    "--window-size=1200,630",
    "--virtual-time-budget=2000",
    `--screenshot=${shot}`,
    `file://${page}`,
  ],
  { stdio: "ignore" },
);

/* flat colour compresses well as a palette PNG; no JPEG fringing on the type */
await sharp(shot).png({ palette: true, colours: 128 }).toFile(join(root, "public/og.png"));
console.log("wrote public/og.png");
