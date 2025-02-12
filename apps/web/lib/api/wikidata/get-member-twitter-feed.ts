import { WIKIDATA_QUERY_URL } from "@lib/constants";
import { body } from "@lib/utils/json";

import type { TwitterResult, WikidataResponse } from "./types";

export default async function getMemberTwitterFeed(memberId: string) {
  const sparqlQuery = `
  #title: Riksdagsmedlemmars twitterkonton
  SELECT DISTINCT ?person ?twitterHandle ?twitterId WHERE {
    ?person wdt:P31 wd:Q5;
      p:P39 ?positionStatement.
    ?person p:P2002 ?twitterStatement.
    ?twitterStatement pq:P6552 ?twitterId ;
                      ps:P2002 ?twitterHandle .
    ?person wdt:P1214 "${memberId}".
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
  }
  ORDER BY (?personLabel)
`;

  const query = new URLSearchParams({
    query: sparqlQuery,
  });

  const response = await fetch(`${WIKIDATA_QUERY_URL}?${query.toString()}`, {
    headers: {
      Accept: "application/sparql-results+json",
      "user-agent": "partiguiden/1.0",
    },
    next: {
      // Revalidate once per week
      revalidate: 60 * 60 * 24 * 7,
    },
  });

  const data = await body<WikidataResponse<TwitterResult>>(response);
  return data;
}
