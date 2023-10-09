"use client";
import type { MemberListEntry } from "@lib/api/member/types";
import MemberCard from "./member-card";
import { useFilterContext } from "@components/filter/filter-context";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MemberParty } from "@lib/api/parliament/types";
import dynamic from "next/dynamic";

const ResponsiveAd = dynamic(() => import("@components/ads/responsive-ad"), {
  ssr: false,
});

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
    <ul className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {filteredMembers.slice(0, amount).map((member, index) => (
        <>
          {index % 12 === 0 && (
            <ResponsiveAd className="lg:col-span-2 xl:col-span-3" />
          )}
          <li key={member.id}>
            <MemberCard member={member} />
          </li>
        </>
      ))}
      <div ref={endRef} />
    </ul>
  );
}
