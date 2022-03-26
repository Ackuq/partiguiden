import { NextApiRequest, NextApiResponse } from 'next';
import { debatesController } from '../../../api/controllers/debates';
import { setCache } from '../../../utils/apiUtils';

const ALLOWED_METHODS = ['GET'];

const debateHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    query: { search, org, page },
    method,
  } = req;

  // 1 hours
  setCache(3600, res);

  if (!ALLOWED_METHODS.includes(method || '')) {
    res.setHeader('Allow', ALLOWED_METHODS);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const debates = await debatesController(search as string, org as string, page as string);
  res.status(200).json(debates);
};

export default debateHandler;
