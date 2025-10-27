"use client";

import { Fragment, useEffect, useMemo, useRef, useState } from "react";

import { ResponsiveAd } from "@components/ads";
import { useFilterContext } from "@components/filter/filter-context";
import type { MemberListEntry } from "@lib/api/member/types";
import type { MemberParty } from "@lib/api/parliament/types";

import MemberCard from "./member-card";

interface Props {
  members: MemberListEntry[];
}

const MEMBERS_STEP = 18;

export default function MemberList({ members }: Props) {
  const endRef = useRef<HTMLDivElement>(null);
  const [amount, setAmount] = useState(MEMBERS_STEP);
  const { search, activeToggles } = useFilterContext<MemberParty>();

  const filteredMembers = useMemo(() => {
    const inParty = activeToggles.length
      ? members.filter((member) => activeToggles.includes(member.party))
      : members;
    const inSearch = search
      ? members.filter((member) =>
          `${member.firstName} ${member.lastName}`
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase()),
        )
      : inParty;
    return inSearch;
  }, [search, activeToggles, members]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAmount(MEMBERS_STEP);
  }, [search, activeToggles, members]);

  useEffect(() => {
    if (!endRef.current) {
      return;
    }
    const observer = new IntersectionObserver(
      ([endElement]) => {
        if (endElement.isIntersecting) {
          setAmount((prevValue) =>
            prevValue < filteredMembers.length
              ? prevValue + MEMBERS_STEP
              : prevValue,
          );
        }
      },
      {
        rootMargin: "40px 0px 0px 0px",
      },
    );

    observer.observe(endRef.current);

    return () => {
      observer.disconnect();
    };
  }, [filteredMembers]);

  return (
    <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {filteredMembers.slice(0, amount).map((member, index) => (
        <Fragment key={member.id}>
          {index % 12 === 0 && (
            <div className="lg:col-span-2 xl:col-span-3">
              <ResponsiveAd />
            </div>
          )}
          <MemberCard member={member} />
        </Fragment>
      ))}
      <div ref={endRef} />
    </div>
  );
}
