import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const dir = path.resolve("public/art/magical-loom-fixed");
const files = fs.readdirSync(dir).filter((name) => name.endsWith(".png"));

for (const name of files) {
  const input = path.join(dir, name);
  const output = path.join(dir, name.replace(/\.png$/i, ".webp"));
  const before = fs.statSync(input).size;
  await sharp(input)
    .webp({
      quality: 90,
      alphaQuality: 100,
      effort: 6,
      smartSubsample: true
    })
    .toFile(output);
  const after = fs.statSync(output).size;
  console.log(
    `${name}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB webp (${Math.round((after / before) * 100)}%)`
  );
}
