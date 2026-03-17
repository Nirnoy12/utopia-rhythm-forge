/**
 * Compresses gallery images to WebP format using sharp.
 * Run with: node scripts/compress-gallery.mjs
 */
import sharp from "sharp";
import { readdir, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const INPUT_DIR = path.join(__dirname, "../public/gallery");
const OUTPUT_DIR = path.join(__dirname, "../public/gallery/webp");
const QUALITY = 75; // 75 quality gives great visuals at ~90% size reduction

async function main() {
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  const files = await readdir(INPUT_DIR);
  const images = files.filter((f) =>
    /\.(jpg|jpeg|JPG|JPEG|png|PNG)$/.test(f)
  );

  console.log(`Found ${images.length} images to compress...`);

  for (const file of images) {
    const nameWithoutExt = file.replace(/\.(jpg|jpeg|JPG|JPEG|png|PNG)$/, "");
    const inputPath = path.join(INPUT_DIR, file);
    const outputPath = path.join(OUTPUT_DIR, `${nameWithoutExt}.webp`);

    if (existsSync(outputPath)) {
      console.log(`  Skipping ${file} (already converted)`);
      continue;
    }

    try {
      await sharp(inputPath)
        .resize({ width: 600, withoutEnlargement: true }) // max 600px wide – plenty for a thumbnail
        .webp({ quality: QUALITY })
        .toFile(outputPath);

      console.log(`  ✓ ${file} → ${nameWithoutExt}.webp`);
    } catch (err) {
      console.error(`  ✗ Failed to convert ${file}:`, err.message);
    }
  }

  console.log("\nDone! Output in public/gallery/webp/");
}

main().catch(console.error);
