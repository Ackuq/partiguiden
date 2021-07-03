import { NextApiRequest, NextApiResponse } from 'next';
import { memberController } from '../../../src/api/controllers/members';

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

  if (!ALLOWED_METHODS.includes(method || '')) {
    res.setHeader('Allow', ALLOWED_METHODS);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const member = await memberController(id);
  res.status(200).json(member);
};

export default memberHandler;
