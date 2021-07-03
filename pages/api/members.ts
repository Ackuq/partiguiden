import { NextApiRequest, NextApiResponse } from 'next';
import { membersController } from '../../src/api/controllers/members';

const ALLOWED_METHODS = ['GET'];

interface MembersApiRequest extends NextApiRequest {
  query: {
    party?: string;
  };
}

const membersHandler = async (req: MembersApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    query: { party },
    method,
  } = req;

  if (!ALLOWED_METHODS.includes(method || '')) {
    res.setHeader('Allow', ALLOWED_METHODS);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const members = await membersController(party);
  res.status(200).json(members);
};

export default membersHandler;
