import Link from "next/link";
import { twMerge } from "tailwind-merge";

import MemberImage from "@components/parliament/member-image";
import type { DebateStatement, Speaker } from "@lib/api/debates/types";
import { routes } from "@lib/navigation";

interface Props {
  statement: DebateStatement;
  speaker: Speaker;
  isSender: boolean;
}

export default function Statement({ statement, speaker, isSender }: Props) {
  return (
    <li
      className={twMerge("flex gap-[1.125rem]", isSender && "flex-row-reverse")}
    >
      <div
        className={twMerge(
          "flex flex-col",
          "ml-auto",
          isSender && "ml-0 mr-auto",
        )}
      >
        <div
          className={twMerge(
            "relative rounded-sm bg-slate-100 p-2 text-sm shadow-xs dark:bg-slate-900 flex-1",
            "[&>p]:my-2",
            "after:absolute  after:top-6 after:h-0 after:w-0 after:border-[1.125rem] after:border-transparent after:content-['']",
            "after:right-[-2.25rem] after:border-l-slate-100 dark:after:border-l-slate-900",
            isSender &&
              "after:left-[-1.125rem] after:right-auto after:border-l-0 after:border-l-transparent after:border-r-slate-100 dark:after:border-r-slate-900",
          )}
          dangerouslySetInnerHTML={{ __html: statement.text }}
        />
        <p
          className={twMerge(
            "ml-auto mt-2 text-right text-xs",
            isSender && "text-left",
          )}
        >
          {statement.date}
        </p>
      </div>
      <Link href={routes.member(speaker.id)} className="mt-3 h-full">
        <MemberImage
          imageUrl={speaker.imageUrl}
          firstName={speaker.firstName}
          lastName={speaker.lastName}
          party={speaker.party}
          logoDirection={isSender ? "left" : "right"}
          sizes="(min-width: 640px) 80px, 64px"
          className="mb-1 ml-auto h-16 w-16 sm:h-20 sm:w-20"
        />
        <p className="text-center text-sm">
          {speaker.firstName} {speaker.lastName}
        </p>
      </Link>
    </li>
  );
}
