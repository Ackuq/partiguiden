import type { CheerioAPI } from "cheerio";

import Scraper from "../scraper.ts";

export default class VScraper extends Scraper {
  baseUrl = "https://www.vansterpartiet.se";
  listPath = "/var-politik/politik-a-o/";
  listSelector = ".politik-kb a.el-link";

  protected getOpinions($: CheerioAPI): string[] {
    const $main = $("main");

    const $articleBody = $main.find("#template-s6_M7Q_F\\#0");

    const $listElements = $articleBody.find("li");
    if ($listElements.length) {
      return $listElements.toArray().map(($element) => $($element).text());
    }

    const $strongParagraphs = $articleBody.find("p strong");
    if ($strongParagraphs.length) {
      return $strongParagraphs
        .toArray()
        .map(($paragraph) => $($paragraph).text().trim())
        .filter((text) => text !== "");
    }

    const $firstParagraph = $articleBody.find("p").first();
    if ($firstParagraph.length) {
      return [this.cleanText($firstParagraph.text())];
    }

    return [];
  }
}
