import { PARLIAMENT_BASE_URL } from "@lib/constants";

export default function parsePictureUrl(pictureUrl: string) {
  const parsed = pictureUrl?.replace("http://", "https://");
  // Sometimes the picture url does not include the domain
  if (!parsed?.includes(PARLIAMENT_BASE_URL)) {
    return parsed?.replace("https://", PARLIAMENT_BASE_URL);
  }
  return parsed;
}
