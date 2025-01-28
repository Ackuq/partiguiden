"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

import { Card } from "@components/common/card";
import { dateString } from "@lib/dates";
import {
  partyBackgroundHover,
  partyBorderBottom,
  partyMarker,
  partyTextColor,
} from "@lib/styles/party";
import type { Standpoint } from "@partiguiden/party-data/types";
import type { Party } from "@partiguiden/party-data/types";
import { partyNames } from "@partiguiden/party-data/utils";

interface PartyStandpointsProps {
  party: Party;
  standpoints: Standpoint[];
}

export default function PartyStandpoints({
  party,
  standpoints,
}: PartyStandpointsProps) {
  const [visible, setVisible] = useState(false);

  function handleClick() {
    setVisible((prevState) => !prevState);
  }

  return (
    <>
      <button
        onClick={handleClick}
        aria-expanded={visible}
        className={twMerge(
          partyBorderBottom[party],
          "font-light group flex w-full items-center justify-between border-b-2 py-3 pl-2 text-start text-3xl",
        )}
      >
        {partyNames[party]}
        <ChevronDownIcon className="mr-2 h-6 w-6 transition-transform duration-300 group-aria-expanded:rotate-180" />
      </button>

      {visible && (
        <div className="flex flex-col gap-3">
          {standpoints.map((standpoint) => (
            <Card key={standpoint.url} className="flex flex-col gap-5">
              <p className="text-2xl">{standpoint.title}</p>
              {standpoint.opinions.length > 0 ? (
                <ul
                  className={`${partyMarker[party]} ml-4 flex list-disc flex-col gap-3`}
                >
                  {standpoint.opinions.map((opinion) => (
                    <li key={opinion}>{opinion}</li>
                  ))}
                </ul>
              ) : (
                <p>Inga ståndpunkter hittades</p>
              )}
              <div className="flex flex-wrap">
                <a
                  className={twMerge(
                    "whitespace-nowrap rounded-sm p-2 text-sm font-medium uppercase transition-colors",
                    partyTextColor[party],
                    partyBackgroundHover[party],
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  href={standpoint.url}
                >
                  Läs mer på partiets hemsida
                </a>
                <span className="ml-auto self-end whitespace-nowrap text-xs sm:text-sm">
                  Datan hämtades {dateString(standpoint.fetchDate)}
                </span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
