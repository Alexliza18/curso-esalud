import type { MetadataRoute } from "next";
import { eventConfig } from "@/config/event.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${eventConfig.name} ${eventConfig.edition}`,
    short_name: eventConfig.shortName,
    description: eventConfig.description,
    start_url: "/",
    id: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#ffffff",
    theme_color: "#0b5fd9",
    categories: ["medical", "education", "events"],
    lang: "es",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
