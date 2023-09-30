import { PARLIAMENT_BASE_URL } from "@lib/constants";
import parseMemberDocuments from "./parsers/member-documents";

interface Query {
  id: string;
  page: number;
}

export default async function getMemberDocuments({ id, page }: Query) {
  const response = await fetch(
    `${PARLIAMENT_BASE_URL}/dokumentlista/?avd=dokument&sort=datum&sortorder=datum&utformat=json&iid=${id}&p=${page}`,
    { next: { revalidate: 60 * 60 * 24 } },
  );
  const data = await response.json();

  return parseMemberDocuments(data);
}
