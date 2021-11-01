import { NextApiRequest, NextApiResponse } from 'next';
import { votesController } from '../../../api/controllers/votes';

const ALLOWED_METHODS = ['GET'];

interface VotesApiRequest extends NextApiRequest {
  query: {
    search?: string;
    org?: string;
    page?: string;
  };
}

const votesHandler = async (req: VotesApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    query: { search, org, page },
    method,
  } = req;

  if (!ALLOWED_METHODS.includes(method || '')) {
    res.setHeader('Allow', ALLOWED_METHODS);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const votes = await votesController(search, org, page);
  res.status(200).json(votes);
};

export default votesHandler;
