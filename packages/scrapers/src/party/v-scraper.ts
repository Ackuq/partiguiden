import type { CheerioAPI } from "cheerio";

import Scraper from "../scraper.ts";

export default class VScraper extends Scraper {
  baseUrl = "https://www.vansterpartiet.se";
  listPath = "/var-politik/politik-a-o/";
  listSelector = ".ModuleWrapper-module--component--W7iGr section a";

  protected getOpinions($: CheerioAPI): string[] {
    const $articleBody = $("div.ArticleBody-module--component--f0xhF");

    const $listElements = $articleBody.find("li");
    if ($listElements.length) {
      return $listElements.toArray().map(($element) => $($element).text());
    }
    const $preamble = $articleBody.find(
      "div.ArticleBody-module--preamble--\\+K5Nt",
    );
    if ($preamble?.children().length) {
      return $preamble
        .children()
        .toArray()
        .map(($paragraph) => $($paragraph).text().trim())
        .filter((text) => text !== "");
    }

    const $strongParagraphs = $articleBody.find("p strong");
    if ($strongParagraphs.length) {
      return $strongParagraphs
        .toArray()
        .map(($paragraph) => $($paragraph).text().trim())
        .filter((text) => text !== "");
    }

    return [];
  }
}
