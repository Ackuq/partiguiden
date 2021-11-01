import { NextApiRequest, NextApiResponse } from 'next';
import { memberDocumentsController } from '../../../../api/controllers/document';

const ALLOWED_METHODS = ['GET'];

interface MemberDocumentApiRequest extends NextApiRequest {
  query: {
    id: string;
    page?: string;
  };
}

const memberHandler = async (
  req: MemberDocumentApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const {
    query: { id, page },
    method,
  } = req;

  if (!ALLOWED_METHODS.includes(method || '')) {
    res.setHeader('Allow', ALLOWED_METHODS);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const memberDocuments = await memberDocumentsController(id, page);
  res.status(200).json(memberDocuments);
};

export default memberHandler;
