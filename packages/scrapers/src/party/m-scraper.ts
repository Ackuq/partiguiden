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

  protected getUrl(href: string): string | undefined {
    // Invalid link, will cause the program to error
    if (href === "https://moderaterna.se/?post_type=subject-post&p=563") {
      return;
    }
    return super.getUrl(href);
  }
}
