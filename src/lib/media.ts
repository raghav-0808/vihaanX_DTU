/** Client-side helpers for turning a picked photo into a small JPEG data URL. */

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const SUPPORTED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

export async function fileToCompressedDataUrl(
  file: File,
  maxSize = 1280,
  quality = 0.82,
): Promise<string> {
  if (!SUPPORTED_IMAGE_TYPES.has(file.type)) {
    throw new Error("Choose a JPEG, PNG, WebP or GIF image.");
  }
  if (file.size === 0) throw new Error("That image file is empty.");
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("Choose an image smaller than 10 MB.");

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read that photo."));
    reader.readAsDataURL(file);
  });

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("That file is not a readable image."));
    image.src = dataUrl;
  });

  const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
  if (!img.width || !img.height) throw new Error("That file is not a readable image.");
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(img.width * scale));
  canvas.height = Math.max(1, Math.round(img.height * scale));
  const ctx = canvas.getContext("2d");
  if (!ctx)
    throw new Error("This browser could not process the image. Please try another browser.");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  const compressed = canvas.toDataURL("image/jpeg", quality);
  if (compressed.length > 8_000_000)
    throw new Error("The processed image is too large. Choose a smaller image.");
  return compressed;
}

export function dataUrlToBlob(dataUrl: string): Blob {
  const [head, body] = dataUrl.split(",");
  const mime = /:(.*?);/.exec(head ?? "")?.[1] ?? "image/jpeg";
  const bytes = atob(body ?? "");
  const buf = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) buf[i] = bytes.charCodeAt(i);
  return new Blob([buf], { type: mime });
}
