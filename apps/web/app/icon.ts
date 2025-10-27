import PartiguidenIcon from "@lib/image/icon";

export const contentType = "image/png";

const configurations = [32, 48, 72, 128, 192, 384, 512];

export function generateImageMetadata() {
  return configurations.map((size) => ({
    contentType: "image/png",
    size: { width: size, height: size },
    id: size,
  }));
}

interface Props {
  id: Promise<number>;
}

export default async function Icon({ id: size }: Props) {
  return PartiguidenIcon(await size);
}
