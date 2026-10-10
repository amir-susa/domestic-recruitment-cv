import fs from "node:fs";
import path from "node:path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export type EmbeddedImage = {
  data: string; // base64 PNG
  mime: "image/png";
  width: number;
  height: number;
};

export type CachedImages = Map<string, EmbeddedImage>;

async function toPngBuffer(bytes: Uint8Array): Promise<Buffer> {
  try {
    const sharp = require("sharp");
    return await sharp(bytes).png().toBuffer();
  } catch (error) {
    console.warn("sharp not available, not embedding image", error);
    return null;
  }
}

function toBase64(buffer: Buffer): string {
  return buffer.toString("base64");
}

export function createImageService(assetsDir: string) {
  const cache = new Map<string, EmbeddedImage>();

  function readAsset(filename: string): Buffer {
    const file = path.resolve(assetsDir, filename);
    return fs.readFileSync(file);
  }

  async function ensureEmbedded(filename: string): Promise<EmbeddedImage | null> {
    if (cache.has(filename)) {
      return cache.get(filename)!;
    }

    const bytes = readAsset(filename);
    const png = await toPngBuffer(bytes);
    if (!png) {
      return null;
    }

    const { width, height } = require("sharp")(png).metadata();
    const data = toBase64(png);

    const image: EmbeddedImage = {
      data,
      mime: "image/png",
      width,
      height,
    };

    cache.set(filename, image);
    return image;
  }

  return {
    cache,
    ensureEmbedded,
  };
}
