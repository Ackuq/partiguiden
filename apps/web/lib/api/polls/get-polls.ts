import { getBlockAverage } from "./get-block-average";
import getMonthlyAverage from "./get-monthly-average";
import getPollAverage from "./get-poll-average";
import parsePolls from "./parsers/parse-polls";
import { getWithin } from "./utils/get-within";

const POLLS_URL =
  "https://raw.githubusercontent.com/MansMeg/SwedishPolls/refs/heads/master/Data/Polls.csv";

export default async function getPolls() {
  const response = await fetch(POLLS_URL, {
    next: { revalidate: 60 * 60 * 24 },
  });
  const csv = await response.text();

  const fourYearsAgo = new Date();
  fourYearsAgo.setFullYear(fourYearsAgo.getFullYear() - 4);
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

  // Only extract the latest 4 years polls
  const polls = parsePolls(csv, fourYearsAgo);

  const currentMonthAverage = getPollAverage(getWithin(polls, twoMonthsAgo));
  const historicPolls = getMonthlyAverage(polls);
  const blockAverage = getBlockAverage(currentMonthAverage);

  return { currentMonthAverage, historicPolls, blockAverage };
}
