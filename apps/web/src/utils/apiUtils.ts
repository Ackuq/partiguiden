import type { NextApiResponse } from "next";

export const setCache = (
  serverTime: number,
  res: NextApiResponse,
  clientTime = 0,
) => {
  res.setHeader(
    "Cache-Control",
    `max-age=${clientTime}, s-maxage=${serverTime}`,
  );
};
