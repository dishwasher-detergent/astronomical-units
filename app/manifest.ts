import { APP_DESCRIPTION, APP_NAME, APP_SHORT_NAME } from "@/constants/GLOBAL";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_NAME,
    short_name: APP_SHORT_NAME,
    description: APP_DESCRIPTION,
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#000",
    background_color: "#000",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
  };
}
