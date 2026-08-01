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
  opinionHeaders?: Record<string, string>;
  absoluteUrls = false;
  pathRegex?: RegExp;

  /**
   * Normalize whitespace in text.
   */
  protected cleanText(text: string): string {
    return text.replace(/\s+/g, " ").trim();
  }

  protected getOpinions($: CheerioAPI): string[] {
    // Test tags until we found a result
    if (!this.opinionTags) {
      return [];
    }
    for (const tag of this.opinionTags) {
      const $opinionElements = $(tag);
      if ($opinionElements.length > 0) {
        return $opinionElements
          .toArray()
          .map(($element) => $($element).text().trim())
          .filter((text) => text !== "");
      }
    }

    return this.extractOpinionHeaders($);
  }

  protected extractOpinionHeaders($: CheerioAPI): string[] {
    if (!this.opinionHeaders) {
      return [];
    }

    let opinions: string[] = [];

    for (const [opinionHeader, stopSignal] of Object.entries(
      this.opinionHeaders,
    )) {
      const extractedContent: string[] = [];
      $(`h2:contains('${opinionHeader}')`).map((_i, el) =>
        $(el)
          .nextUntil(stopSignal, "p,ul")
          .each((_j, node) => {
            const $node = $(node);
            if ($node.is("p")) {
              // Filter out paragraphs that are purely <strong> tags or empty
              const $p = $node.clone();
              $p.find("strong").remove();

              const text = $p.text().trim();
              if (text.length > 0) {
                extractedContent.push(text);
              }
            } else if ($node.is("ul")) {
              $node.find("li").each((_k, li) => {
                const $li = $(li).clone();

                // Remove all nested lists inside it
                $li.find("ul, ol").remove();

                const liText = $li.text().trim();
                if (liText.length > 0) {
                  extractedContent.push(liText);
                }
              });
            }
          }),
      );

      if (extractedContent.length > 0) {
        opinions = opinions.concat(extractedContent);
      }
    }

    return opinions;
  }

  protected getUrl(href: string) {
    if (href.startsWith("#")) {
      return;
    }
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

  protected async fetchPage(
    url: string,
    opts: Parameters<typeof fetch>[1],
    retryCount = 0,
  ): Promise<Response> {
    try {
      const response = await fetch(url, opts);
      if (!response.ok) {
        throw new Error(`Failed to fetch page, status: ${response.status}`);
      }
      return response;
    } catch (error) {
      if (retryCount < 3) {
        console.warn(
          `Fetch failed for URL ${url} with error: ${error as Error}. Retrying (${retryCount + 1}/3)...`,
        );
        await new Promise((resolve) =>
          setTimeout(resolve, Math.floor(Math.random() * 2000)),
        );
        return this.fetchPage(url, opts, retryCount + 1);
      } else {
        console.error(
          `Failed to fetch page ${url} after 3 attempts: ${error as Error}`,
        );
        throw error;
      }
    }
  }

  protected async getStandpointPageData(
    $link: Cheerio<Element>,
  ): Promise<
    (Omit<PartyDataWithoutPartyName, "opinions"> & { html: string }) | undefined
  > {
    let title = this.cleanText($link.text());

    if (title === "") {
      title = $link.attr("title") ?? "";
    }

    const href = $link.attr("href");

    if (!href) {
      return;
    }

    const url = this.getUrl(href);

    if (!url) {
      return;
    }

    // Sleep so we do not get rate limited
    await new Promise((resolve) =>
      setTimeout(resolve, Math.floor(Math.random() * 2000)),
    );

    const response = await this.fetchPage(url, {
      headers: { "Content-Type": "text/plain; charset=UTF-8" },
    });

    const html = await response.text();

    return {
      title,
      url,
      updateDate: new Date().toISOString(),
      subject: undefined,
      html,
    };
  }

  protected async getStandpointPage(
    $link: Cheerio<Element>,
  ): Promise<PartyDataWithoutPartyName[]> {
    const data = await this.getStandpointPageData($link);
    if (!data) {
      return [];
    }
    const { title, url, html, updateDate, subject } = data;
    const opinions = this.getOpinions(cheerio.load(html));

    return [
      {
        opinions,
        title,
        url,
        updateDate,
        subject,
      },
    ];
  }

  protected async handleLinks(
    $: CheerioAPI,
    elements: Element[],
  ): Promise<PartyDataWithoutPartyName[]> {
    const promises = elements.map((element) =>
      this.getStandpointPage($(element)),
    );

    return this.handleStandpointPagePromises(promises);
  }

  protected async handleStandpointPagePromises(
    promises: Promise<PartyDataWithoutPartyName[]>[],
  ) {
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
        ): promiseResult is PromiseFulfilledResult<PartyData[string][]> =>
          promiseResult.status === "fulfilled",
      )
      .map((fulfilled) => fulfilled.value);

    return resolved.flat();
  }

  async getPages(limit?: number): Promise<PartyDataWithoutPartyName[]> {
    const response = await this.fetchPage(this.baseUrl + this.listPath, {
      headers: { "Content-Type": "text/plain; charset=UTF-8" },
    });
    const html = await response.text();
    const $ = cheerio.load(html);
    let elements = $<Element, string>(this.listSelector).toArray();

    if (limit) {
      elements = elements.toSpliced(limit);
    }

    console.info(`Found ${elements.length} list elements`);

    return this.handleLinks($, elements);
  }
}
