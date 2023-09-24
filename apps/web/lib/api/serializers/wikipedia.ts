import type { Leader } from "@lib/api/types/member";
import type { WikipediaInfoBox } from "@lib/api/types/wikipedia";
import { getMemberQuery } from "../controllers/members";
import type { Party } from "@partiguiden/party-data/types";

interface WikipediaAbstractResponse {
  query: {
    pages: Record<
      number,
      {
        pageid: number;
        ns: number;
        title: string;
        extract: string;
      }
    >;
  };
}

export const getAbstract = (data: WikipediaAbstractResponse): string => {
  const pageData = Object.values(data.query.pages)[0];

  const abstract = pageData.extract;

  return abstract;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getLeader = (
  firstName: string,
  lastName: string,
  role: string,
  party: Party,
): Promise<Leader> => {
  const query = {
    fnamn: firstName,
    enamn: lastName,
    parti: party,
    rdlstatus: "samtliga",
    utformat: "json",
  };
  return new Promise<Leader>((resolve, reject) => {
    getMemberQuery(query).then((member) => {
      if (member === null) {
        reject(Error("Couldn't find member"));
      }
      resolve({ role, ...member } as Leader);
    });
  });
};

interface WikipediaInfoBoxResponse {
  parse: {
    text: {
      "*": string;
    };
  };
}

export const getInfoBoxAttr = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  data: WikipediaInfoBoxResponse,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  party: Party,
): Promise<WikipediaInfoBox> => {
  return { ideology: [], website: "", leaders: [] };
};
