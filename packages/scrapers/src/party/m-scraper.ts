import Scraper from "../scraper.ts";

export default class MScraper extends Scraper {
  baseUrl = "https://moderaterna.se";
  listPath = "/var-politik";
  listSelector =
    ".search-subjects__content--search__form--list__subjects ul li a";
  opinionTags = [
    ".site-main__article.site-main__entry-content ul li",
    ".site-main__article.site-main__entry-content h2:contains('Moderaterna vill')",
  ];
  absoluteUrls = true;
}
