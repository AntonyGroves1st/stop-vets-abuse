import sharp from "sharp";

const W = 2400;
const H = 1350;

// Clean American flag for left atmosphere
const flag = await sharp("public/images/_flag3.jpg")
  .resize(W, H, { fit: "cover", position: "left" })
  .modulate({ brightness: 0.45, saturation: 0.95 })
  .blur(3)
  .toBuffer();

// Military family reunion — keep subjects on the right
const family = await sharp("public/images/hero-family-hug.jpg")
  .resize(W, H, { fit: "cover", position: "right" })
  .toBuffer();

// Soft left→right crossfade: flag left, family right (like the mockup)
const fade = Buffer.from(
  `<svg width="${W}" height="${H}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="white"/>
        <stop offset="28%" stop-color="white"/>
        <stop offset="48%" stop-color="white" stop-opacity="0.35"/>
        <stop offset="62%" stop-color="black" stop-opacity="0"/>
        <stop offset="100%" stop-color="black" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
  </svg>`,
);

const flagMasked = await sharp(flag)
  .ensureAlpha()
  .composite([{ input: await sharp(fade).png().toBuffer(), blend: "dest-in" }])
  .png()
  .toBuffer();

await sharp(family)
  .composite([{ input: flagMasked, blend: "over" }])
  .jpeg({ quality: 90 })
  .toFile("public/images/hero-military-homecoming.jpg");

console.log("wrote hero-military-homecoming.jpg");
