import Link from "next/link";

import Accordion from "@components/common/accordion";
import type { ProcessedDocument } from "@lib/api/vote/types";
import { routes } from "@lib/navigation";

interface Props {
  documents: ProcessedDocument[];
}

export function Documents({ documents }: Props) {
  return (
    <Accordion title="Behandlade dokument">
      <ul>
        {documents.map((document, index) => (
          <li key={document.id}>
            <Link
              href={routes.document(document.id)}
              className="text-teal-900 dark:text-teal-200 ml-4 hover:underline"
            >
              [{index}] {document.label}
            </Link>
          </li>
        ))}
      </ul>
    </Accordion>
  );
}
