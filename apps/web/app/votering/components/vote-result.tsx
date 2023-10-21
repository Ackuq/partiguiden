import { twMerge } from "tailwind-merge";

import PartyIcon from "@components/party/icon";
import type { VotingResult } from "@lib/api/vote/types";
import type { Party } from "@partiguiden/party-data/types";

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
          "bg-voting-yes-light dark:bg-voting-yes-dark",
          votes.winner !== "yes" &&
            "bg-voting-losing dark:bg-voting-losing-dark",
        )}
        title="JA"
        votes={votes.yes}
      />
      <ResultColumn
        className={twMerge(
          "bg-voting-no-light dark:bg-voting-no-dark",
          votes.winner !== "no" &&
            "bg-voting-losing dark:bg-voting-losing-dark",
        )}
        title="NEJ"
        votes={votes.no}
      />
    </div>
  );
}
