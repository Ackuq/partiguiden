import type { VoteAppendixItem } from "@lib/api/vote/types";

interface Props {
  documents: VoteAppendixItem[];
}

export function Appendix({ documents }: Props) {
  return (
    <div>
      {documents.map((document) => (
        <a
          className="text-teal-900 dark:text-teal-200 hover:underline"
          href={document.fil_url}
          key={document.fil_url}
          target="_blank"
          rel="noopener"
        >
          {document.titel} {document.dok_id}
        </a>
      ))}
    </div>
  );
}
