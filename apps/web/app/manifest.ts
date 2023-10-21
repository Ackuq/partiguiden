import type { MetadataRoute } from "next";
import colors from "tailwindcss/colors";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Partiguiden",
    short_name: "Partiguiden",
    start_url: "/",
    theme_color: colors.teal[700],
    background_color: colors.teal[50],
    display: "standalone",
    icons: [
      {
        src: "icon/192",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "icon/512",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
