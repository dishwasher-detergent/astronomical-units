import { APP_DESCRIPTION, APP_NAME } from "@/constants/GLOBAL";
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: APP_NAME,
    short_name: APP_NAME,
    description: APP_DESCRIPTION,
    icons: [
      {
        src: "/icons/orbit-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/orbit-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    theme_color: "#FFFFFF",
    background_color: "#FFFFFF",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
  };
}
