import { NextApiRequest, NextApiResponse } from 'next';
import { decisionsController } from '../../src/api/controllers/decisions';

const ALLOWED_METHODS = ['GET'];

const decisionsHandler = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    query: { search, org, page },
    method,
  } = req;

  if (!ALLOWED_METHODS.includes(method || '')) {
    res.setHeader('Allow', ALLOWED_METHODS);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const decisions = await decisionsController(search as string, org as string, page as string);
  res.status(200).json(decisions);
};

export default decisionsHandler;
