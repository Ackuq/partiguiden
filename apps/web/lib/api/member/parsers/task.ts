import type { PersonTask } from "@lib/api/parliament/types";
import type { Task } from "../types";

export default function parseTask(unparsed: PersonTask): Task {
  const {
    organ_kod: authorityCode,
    roll_kod: role,
    status,
    uppgift: content,
    typ: type,
    from,
    tom: to,
  } = unparsed;

  const parsedContent =
    Array.isArray(content) &&
    content.length > 0 &&
    typeof content[0] === "string"
      ? (content as string[])
      : [];

  return {
    authorityCode,
    role,
    content: parsedContent,
    status,
    type,
    from,
    to,
  };
}
