import PartiguidenIcon from "@lib/image/icon";

export const contentType = "image/png";
export const size = {
  width: 180,
  height: 180,
};

export default async function Icon() {
  return PartiguidenIcon(180);
}
