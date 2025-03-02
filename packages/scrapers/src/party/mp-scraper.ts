import Scraper from "../scraper.ts";

export default class MPScraper extends Scraper {
  baseUrl = "https://www.mp.se";
  listPath = "/politik";
  listSelector = ".questions > div div.question .question-content a";
  opinionTags = [
    "h2:contains('Miljöpartiet vill') + ul li",
    "p:contains('Miljöpartiet vill') + ul li",
    "p:contains('Vi vill också förändra nuvarande system genom att:') + ul li",
    "h3:contains('Miljöpartiet vill') + ul li",
  ];
  absoluteUrls = true;
}
