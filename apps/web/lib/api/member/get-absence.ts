import { PARLIAMENT_BASE_URL } from "@lib/constants";
import serializeAbsence from "./parsers/absence";

interface Query {
  id: string;
  parliamentYears: string[];
}

export default async function getAbsence({
  id,
  parliamentYears,
}: Query): Promise<number | null> {
  const query = new URLSearchParams({
    iid: id,
    rm: parliamentYears.join(","),
    utformat: "json",
    gruppering: "namn",
  });

  const response = await fetch(
    `${PARLIAMENT_BASE_URL}/voteringlista/?${query}`,
    {
      next: { revalidate: 60 * 60 * 24 },
    },
  );
  const data = await response.json();
  return serializeAbsence(data);
}
