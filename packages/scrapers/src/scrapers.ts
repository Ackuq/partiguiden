import CScraper from "./party/c-scraper";
import KDScraper from "./party/kd-scraper";
import LScraper from "./party/l-scraper";
import MScraper from "./party/m-scraper";
import MPScraper from "./party/mp-scraper";
import SScraper from "./party/s-scraper";
import SDScraper from "./party/sd-scraper";
import VScraper from "./party/v-scraper";

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
