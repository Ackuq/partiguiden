import { PARLIAMENT_BASE_URL } from "@lib/constants";

export default async function getDocumentHtml(id: string): Promise<string> {
  const response = await fetch(`${PARLIAMENT_BASE_URL}/dokument/${id}`, {
    next: {
      revalidate: 60 * 60 * 24 * 7,
    },
  });

  return response.text();
}
