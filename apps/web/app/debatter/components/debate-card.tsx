import Link from "next/link";

import { Card, CommitteeHeader } from "@components/common/card";
import MemberImage from "@components/parliament/member-image";
import type { DebateListEntry } from "@lib/api/debates/types";
import { routes } from "@lib/navigation";

interface Props {
  debate: DebateListEntry;
}

export default function DebateCard({ debate }: Props) {
  return (
    <Link href={routes.debate(debate.id)} prefetch={false}>
      <Card className="p-0">
        {debate.committee && <CommitteeHeader committee={debate.committee} />}
        <div className="flex justify-between gap-2 p-2">
          <div>
            <p className="text-xs text-slate-700 dark:text-slate-400 sm:text-sm">
              {debate.type}
            </p>
            <p>{debate.title}</p>
            {debate.subtitle && (
              <p className="text-xs text-slate-700 dark:text-slate-400 sm:text-sm">
                {debate.subtitle}
              </p>
            )}
          </div>
          {debate.sender && (
            <MemberImage
              imageUrl={debate.sender.imageUrl}
              firstName={debate.sender.firstName}
              lastName={debate.sender.lastName}
              party={debate.sender.party}
              sizes="(min-width: 640px) 96px, 80px"
              className="h-20 w-20 shrink-0 sm:h-24 sm:w-24"
            />
          )}
        </div>
      </Card>
    </Link>
  );
}
