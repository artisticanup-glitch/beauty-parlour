import { execSync } from 'child_process';
import ffmpeg from 'ffmpeg-static';
import fs from 'fs';
import path from 'path';

const videosDir = path.resolve('public/videos');
const tempDir = path.resolve('public/videos/temp_encoded');

if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

const list = [
  { name: 'hero.mp4', scale: 'scale=1920:-2', maxSize: 5 * 1024 * 1024, poster: 'hero.webp' },
  { name: 'hero-m.mp4', scale: 'scale=720:-2', maxSize: 3 * 1024 * 1024, poster: 'hero-m.webp' },
  { name: 'haldi.mp4', scale: 'scale=720:-2', maxSize: 3 * 1024 * 1024, poster: 'haldi.webp' },
  { name: 'mehendi.mp4', scale: 'scale=720:-2', maxSize: 3 * 1024 * 1024, poster: 'mehendi.webp' },
  { name: 'shaadi.mp4', scale: 'scale=720:-2', maxSize: 3 * 1024 * 1024, poster: 'shaadi.webp' },
  { name: 'reception.mp4', scale: 'scale=720:-2', maxSize: 3 * 1024 * 1024, poster: 'reception.webp' },
  { name: 'studio.mp4', scale: 'scale=1280:-2', maxSize: 3 * 1024 * 1024, poster: 'studio.webp' },
  { name: 'makeup-process.mp4', scale: 'scale=1280:-2', maxSize: 3 * 1024 * 1024, poster: 'makeup-process.webp' },
  { name: 'banner.mp4', scale: 'scale=1280:-2', maxSize: 3 * 1024 * 1024, poster: 'banner.webp' },
];

for (const item of list) {
  const inPath = path.join(videosDir, item.name);
  const outPath = path.join(tempDir, item.name);

  if (!fs.existsSync(inPath)) {
    console.error(`Input file not found: ${inPath}`);
    continue;
  }

  let crf = 24;
  let success = false;

  while (crf <= 30 && !success) {
    const cmd = `"${ffmpeg}" -y -i "${inPath}" -c:v libx264 -profile:v high -pix_fmt yuv420p -crf ${crf} -preset slow -an -movflags +faststart -vf "${item.scale}" "${outPath}"`;
    console.log(`Encoding ${item.name} with CRF ${crf}...`);
    try {
      execSync(cmd, { stdio: 'inherit' });
      const stats = fs.statSync(outPath);
      console.log(`${item.name} encoded: ${(stats.size / 1024 / 1024).toFixed(2)} MB (Limit: ${(item.maxSize / 1024 / 1024).toFixed(2)} MB)`);
      if (stats.size <= item.maxSize) {
        success = true;
      } else {
        console.warn(`File exceeds limit (${(stats.size / 1024 / 1024).toFixed(2)} MB > ${(item.maxSize / 1024 / 1024).toFixed(2)} MB). Retrying with higher CRF...`);
        crf += 2;
      }
    } catch (e) {
      console.error(`Error encoding ${item.name}:`, e.message);
      break;
    }
  }

  if (success) {
    // Generate webp poster
    const posterPath = path.join(videosDir, item.poster);
    const posterCmd = `"${ffmpeg}" -y -ss 00:00:01 -i "${outPath}" -vframes 1 -q:v 80 "${posterPath}"`;
    try {
      execSync(posterCmd, { stdio: 'ignore' });
      console.log(`Poster generated: ${item.poster}`);
    } catch (e) {
      console.warn(`Could not generate poster for ${item.name}: ${e.message}`);
    }

    // Overwrite the original with optimized version
    fs.copyFileSync(outPath, inPath);
    console.log(`Updated ${item.name} in public/videos/ successfully.`);
  }
}

// Clean temp directory
fs.rmSync(tempDir, { recursive: true, force: true });
console.log('Video encoding complete!');
