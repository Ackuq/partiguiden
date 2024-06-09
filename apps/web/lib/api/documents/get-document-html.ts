import { PARLIAMENT_BASE_URL } from "@lib/constants";

interface DocumentHTML {
  id: string;
  html: string;
}

export default async function getDocumentHtml(
  id: string,
): Promise<DocumentHTML> {
  const response = await fetch(`${PARLIAMENT_BASE_URL}/dokument/${id}`, {
    cache: "no-store",
  });

  const urlDecodedId = decodeURIComponent(id);

  return { id: urlDecodedId, html: await response.text() };
}
