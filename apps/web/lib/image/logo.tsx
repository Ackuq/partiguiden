import { ImageResponse } from "next/server";
import colors from "tailwindcss/colors";

interface Size {
  width: number;
  height: number;
}

export default async function PartiguidenLogo({ width, height }: Size) {
  const robotoMedium = fetch(
    new URL("./fonts/Roboto-Bold.ttf", import.meta.url),
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 192,
          fontWeight: 700,
          color: colors.teal[700],
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Partiguiden
      </div>
    ),
    {
      width,
      height,
      fonts: [
        {
          name: "Roboto",
          data: await robotoMedium,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
