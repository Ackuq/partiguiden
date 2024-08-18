import type { Cheerio, CheerioAPI } from "cheerio";
import * as cheerio from "cheerio";
import type { Element } from "domhandler";

import type {
  PartyData,
  PartyDataWithoutPartyName,
} from "@partiguiden/party-data/types";

interface ScraperArgs {
  baseUrl: string;
  listPath: string;
  listSelector: string;
  absoluteUrls: boolean;
  pathRegex?: RegExp;
  opinionTags?: string[];
}

export default abstract class Scraper implements ScraperArgs {
  abstract baseUrl: string;
  abstract listPath: string;
  abstract listSelector: string;
  opinionTags?: string[];
  absoluteUrls = false;
  pathRegex?: RegExp;

  protected getOpinions($: CheerioAPI): string[] {
    // Test tags until we found a result
    if (!this.opinionTags) {
      return [];
    }
    for (const tag of this.opinionTags) {
      const $opinionElements = $(tag);
      if ($opinionElements.length > 0) {
        return $opinionElements.toArray().map(($element) => $($element).text());
      }
    }
    return [];
  }

  protected getUrl(href: string) {
    if (!this.absoluteUrls) {
      if (!this.pathRegex) {
        return this.baseUrl + href;
      }
      const match = href?.match(this.pathRegex);
      if (!match) {
        console.warn(
          `Failed to extract URL with regex ${this.pathRegex} and path ${href}`,
        );
        return;
      }
      return this.baseUrl + match[0];
    }
    return href;
  }

  protected async getStandpointPage(
    $link: Cheerio<Element>,
  ): Promise<PartyDataWithoutPartyName> {
    let title = $link.text();

    if (title.trim() === "") {
      title = $link.attr("title") ?? "";
    }

    const href = $link.attr("href");

    if (!href) {
      throw new Error(
        `Found no href attribute to be extracted from page ${title}`,
      );
    }

    const url = this.getUrl(href);

    if (!url) {
      throw new Error(
        `Failed to extract URL for page ${title}, got no path...`,
      );
    }

    // Sleep so we do not get rate limited
    await new Promise((resolve) =>
      setTimeout(resolve, Math.floor(Math.random() * 2000)),
    );

    const response = await fetch(url, {
      headers: { "Content-Type": "text/plain; charset=UTF-8" },
    });

    const html = await response.text();
    const opinions = this.getOpinions(cheerio.load(html));

    return {
      opinions,
      title,
      url,
      fetchDate: new Date().toISOString(),
      subject: undefined,
    };
  }

  async getPages(): Promise<PartyDataWithoutPartyName[]> {
    const response = await fetch(this.baseUrl + this.listPath, {
      headers: { "Content-Type": "text/plain; charset=UTF-8" },
    });
    const html = await response.text();
    const $ = cheerio.load(html);
    const $elements = $(this.listSelector);

    console.info(`Found ${$elements.length} list elements`);

    const promises = $elements
      .toArray()
      .map(($element) => this.getStandpointPage($($element as Element)));
    const result = await Promise.allSettled(promises);
    const failed = result.filter(
      (promiseResult): promiseResult is PromiseRejectedResult =>
        promiseResult.status === "rejected",
    );
    for (const fail of failed) {
      console.error("Promise failed with reason:", fail.reason);
    }
    const resolved = result
      .filter(
        (
          promiseResult,
        ): promiseResult is PromiseFulfilledResult<PartyData[string]> =>
          promiseResult.status === "fulfilled",
      )
      .map((fulfilled) => fulfilled.value);
    return resolved;
  }
}
