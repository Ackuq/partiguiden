import { NextApiRequest, NextApiResponse } from 'next';
import { membersController } from '../../api/controllers/members';
import { setCache } from '../../utils/apiUtils';

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

  // 1 week
  setCache(604800, res);

  if (!ALLOWED_METHODS.includes(method || '')) {
    res.setHeader('Allow', ALLOWED_METHODS);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const members = await membersController(party);
  res.status(200).json(members);
};

export default membersHandler;
