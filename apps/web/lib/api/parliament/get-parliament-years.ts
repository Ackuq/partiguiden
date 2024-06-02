import { body } from "@lib/utils/json";

import type { Riksmoten } from "./types";

export default async function getParliamentYears(): Promise<Riksmoten> {
  const response = await fetch(
    "http://data.riksdagen.se/sv/koder/?typ=riksmote&utformat=json",
    { next: { revalidate: 86400 } },
  );

  return body<Riksmoten>(response);
}
