"use client";
import type { MemberDocuments } from "@lib/api/member/types";
import { useState } from "react";

function Document() {
  return <div>hej</div>;
}

interface Props {
  memberId: string;
  initialDocuments: MemberDocuments;
}

export default function Documents({ initialDocuments, memberId }: Props) {
  const [documents, setDocuments] = useState(initialDocuments.documents);

  return (
    <>
      {documents.map((document) => (
        <div key={document.id}>{document.altTitle}</div>
      ))}
    </>
  );
}
