import * as cheerio from "cheerio";
import type { Element } from "domhandler";

import type { PartyDataWithoutPartyName } from "@partiguiden/party-data/types";

import Scraper from "../scraper.ts";

export default class CScraper extends Scraper {
  baseUrl = "https://www.centerpartiet.se";
  listPath = "/var-politik/centerpartiets-politik-a-o";
  listSelector = ".result-container .result-wrapper a";
  opinionTags = ["*[id^='h-Centerpartietvill'] + ul > li"];
  pathRegex = /\/[/.a-zA-Z0-9-]+/;

  private async getSubStandpointPages(
    $: cheerio.CheerioAPI,
  ): Promise<PartyDataWithoutPartyName[]> {
    // Get the currrent page's entry, if it has subpages
    const $current = $(".sol-menu-list .sol-menu-item.current.has-children");

    if ($current.length === 0) {
      return [];
    }

    if ($current.length > 1) {
      throw new Error("Found multiple current menu items");
    }

    const subLinks = $current.find(".sol-menu-list .sol-menu-item a").toArray();

    const subPages = await this.handleLinks($, subLinks);

    return subPages;
  }

  override async getStandpointPage(
    $link: cheerio.Cheerio<Element>,
  ): Promise<PartyDataWithoutPartyName[]> {
    const { title, url, html, fetchDate, subject } =
      await this.getStandpointPageData($link);

    const opinions = this.getOpinions(cheerio.load(html));

    const subPages = await this.getSubStandpointPages(cheerio.load(html));

    return [
      {
        opinions,
        title,
        url,
        fetchDate,
        subject,
      },
      ...subPages,
    ];
  }
}
