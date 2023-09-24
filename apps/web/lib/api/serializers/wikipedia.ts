import { JSDOM } from "jsdom";
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
  data: WikipediaInfoBoxResponse,
  party: Party,
): Promise<WikipediaInfoBox> => {
  const dom = new JSDOM(data.parse.text["*"]);

  const rowHeaders = dom.window.document.body.getElementsByTagName("th");
  let website = "";
  const leaders: Leader[] = [];
  const ideology: string[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const header of rowHeaders) {
    /* Remove spaces since HTML spaces are treated differently */
    const title = header.textContent?.replace(/[[\s]/g, "");
    const item = header.nextSibling;

    switch (title) {
      case "Politiskideologi":
        // eslint-disable-next-line no-restricted-syntax
        if (!item) {
          break;
        }
        for (const ideologyNode of item.childNodes) {
          if (
            ideologyNode.nodeName !== "A" ||
            ideologyNode.textContent === null
          ) {
            continue;
          }
          ideology.push(ideologyNode.textContent);
        }
        break;
      case "Partiledare":
      case "Partiordförande":
      case "Partisekreterare":
      case "Gruppledare":
      case "Språkrör":
        if (!item) {
          break;
        }
        for (const leaderNode of item.childNodes) {
          const name = leaderNode.textContent;
          if (leaderNode.nodeName !== "A" || !name) {
            continue;
          }
          const [firstName, ...lastName] = name
            .replace(/\[\d+\]/g, "")
            .split(" ");
          leaders.push(
            await getLeader(firstName, lastName.join(" "), title, party),
          );
        }
        break;
      case "Webbplats":
        // Website is defined on the next row
        const siteElement = header.parentElement?.nextElementSibling;
        if (!siteElement) {
          continue;
        }
        website = (
          siteElement.querySelector("a")?.getAttribute("href") ??
          siteElement.textContent ??
          ""
        ).replace("http://", "https://");
    }
  }

  return { ideology, website, leaders };
};
