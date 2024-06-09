import * as cheerio from "cheerio";

import { PARLIAMENT_BASE_URL } from "@lib/constants";

export default async function getDocumentHtml(id: string): Promise<string> {
  const response = await fetch(`${PARLIAMENT_BASE_URL}/dokument/${id}`, {
    cache: "force-cache",
  });

  const html = await response.text();

  const $ = cheerio.load(html);

  // Remove the custom style
  $("style").remove();
  // Remove the style attribute from all elements
  $("[style]").removeAttr("style");
  // Transform all image URLs to be HTTPS
  $("img").each((_, element) => {
    const src = $(element).attr("src");
    if (src) {
      $(element).attr("src", src.replace("http://", "https://"));
    }
  });

  return $.html();
}
