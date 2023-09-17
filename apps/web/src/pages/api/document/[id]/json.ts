import type { NextApiRequest, NextApiResponse } from "next";
import { jsonDocumentController } from "../../../../api/controllers/document";
import { setCache } from "../../../../utils/apiUtils";

const ALLOWED_METHODS = ["GET"];

interface JsonDocumentApiRequest extends NextApiRequest {
  query: {
    id: string;
  };
}

const memberHandler = async (
  req: JsonDocumentApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const {
    query: { id },
    method,
  } = req;

  // Barely any changes, cache for 2 weekss
  setCache(1210000, res);

  if (!ALLOWED_METHODS.includes(method || "")) {
    res.setHeader("Allow", ALLOWED_METHODS);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const document = await jsonDocumentController(id);
  res.status(200).json(document);
};

export default memberHandler;
