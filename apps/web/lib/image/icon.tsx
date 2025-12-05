import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import colors from "tailwindcss/colors";

export default async function PartiguidenIcon(size: number) {
  const robotoMedium = await readFile(
    new URL("./fonts/Roboto-Bold.ttf", import.meta.url),
  );

  return new ImageResponse(
    <div
      style={{
        fontSize: size * 0.6,
        fontWeight: 700,
        color: colors.teal[700],
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      PG
    </div>,
    {
      width: size,
      height: size,
      fonts: [
        {
          name: "Roboto",
          data: robotoMedium,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
