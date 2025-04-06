import * as cheerio from "cheerio";

import type { Leader } from "@lib/api/member/types";
import type { Party } from "@partiguiden/party-data/types";

import type { WikipediaInfoBox } from "../types";
import parseLeader from "./leader";

export interface WikipediaInfoBoxResponse {
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
  const $ = cheerio.load(data.parse.text["*"]);

  const rowHeaders = $("th");
  let website = "";
  const leaders: Leader[] = [];
  const ideology: string[] = [];

  for (const header of rowHeaders) {
    /* Remove spaces since HTML spaces are treated differently */
    const title = $(header).text()?.replace(/[[\s]/g, "");
    const item = header.nextSibling;

    switch (title) {
      case "Politiskideologi": {
        if (!item) {
          break;
        }
        for (const ideologyNode of $(item).children()) {
          if (ideologyNode.name !== "a" || $(ideologyNode).text() === null) {
            continue;
          }
          ideology.push($(ideologyNode).text());
        }
        break;
      }
      case "Partiledare":
      case "Partiordförande":
      case "Partisekreterare":
      case "Gruppledare":
      case "Språkrör": {
        if (!item) {
          break;
        }
        for (const leaderNode of $(item).children()) {
          const name = $(leaderNode).text();
          if (leaderNode.name !== "a" || !name) {
            continue;
          }
          const [firstName, ...lastName] = name
            .replace(/\[\d+\]/g, "")
            .split(" ");

          const parsedLeader = await parseLeader(
            firstName,
            lastName.join(" "),
            title,
            party,
          );

          if (parsedLeader === null) {
            continue;
          }

          leaders.push(parsedLeader);
        }
        break;
      }
      case "Webbplats": {
        // Website is defined on the next row
        const siteElement = header.parent?.nextSibling;
        if (!siteElement) {
          continue;
        }
        const $siteElement = $(siteElement);
        const linkElement = $siteElement.find("a");

        website = (
          linkElement.attr("href") ??
          $siteElement.text() ??
          ""
        ).replace("http://", "https://");
      }
    }
  }

  return { ideology, website, leaders };
};
