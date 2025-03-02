import Scraper from "../scraper.ts";

export default class CScraper extends Scraper {
  baseUrl = "https://www.centerpartiet.se";
  listPath = "/var-politik/politik-a-o";
  listSelector = ".sol-collapse-decoration.sol-political-area a";
  opinionTags = [
    "p:contains('vill') + ul > li",
    "p:contains('anser') + ul > li",
  ];
  pathRegex = /\/[/.a-zA-Z0-9-]+/;
}
