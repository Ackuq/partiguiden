import type { ParliamentYearsResponse } from "./types";

export default async function getParliamentYears(): Promise<ParliamentYearsResponse> {
  const response = await fetch(
    "http://data.riksdagen.se/sv/koder/?typ=riksmote&utformat=json",
    { next: { revalidate: 86400 } },
  );

  return response.json();
}
