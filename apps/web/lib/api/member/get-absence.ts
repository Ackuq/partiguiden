import { PARLIAMENT_BASE_URL } from "@lib/constants";
import { body } from "@lib/utils/json";

import type { VoteringNameGroupLookup } from "../parliament/types";
import serializeAbsence from "./parsers/absence";

interface Query {
  id: string;
  parliamentYears: string[];
}

export default async function getAbsence({
  id,
  parliamentYears,
}: Query): Promise<number | undefined> {
  const query = new URLSearchParams({
    iid: id,
    rm: parliamentYears.join(","),
    utformat: "json",
    gruppering: "namn",
  });

  const response = await fetch(
    `${PARLIAMENT_BASE_URL}/voteringlista/?${query.toString()}`,
    {
      next: { revalidate: 60 * 60 * 24 },
    },
  );

  if (response.status === 404) {
    return undefined;
  }
  if (!response.ok) {
    throw new Error("Något gick fel med anropet till Riksdagens API");
  }

  const data = await body<VoteringNameGroupLookup>(response);
  return serializeAbsence(data);
}
