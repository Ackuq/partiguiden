import type { NextApiRequest, NextApiResponse } from "next";
import type { PartyAbbreviation } from "../../../utils/parties";
import { partyAbbreviations } from "../../../utils/parties";
import { partyController } from "../../../api/controllers/parties";
import { setCache } from "../../../utils/apiUtils";

const ALLOWED_METHODS = ["GET"];

interface PartyApiRequest extends NextApiRequest {
  query: {
    party: Lowercase<PartyAbbreviation>;
  };
}

const partyHandler = async (
  req: PartyApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const {
    query: { party },
    method,
  } = req;

  // Very static, cache for a week
  setCache(604800, res);

  if (!ALLOWED_METHODS.includes(method || "")) {
    res.setHeader("Allow", ALLOWED_METHODS);
    res.status(405).end(`Method ${method} Not Allowed`);
    return;
  }

  if (!partyAbbreviations.includes(party.toUpperCase() as PartyAbbreviation)) {
    res.status(400).end(`${party} is not a valid party`);
  }
  try {
    const partyData = await partyController(
      party.toLocaleLowerCase() as Lowercase<PartyAbbreviation>,
    );
    res.status(200).json(partyData);
  } catch (error) {
    res.status(500).end("Something went wrong");
  }
};

export default partyHandler;