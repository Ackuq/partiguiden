import type { NextApiRequest, NextApiResponse } from "next";
import { debatesController } from "../../../api/controllers/debate";
import { setCache } from "../../../utils/apiUtils";

const ALLOWED_METHODS = ["GET"];

interface JsonDocumentApiRequest extends NextApiRequest {
  query: {
    id: string;
  };
}

const debateHandler = async (
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

  const document = await debatesController(id);
  res.status(200).json(document);
};

export default debateHandler;
