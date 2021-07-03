import { NextApiRequest, NextApiResponse } from 'next';
import { jsonDocumentController } from '../../../../src/api/controllers/document';

const ALLOWED_METHODS = ['GET'];

interface JsonDocumentApiRequest extends NextApiRequest {
  query: {
    id: string;
  };
}

const memberHandler = async (req: JsonDocumentApiRequest, res: NextApiResponse): Promise<void> => {
  const {
    query: { id },
    method,
  } = req;

  if (!ALLOWED_METHODS.includes(method || '')) {
    res.setHeader('Allow', ALLOWED_METHODS);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const document = await jsonDocumentController(id);
  res.status(200).json(document);
};

export default memberHandler;
