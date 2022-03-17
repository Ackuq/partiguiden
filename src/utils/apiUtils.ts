import { NextApiResponse } from 'next';

export const setCache = (time: number, res: NextApiResponse) => {
  res.setHeader('Cache-Control', `max-age=0, s-maxage=${time}`);
};
