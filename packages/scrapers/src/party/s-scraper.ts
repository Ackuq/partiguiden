import Scraper from "../scraper.ts";

export default class SScraper extends Scraper {
  baseUrl = "https://www.socialdemokraterna.se";
  listPath = "/var-politik/a-till-o";
  listSelector = ".sap-ao-lettergroup-topic-box > a";
  opinionTags = [
    "main div.sv-text-portlet.sv-use-margins > div.sv-text-portlet-content > ul > li",
  ];
}
