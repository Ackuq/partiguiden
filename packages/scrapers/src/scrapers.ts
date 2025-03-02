import CScraper from "./party/c-scraper.ts";
import KDScraper from "./party/kd-scraper.ts";
import LScraper from "./party/l-scraper.ts";
import MScraper from "./party/m-scraper.ts";
import MPScraper from "./party/mp-scraper.ts";
import SScraper from "./party/s-scraper.ts";
import SDScraper from "./party/sd-scraper.ts";
import VScraper from "./party/v-scraper.ts";

const scrapers = {
  s: new SScraper(),
  c: new CScraper(),
  kd: new KDScraper(),
  l: new LScraper(),
  m: new MScraper(),
  mp: new MPScraper(),
  sd: new SDScraper(),
  v: new VScraper(),
};

export default scrapers;
