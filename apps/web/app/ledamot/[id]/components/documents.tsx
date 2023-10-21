"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { Card, CommitteeHeader } from "@components/common/card";
import Pagination from "@components/common/pagination";
import type { MemberDocument, MemberDocuments } from "@lib/api/member/types";
import { routes } from "@lib/navigation";

interface DocumentProps {
  document: MemberDocument;
}

function Document({ document }: DocumentProps) {
  return (
    <Link href={routes.document(document.id)} prefetch={false}>
      <Card className="p-0 transition-opacity hover:opacity-75 dark:shadow-slate-900">
        <CommitteeHeader committee={document.committee} />
        <div className="p-4 ">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {document.title}
          </p>
          <p className="pb-1">{document.altTitle}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {document.subtitle}
          </p>
        </div>
      </Card>
    </Link>
  );
}

interface Props {
  memberId: string;
  initialDocuments: MemberDocuments;
}

export default function Documents({ initialDocuments, memberId }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(1);
  const [documents, setDocuments] = useState(initialDocuments.documents);

  async function changePage(page: number) {
    const response = await fetch(
      `${window.location.origin}${routes.api.memberDocument(memberId, page)}`,
      { next: { revalidate: 60 * 60 * 24 } },
    );
    const newDocuments: MemberDocuments = await response.json();
    setPage(page);
    setDocuments(newDocuments.documents);
    containerRef.current?.scrollIntoView();
  }

  return (
    <div
      className="scroll-mt-header-with-margin sm:scroll-mt-header-sm-with-margin m-4 flex flex-col gap-4"
      ref={containerRef}
    >
      <Pagination
        current={page}
        total={initialDocuments.pages}
        onChange={changePage}
      />
      {documents.map((document) => (
        <Document key={document.id} document={document} />
      ))}
      <Pagination
        current={page}
        total={initialDocuments.pages}
        onChange={changePage}
      />
    </div>
  );
}
