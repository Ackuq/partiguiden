import MemberImage from "@components/parliament/member-image";
import type { MemberResponse } from "@lib/api/member/types";

interface ProfileProps {
  member: MemberResponse;
}

export default function Profile({ member }: ProfileProps) {
  return (
    <div className="flex flex-col justify-center gap-1 text-center">
      <div className="bg-primary dark:bg-primary-dark absolute h-28 w-full sm:h-36" />
      <MemberImage
        imageUrl={member.pictureUrl}
        firstName={member.firstName}
        lastName={member.lastName}
        className="mx-auto mt-8 h-40 w-40 sm:h-56 sm:w-56"
        sizes="(min-width: 640px) 224px, 160px"
      />
      <div className="mt-4 text-lg font-medium sm:text-xl">
        {member.status}
        {member.isLeader && " och partiledare"}
      </div>
      <h1 className="text-2xl sm:text-3xl">
        {member.firstName} {member.lastName}
      </h1>
      <div className="text-md sm:text-lg">{member.age} år</div>
    </div>
  );
}
