import type { TwitterResult, WikidataResponse } from "../types/wikidata";
import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, { headers: { Accept: "application/sparql-results+json" } }).then(
    (r) => r.json(),
  );

const QUERY_URL = "https://query.wikidata.org/sparql";

const useWikidata = <T>(
  sparqlQuery: string,
): WikidataResponse<T> | undefined => {
  const fullUrl = QUERY_URL + "?query=" + encodeURIComponent(sparqlQuery);
  const { data } = useSWR<WikidataResponse<T>>(fullUrl, fetcher);
  return data;
};

export const useTwitterInfo = (
  memberId: string,
): WikidataResponse<TwitterResult> | undefined => {
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
  return useWikidata(sparqlQuery);
};
