import { NextApiRequest, NextApiResponse } from 'next';
import { voteController } from '../../../../src/api/controllers/vote';

const ALLOWED_METHODS = ['GET'];

interface VoteApiRequest extends NextApiRequest {
  query: {
    id: string;
    proposition: string;
  };
}

const voteHandler = async (req: VoteApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    query: { id, proposition },
    method,
  } = req;

  if (!ALLOWED_METHODS.includes(method || '')) {
    res.setHeader('Allow', ALLOWED_METHODS);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const vote = await voteController(id, proposition);
  res.status(200).json(vote);
};

export default voteHandler;
