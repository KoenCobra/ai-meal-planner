"use server";

export async function convertToWebp(imageBase64: string) {
  const sharp = (await import("sharp")).default;

  try {
    const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const buffer = Buffer.from(base64Data, "base64");

    const webpBuffer = await sharp(buffer)
      .resize(800)
      .webp({ quality: 80 })
      .toBuffer();

    const webpBase64 = webpBuffer.toString("base64");

    return {
      imageBase64: `data:image/webp;base64,${webpBase64}`,
    };
  } catch (error) {
    console.error("Error converting image to WebP:", error);
    throw new Error(`Failed to convert image to WebP: ${error}`);
  }
}
