import Link from "next/link";
import { twMerge } from "tailwind-merge";

import { Card } from "@components/common/card";
import MemberImage from "@components/parliament/member-image";
import type {
  AbsencePeriod,
  MemberAbsenceResponse,
  AbsenceLeaderboard as TAbsenceLeaderboard,
} from "@lib/api/member/types";
import { routes } from "@lib/navigation";

interface Props {
  leaderboard: TAbsenceLeaderboard;
  period: AbsencePeriod;
  description: string;
}

export default function AbsenceLeaderboard({
  period,
  leaderboard,
  description,
}: Props) {
  return (
    <>
      <h2 className="mb-3 text-center text-xl">
        Voteringsnärvaro för {period} {description}
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <AbsenceLeaderboardContent
          title="Ledamöter med minst voteringsnärvaro"
          memberList={leaderboard.mostAbsence}
          period={period}
          description={description}
          variant="red"
        />
        <AbsenceLeaderboardContent
          title="Ledamöter med mest voteringsnärvaro"
          memberList={leaderboard.leastAbsence}
          period={period}
          description={description}
          variant="green"
        />
      </div>
    </>
  );
}

interface AbsenceLeaderboardContentProps {
  title: string;
  memberList: MemberAbsenceResponse[];
  period: AbsencePeriod;
  description: string;
  variant: "red" | "green";
}

function AbsenceLeaderboardContent({
  title,
  memberList,
  period,
  description,
  variant,
}: AbsenceLeaderboardContentProps) {
  return (
    <Card className="p-0">
      <div className="bg-teal-700 dark:bg-teal-900 p-4 text-slate-50">
        <h4 className="text-lg">{title}</h4>
        <p className="text-sm text-slate-300">
          För {period} {description}
        </p>
      </div>
      <ul>
        {memberList.map((member) => (
          <MemberListEntry variant={variant} member={member} key={member.id} />
        ))}
      </ul>
    </Card>
  );
}

interface MemberListEntryProps {
  member: MemberAbsenceResponse;
  variant: "red" | "green";
}

function MemberListEntry({ member, variant }: MemberListEntryProps) {
  return (
    <li className="dark:border-slate-600 not-last:border-b-[1px]">
      <Link
        href={routes.member(member.id)}
        className={twMerge(
          "flex items-center gap-4 px-4 py-2",
          "transition-[background-color_box-shadow] hover:bg-slate-100 dark:hover:bg-slate-700",
          "hover:shadow-xl dark:shadow-slate-900",
        )}
      >
        <MemberImage
          imageUrl={member.pictureUrl}
          firstName={member.firstName}
          lastName={member.lastName}
          party={member.party}
          sizes="80px"
          className="h-20 w-20 sm:h-20 sm:w-20"
        />
        <div className="text-sm">
          <p>
            {member.lastName}, {member.firstName}
          </p>
          <p>Valkrets: {member.district}</p>
          <p>Ålder: {member.age}</p>
        </div>
        <p
          className={twMerge(
            "ml-auto text-lg",
            variant === "green" ? "text-green-700" : "text-red-600",
          )}
        >
          {member.absence?.toFixed(2)}%
        </p>
      </Link>
    </li>
  );
}
