import { PARLIAMENT_BASE_URL } from "@lib/constants";
import type { DocumentStatus } from "../parliament/types";
import parseDebate from "./parsers/debate";

export default async function getDebate(id: string) {
  const response = await fetch(
    `${PARLIAMENT_BASE_URL}/dokumentstatus/${id}.json`,
  );

  if (!response.ok) {
    return;
  }

  const data: DocumentStatus = await response.json();
  return parseDebate(data);
}
