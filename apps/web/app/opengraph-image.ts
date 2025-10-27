import PartiguidenLogo from "@lib/image/logo";

export const alt = "Partiguiden logo";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function OGImage() {
  return PartiguidenLogo(size);
}
