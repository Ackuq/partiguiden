import Link from "next/link";

import { Card, CommitteeHeader } from "@components/common/card";
import type { VoteListEntry } from "@lib/api/vote/types";
import { routes } from "@lib/navigation";

import VoteResult from "./vote-result";

interface Props {
  vote: VoteListEntry;
}

export default function Vote({ vote }: Props) {
  return (
    <Link href={routes.vote(vote.documentId, vote.proposition)}>
      <Card className="p-0">
        <CommitteeHeader committee={vote.committee} />
        <div className="p-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {vote.title}
          </p>
          <p>{vote.subtitle}</p>
        </div>
        <VoteResult votes={vote.results} />
      </Card>
    </Link>
  );
}
