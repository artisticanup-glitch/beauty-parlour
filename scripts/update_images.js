import { execSync } from 'child_process';
import ffmpeg from 'ffmpeg-static';
import path from 'path';
import fs from 'fs';

const imagesDir = path.resolve('public/images');
const videosDir = path.resolve('public/videos');
const brainDir = 'C:/Users/araj2/.gemini/antigravity/brain/aec5c247-2a45-44b8-8507-e7971dbdf0b3';

// 1. studio.webp from studio.mp4
execSync(`"${ffmpeg}" -y -ss 00:00:02 -i "${path.join(videosDir, 'studio.mp4')}" -vframes 1 -q:v 85 "${path.join(imagesDir, 'studio.webp')}"`);
console.log('studio.webp extracted from studio.mp4');

// 2. makeup-process.webp from makeup-process.mp4
execSync(`"${ffmpeg}" -y -ss 00:00:02 -i "${path.join(videosDir, 'makeup-process.mp4')}" -vframes 1 -q:v 85 "${path.join(imagesDir, 'makeup-process.webp')}"`);
console.log('makeup-process.webp extracted from makeup-process.mp4');

// 3. banner.webp from banner.mp4
execSync(`"${ffmpeg}" -y -ss 00:00:02 -i "${path.join(videosDir, 'banner.mp4')}" -vframes 1 -q:v 85 "${path.join(imagesDir, 'banner.webp')}"`);
console.log('banner.webp extracted from banner.mp4');

// 4. service-mehendi.webp from mehendi.mp4
execSync(`"${ffmpeg}" -y -ss 00:00:02 -i "${path.join(videosDir, 'mehendi.mp4')}" -vframes 1 -q:v 85 "${path.join(imagesDir, 'service-mehendi.webp')}"`);
console.log('service-mehendi.webp extracted from mehendi.mp4');

// 5. service-skin.webp from haldi.mp4 (close up glowing bridal skin)
execSync(`"${ffmpeg}" -y -ss 00:00:02 -i "${path.join(videosDir, 'haldi.mp4')}" -vframes 1 -q:v 85 "${path.join(imagesDir, 'service-skin.webp')}"`);
console.log('service-skin.webp extracted from haldi.mp4');

// 6. service-nails.webp from mehendi.mp4 (detailed hands with bridal rings & manicured nails)
execSync(`"${ffmpeg}" -y -ss 00:00:01 -i "${path.join(videosDir, 'mehendi.mp4')}" -vframes 1 -vf "crop=in_w:in_w*0.8:0:in_h*0.3" -q:v 85 "${path.join(imagesDir, 'service-nails.webp')}"`);
console.log('service-nails.webp extracted from mehendi.mp4');

console.log('All image updates complete!');
