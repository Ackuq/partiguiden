import { PARLIAMENT_BASE_URL } from "@lib/constants";

export default async function getDocumentHtml(id: string): Promise<string> {
  const response = await fetch(`${PARLIAMENT_BASE_URL}/dokument/${id}`, {
    cache: "no-store",
  });

  return response.text();
}
