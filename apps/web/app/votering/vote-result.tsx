import PartyIcon from "@components/party/icon";
import type { VotingResult } from "@lib/api/vote/types";
import type { Party } from "@partiguiden/party-data/types";

import { twMerge } from "tailwind-merge";

interface ResultColumnProps {
  votes: Party[];
  title: string;
  className: string;
}

function ResultColumn({ votes, title, className }: ResultColumnProps) {
  return (
    <div className={twMerge("flex-1 px-2 py-4 text-center", className)}>
      <p>{title}</p>
      <div className="mt-4 flex flex-wrap justify-center gap-2 px-2">
        {votes.map((party) => (
          <PartyIcon
            party={party}
            key={party}
            className="h-8 w-8 md:h-10 md:w-10"
            sizes="(min-width: 768px) 32px, 40px"
          />
        ))}
      </div>
    </div>
  );
}

interface Props {
  votes: VotingResult;
}

export default function VoteResult({ votes }: Props) {
  if (!votes.no.length || !votes.yes.length) {
    return <p>Ingen voteringsdata hittades</p>;
  }

  return (
    <div className="flex flex-col sm:flex-row">
      <ResultColumn
        className={twMerge(
          "bg-green-200 dark:bg-green-700",
          votes.winner !== "yes" && "bg-slate-200 dark:bg-slate-600",
        )}
        title="JA"
        votes={votes.yes}
      />
      <ResultColumn
        className={twMerge(
          "bg-red-200 dark:bg-red-800",
          votes.winner !== "no" && "bg-slate-200 dark:bg-slate-600",
        )}
        title="NEJ"
        votes={votes.no}
      />
    </div>
  );
}
