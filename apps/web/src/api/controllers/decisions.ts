import type { Decisions } from "../../types/decision";
import { decisionsSerializer } from "../serializers/decisions";
import { parliamentURL } from "../constants";
import { stringify } from "querystring";

export const getDecisions = (query: string): Promise<Decisions> =>
  fetch(`${parliamentURL}/dokumentlista/?${query}`)
    .then((res) => res.json())
    .then(decisionsSerializer);

export const decisionsController = async (
  search?: string,
  org?: string,
  page?: string,
): Promise<Decisions> => {
  const query = {
    doktyp: "bet",
    dokstat: "beslutade",
    sortorder: "desc",
    utformat: "json",
    sok: (search as string) || "",
    sort: search ? "rel" : "datum",
    org: (org as string) || "",
    p: (page as string) || "",
  };

  return getDecisions(stringify(query));
};
