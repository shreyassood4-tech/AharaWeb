const sharp = require("sharp");
const path = require("path");

const src = path.join(__dirname, "../public/AharaBrandIcon1.png");
const publicDir = path.join(__dirname, "../public");

async function main() {
  // favicon.ico — 32x32 PNG (browsers accept PNG named .ico)
  await sharp(src)
    .resize(32, 32)
    .toFile(path.join(publicDir, "favicon.ico"));
  console.log("Generated favicon.ico");

  // icon.png — 32x32
  await sharp(src)
    .resize(32, 32)
    .png()
    .toFile(path.join(publicDir, "icon.png"));
  console.log("Generated icon.png");

  // apple-touch-icon.png — 180x180
  await sharp(src)
    .resize(180, 180)
    .png()
    .toFile(path.join(publicDir, "apple-touch-icon.png"));
  console.log("Generated apple-touch-icon.png");
}

main().catch(console.error);
