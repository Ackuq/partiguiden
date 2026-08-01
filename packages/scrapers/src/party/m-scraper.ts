import type { CheerioAPI } from "cheerio";

import Scraper from "../scraper.ts";

export default class MScraper extends Scraper {
  baseUrl = "https://moderaterna.se";
  listPath = "/var-politik";
  listSelector = ".subjects-alphabet-list section div a";
  opinionTags = [
    ".site-main__article.site-main__entry-content h2:contains('Därför vill och arbetar Moderaterna för att:') + ul li",
    ".site-main__article.site-main__entry-content h3:contains('Därför vill och arbetar Moderaterna för att:') + ul li",
  ];
  opinionHeaders = {
    "Det här vill vi göra": "h2",
    "Vad Moderaterna vill göra mer för förskolan": "h2",
    "Fakta om Moderaternas försvarspolitik": "h3",
  };
  absoluteUrls = true;

  protected getOpinions($: CheerioAPI): string[] {
    let opinions = super.getOpinions($);

    if (opinions.length > 0) {
      return opinions;
    }

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

  protected getUrl(href: string): string | undefined {
    // Invalid link, will cause the program to error
    if (href === "https://moderaterna.se/?post_type=subject-post&p=563") {
      return;
    }
    return super.getUrl(href);
  }
}
