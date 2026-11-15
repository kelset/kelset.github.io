/* Subsets the brand font to the character set the site uses.
   Output lands in src/assets/fonts/ and is committed, so builds don't depend
   on this script; re-run it after upgrading the fontsource package:
     node scripts/subset-fonts.mjs

   One family, per DESIGN.md: Archivo, a grotesque with a width axis. The
   roman ships both axes — expanded for nameplates, condensed for map labels
   and timetable columns, normal for prose — so the whole signage system is
   one file. The italic is prose-only, so it keeps weight and drops width.

   Note on arrows and symbols: fontsource's `latin` range stops at U+206F, so
   glyphs like → are not in the font and adding them to the charset below will
   not pull them in. The site draws its arrows as inline SVG instead. */
import subsetFont from "subset-font";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Printable ASCII + Latin-1 supplement (the Italian and German names in the
// content) + the typographic punctuation and math signs the design uses.
let text = "";
for (let c = 0x20; c <= 0x7e; c++) text += String.fromCharCode(c);
for (let c = 0xa0; c <= 0xff; c++) text += String.fromCharCode(c);
text += "ıŒœ–—‘’“”†…™↑↓−∕";

const fonts = [
  {
    src: "node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2",
    out: "src/assets/fonts/archivo-subset.woff2",
    axes: {
      wght: { min: 400, max: 900, default: 400 },
      wdth: { min: 62, max: 125, default: 100 },
    },
  },
  {
    src: "node_modules/@fontsource-variable/archivo/files/archivo-latin-wght-italic.woff2",
    out: "src/assets/fonts/archivo-italic-subset.woff2",
    axes: { wght: { min: 400, max: 700, default: 400 } },
  },
];

mkdirSync(join(root, "src/assets/fonts"), { recursive: true });
for (const f of fonts) {
  const input = readFileSync(join(root, f.src));
  const output = await subsetFont(input, text, {
    targetFormat: "woff2",
    variationAxes: f.axes,
  });
  writeFileSync(join(root, f.out), output);
  console.log(`${f.out}: ${input.length} -> ${output.length} bytes`);
}
