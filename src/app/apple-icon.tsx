import { ImageResponse } from "next/og";
import { eventConfig } from "@/config/event.config";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg,#0b5fd9,#147a63)",
          color: "#ffffff",
          fontSize: 72,
          fontWeight: 700,
        }}
      >
        {eventConfig.shortName}
      </div>
    ),
    size
  );
}
