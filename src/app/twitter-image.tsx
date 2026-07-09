import { ImageResponse } from "next/og";
import { OgElement, ogSize } from "@/lib/og-element";

export const size = ogSize;
export const contentType = "image/png";

export default async function TwitterImage() {
  return new ImageResponse(<OgElement />, size);
}
