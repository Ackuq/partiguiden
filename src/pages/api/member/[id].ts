import { NextApiRequest, NextApiResponse } from 'next';
import { memberController } from '../../../api/controllers/members';
import { setCache } from '../../../utils/apiUtils';

const ALLOWED_METHODS = ['GET'];

interface MemberApiRequest extends NextApiRequest {
  query: {
    id: string;
  };
}

const memberHandler = async (req: MemberApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    query: { id },
    method,
  } = req;

  // The absence can change somewhat frequently, cache for 2 days
  setCache(172800, res);

  if (!ALLOWED_METHODS.includes(method || '')) {
    res.setHeader('Allow', ALLOWED_METHODS);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const member = await memberController(id);
  res.status(200).json(member);
};

export default memberHandler;
