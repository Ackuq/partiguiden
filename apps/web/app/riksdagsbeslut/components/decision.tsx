"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";

import { PrimaryButton } from "@components/common/button";
import { Card, CommitteeHeader } from "@components/common/card";
import { Divider } from "@components/common/divider";
import type { Decision as TDecision } from "@lib/api/decisions/types";
import { routes } from "@lib/navigation";

interface Props {
  decision: TDecision;
}

export default function Decision({ decision }: Props) {
  const [visible, setVisible] = useState(false);

  function toggleVisible() {
    setVisible((prevState) => !prevState);
  }

  return (
    <Card className="p-0">
      <CommitteeHeader committee={decision.committee} />

      <button
        className="group flex w-full justify-between gap-4 p-4 text-left"
        onClick={toggleVisible}
        aria-expanded={visible}
      >
        <div>
          <p className="text-md mb-2 sm:text-lg">{decision.paragraphTitle}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {decision.title}
          </p>
        </div>
        <ChevronDownIcon className="h-6 w-6 shrink-0 transition-transform group-aria-expanded:rotate-180 sm:h-8 sm:w-8" />
      </button>
      <Divider aria-hidden={!visible} className="aria-hidden:hidden" />
      <div
        aria-hidden={!visible}
        className="flex flex-col gap-4 px-4 pb-4 aria-hidden:hidden"
      >
        {decision.paragraph && (
          <div
            className="text-sm [&_p]:my-4"
            dangerouslySetInnerHTML={{ __html: decision.paragraph }}
          />
        )}
        <Link href={routes.document(decision.id)} target="_blank">
          <PrimaryButton>Läs mer om betänkandet</PrimaryButton>
        </Link>
        {decision.votesExists && (
          <Link
            href={`${routes.votes}?sok=${encodeURIComponent(decision.voteSearchTerm)}`}
            target="_blank"
          >
            <PrimaryButton>Läs mer om voteringarna</PrimaryButton>
          </Link>
        )}
      </div>
    </Card>
  );
}
