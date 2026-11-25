// The GPS Swears It Was a Shortcut — entry program.
//
// Writes the GPS's own excuse for sending the driver down the wrong
// road to /output/entry.txt, one line, within the 200-character cap.

import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "The map said shortcut. The map also said the lake was a road and the wedding was a rest stop, so technically I have never been wrong.";

// The gate refuses anything outside 1–200 characters, so fail loudly
// here instead of shipping an invalid entry.
if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
  throw new Error(`entry line is ${LINE.length} chars, outside the 1-200 gate`);
}
if (LINE.includes("\n")) {
  throw new Error("entry line must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE + "\n", "utf8");
console.log(`wrote ${LINE.length} chars to ${outDir}/entry.txt`);
