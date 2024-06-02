import type { DocumentReference } from "@lib/api/parliament/types";

import type { ProcessedDocument } from "../types";

interface ReferencesResponse {
  processedDocuments: ProcessedDocument[];
  propositionText: string;
}

export default function createReferences(
  unparsedProposition: string,
  references: DocumentReference[],
): ReferencesResponse {
  /* Remove newlines */
  let proposition = unparsedProposition.replace(/(<br>)|<BR\/>/gm, " ");
  /* Regex to find references in suggestion text */
  /* Matches for example: 2019/20:3635 */
  const referenceRegex = /[0-9]{4}\/[0-9]{2}:[A-ö]{0,4}[0-9]{0,4}/gm;

  const referencedDocuments: string[] = [];

  let match;

  while ((match = referenceRegex.exec(proposition))) {
    if (!referencedDocuments.includes(match[0])) {
      referencedDocuments.push(match[0]);
    }
  }

  const processedDocuments: ProcessedDocument[] = [];

  for (let i = 0; i < referencedDocuments.length; i += 1) {
    const sectionStart = proposition.indexOf(referencedDocuments[i]);
    const sectionEnd =
      i < referencedDocuments.length - 1
        ? proposition.indexOf(referencedDocuments[i + 1])
        : proposition.length;

    const id =
      references.find(
        (reference) =>
          `${reference.ref_dok_rm}:${reference.ref_dok_bet}` ===
          referencedDocuments[i],
      )?.ref_dok_id ?? "";

    const section = proposition.slice(sectionStart, sectionEnd);

    if (section.includes(")")) {
      /* Replace EX: "2019/20:3642 av Helena Lindahl m.fl. (C)"" */
      const endIndex = section.indexOf(")") + 1;
      const label = section.substring(0, endIndex);
      processedDocuments.push({ id, label });

      proposition = proposition.split(label).join(`[${i}]`);
    } else {
      /* Just replace the ID, EX: "2019/20:3642" */
      processedDocuments.push({
        id,
        label: referencedDocuments[i],
      });
      proposition = proposition.split(referencedDocuments[i]).join(`[${i}]`);
    }
  }

  return {
    processedDocuments,
    propositionText: proposition,
  };
}
