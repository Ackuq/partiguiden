import type { NextApiRequest, NextApiResponse } from "next";
import { setCache } from "../../../../utils/apiUtils";
import { speechController } from "../../../../api/controllers/speech";

const ALLOWED_METHODS = ["GET"];

interface JsonDocumentApiRequest extends NextApiRequest {
  query: {
    protocol: string;
    number: string;
  };
}

const speechHandler = async (
  req: JsonDocumentApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const {
    query: { protocol, number },
    method,
  } = req;

  // Barely any changes, cache for 2 weekss
  setCache(1210000, res);

  if (!ALLOWED_METHODS.includes(method || "")) {
    res.setHeader("Allow", ALLOWED_METHODS);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  const document = await speechController(protocol, number);
  res.status(200).json(document);
};

export default speechHandler;
