import type { PersonInformation } from "@lib/api/parliament/types";
import type { Information } from "../types";

export default function parseInformation(
  unparsed: PersonInformation,
): Information {
  const { kod: code, uppgift: content, typ: type } = unparsed;
  const parsedContent =
    Array.isArray(content) &&
    content.length > 0 &&
    typeof content[0] === "string"
      ? (content as string[])
      : [];
  return { code, content: parsedContent, type };
}
