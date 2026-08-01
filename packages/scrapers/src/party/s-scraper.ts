import * as cheerio from "cheerio";

import type { PartyDataWithoutPartyName } from "@partiguiden/party-data/types";

import Scraper from "../scraper.ts";

const pagePattern =
  /^https:\/\/www\.socialdemokraterna\.se\/var-politik\/a-till-o\/.*$/i;

export default class SScraper extends Scraper {
  baseUrl = "https://www.socialdemokraterna.se";
  listPath = "/var-politik/a-till-o";
  listSelector = ".sap-ao-lettergroup-topic-box > a";
  opinionTags = [".sos-accordion p"];

  async getStandpointPageFromUrl(
    url: string,
  ): Promise<PartyDataWithoutPartyName[]> {
    const response = await this.fetchPage(url, {
      headers: { "Content-Type": "text/plain; charset=UTF-8" },
    });
    const html = await response.text();
    const $ = cheerio.load(html.replace(/\u00a0/g, " "));

    const title = $("h1").first().text().trim();

    return [
      {
        title,
        url,
        opinions: this.getOpinions($),
        updateDate: new Date().toISOString(),
        subject: undefined,
      },
    ];
  }

  async getPages(limit?: number): Promise<PartyDataWithoutPartyName[]> {
    const response = await this.fetchPage(
      "https://www.socialdemokraterna.se/rest-api/sitemapXml",
      {
        headers: { "Content-Type": "text/plain; charset=UTF-8" },
      },
    );

    const xmlText = await response.text();

    // Match anything inside <loc>...</loc>
    const locRegex = /<loc>(.*?)<\/loc>/gi;
    let urls: string[] = [];
    let match;

    while ((match = locRegex.exec(xmlText)) !== null) {
      const url = match[1].trim();

      if (pagePattern.test(url)) {
        urls.push(url);
      }
    }

    if (limit) {
      urls = urls.toSpliced(limit);
    }

    const promises = urls.map((url) => this.getStandpointPageFromUrl(url));

    return this.handleStandpointPagePromises(promises);
  }
}
