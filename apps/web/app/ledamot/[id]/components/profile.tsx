import MemberImage from "@components/parliament/member-image";
import type { MemberResponse } from "@lib/api/member/types";
import { partyNames } from "@partiguiden/party-data/utils";

interface ProfileProps {
  member: MemberResponse;
}

export default function Profile({ member }: ProfileProps) {
  return (
    <div className="relative flex flex-col justify-center gap-1 text-center">
      <div className="bg-teal-700 dark:bg-teal-900 absolute top-0 h-28 w-full sm:h-36" />
      <MemberImage
        imageUrl={member.pictureUrl}
        firstName={member.firstName}
        lastName={member.lastName}
        party={member.party}
        className="mx-auto mt-8 h-40 w-40 sm:h-56 sm:w-56"
        sizes="(min-width: 640px) 224px, 160px"
      />
      <h1 className="mt-4 text-2xl sm:text-3xl">
        {member.firstName} {member.lastName}
      </h1>
      <h2 className="text-lg font-medium sm:text-xl">
        {member.status}
        {member.isLeader && " och partiledare"}
      </h2>
      <h2 className="text-lg font-medium sm:text-xl">
        {member.party === "-" ? "Partilös" : partyNames[member.party]}
      </h2>
      <div className="text-md sm:text-lg">{member.age} år</div>
    </div>
  );
}
