import * as cheerio from "cheerio";

import type { PartyDataWithoutPartyName } from "@partiguiden/party-data/types";

import Scraper from "../scraper.ts";

interface SDItem {
  id: number;
  title: string;
  link: string;
  content: string;
  excerpt: string;
  utskott: string[];
}

function cleanText(content: string): string[] {
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => !!line);
}

export default class SDScraper extends Scraper {
  baseUrl = "https://www.sd.se";
  listPath = "/a-o/";
  listSelector = "#ao-matters-az-data";

  async getPages(limit?: number): Promise<PartyDataWithoutPartyName[]> {
    const response = await this.fetchPage(this.baseUrl + this.listPath, {
      headers: { "Content-Type": "text/plain; charset=UTF-8" },
    });
    const html = await response.text();
    const $ = cheerio.load(html);
    const rawJson = $(this.listSelector).html();

    if (!rawJson) {
      throw new Error("Script container #ao-matters-az-data not found.");
    }

    let items = JSON.parse(rawJson) as SDItem[];

    if (limit) {
      items = items.toSpliced(limit);
    }

    const parsedData = items.map<PartyDataWithoutPartyName>((item) => {
      return {
        title: item.title,
        url: item.link,
        updateDate: new Date().toISOString(),
        opinions: cleanText(item.content),
      };
    });

    return parsedData;
  }
}
