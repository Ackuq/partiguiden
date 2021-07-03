import { NextApiRequest, NextApiResponse } from 'next';
import { memberSearchController } from '../../../src/api/controllers/members';

const ALLOWED_METHODS = ['GET'];

interface MemberApiRequest extends NextApiRequest {
  query: {
    firstName?: string;
    lastName?: string;
    party?: string;
  };
}

const memberHandler = async (req: MemberApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    query: { firstName, lastName, party },
    method,
  } = req;

  if (!ALLOWED_METHODS.includes(method || '')) {
    res.setHeader('Allow', ALLOWED_METHODS);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const member = await memberSearchController(firstName, lastName, party);

  res.status(200).json(member);
};

export default memberHandler;
