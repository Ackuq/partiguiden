import Scraper from "../scraper.ts";

export default class KDScraper extends Scraper {
  baseUrl = "https://kristdemokraterna.se";
  listPath = "/var-politik/politik-a-till-o";
  listSelector = ".item .content a";
  opinionTags = [".sv-text-portlet-content .font-normal"];
}
