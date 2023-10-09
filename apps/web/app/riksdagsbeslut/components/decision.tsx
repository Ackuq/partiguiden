"use client";
import { PrimaryButton } from "@components/common/button";
import { Card, CommitteeHeader } from "@components/common/card";
import { Divider } from "@components/common/divider";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import type { Decision } from "@lib/api/decisions/types";
import { routes } from "@lib/navigation";
import Link from "next/link";
import { useState } from "react";

interface Props {
  decision: Decision;
}
export default function Decision({ decision }: Props) {
  const [visible, setVisible] = useState(false);

  function toggleVisible() {
    setVisible((prevState) => !prevState);
  }

  return (
    <Card className="group p-0" aria-expanded={visible}>
      <CommitteeHeader committee={decision.committee} />

      <button
        className="flex w-full justify-between gap-4 p-4 text-left"
        onClick={toggleVisible}
      >
        <div>
          <p className="text-md mb-2 sm:text-lg">{decision.paragraphTitle}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {decision.title}
          </p>
        </div>
        <ChevronDownIcon className="h-6 w-6 flex-shrink-0 transition-transform group-aria-expanded:rotate-180 sm:h-8 sm:w-8" />
      </button>
      <Divider className="group-aria-[expanded=false]:hidden" />
      <div className="flex flex-col gap-4 px-4 pb-4 group-aria-[expanded=false]:hidden">
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
            href={`${routes.votes}?sok=${decision.voteSearchTerm}`}
            target="_blank"
          >
            <PrimaryButton>Läs mer om voteringarna</PrimaryButton>
          </Link>
        )}
      </div>
    </Card>
  );
}
