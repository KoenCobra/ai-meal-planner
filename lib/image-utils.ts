import sharp from "sharp";

// Image size and dimension limits
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes

export async function convertToWebp(imageBase64: string) {
  try {
    // Remove data URL prefix if present
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    // Convert base64 to buffer
    const buffer = Buffer.from(base64Data, "base64");

    // Use Sharp to convert to WebP format with compression
    const webpBuffer = await sharp(buffer)
      .resize(800) // Resize to smaller dimensions
      .webp({ quality: 80 }) // Convert to WebP with 80% quality
      .toBuffer();

    // Convert back to base64
    const webpBase64 = webpBuffer.toString("base64");

    return {
      imageBase64: `data:image/webp;base64,${webpBase64}`,
    };
  } catch (error) {
    console.error("Error converting image to WebP:", error);
    throw new Error(`Failed to convert image to WebP: ${error}`);
  }
}
