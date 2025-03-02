import Scraper from "../scraper.ts";

export default class LScraper extends Scraper {
  baseUrl = "https://www.liberalerna.se";
  listPath = "/politik-a-o/";
  listSelector = ".politicsIdx-list-group a";
  opinionTags = [".spolitik-content.container > .wysiwyg-content p"];
  absoluteUrls = true;
}
