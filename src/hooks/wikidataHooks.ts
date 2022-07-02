import { TwitterResult, WikidataResponse } from '../types/wikidata';
import useSWR from 'swr';

const fetcher = (url: string) =>
  fetch(url, { headers: { Accept: 'application/sparql-results+json' } }).then((r) => r.json());

const QUERY_URL = 'https://query.wikidata.org/sparql';

const useWikidata = <T>(sparqlQuery: string): WikidataResponse<T> | undefined => {
  const fullUrl = QUERY_URL + '?query=' + encodeURIComponent(sparqlQuery);
  const { data } = useSWR<WikidataResponse<T>>(fullUrl, fetcher);
  return data;
};

export const useTwitterInfo = (memberId: string): WikidataResponse<TwitterResult> | undefined => {
  const sparqlQuery =
    '#title: Riksdagsmedlemmars twitterkonton\n' +
    'SELECT DISTINCT ?person ?twitterHandle ?twitterId WHERE {\n' +
    '  ?person wdt:P31 wd:Q5;\n' +
    '    p:P39 ?positionStatement.\n' +
    '  ?person p:P2002 ?twitterStatement.\n' +
    '  ?twitterStatement pq:P6552 ?twitterId ;\n' +
    '                    ps:P2002 ?twitterHandle .\n' +
    `  ?person wdt:P1214 "${memberId}".\n` +
    '  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }\n' +
    '}\n' +
    'ORDER BY (?personLabel)';
  return useWikidata(sparqlQuery);
};
