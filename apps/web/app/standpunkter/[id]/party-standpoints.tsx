"use client";

import type { Standpoint } from "@partiguiden/party-data/types";
import { Party } from "@partiguiden/party-data/types";
import { getPartyName } from "@partiguiden/party-data/utils";
import { useState } from "react";

interface PartyStandpointsProps {
  party: Party;
  standpoints: Standpoint[];
}

const borderColors = {
  [Party.C]: "border-b-party-c",
  [Party.KD]: "border-b-party-kd",
  [Party.L]: "border-b-party-l",
  [Party.M]: "border-b-party-m",
  [Party.MP]: "border-b-party-mp",
  [Party.S]: "border-b-party-s",
  [Party.SD]: "border-b-party-sd",
  [Party.V]: "border-b-party-v",
};

export default function PartyStandpoints({
  party,
  standpoints,
}: PartyStandpointsProps) {
  const [visible, setVisible] = useState(false);

  function handleClick() {
    setVisible((prevState) => !prevState);
  }

  return (
    <div>
      <button
        onClick={handleClick}
        className={`${borderColors[party]} w-full border-b-2 py-3 pl-2 text-start text-3xl font-light`}
      >
        {getPartyName(party)}
      </button>

      {visible &&
        standpoints.map((standpoint) => (
          <div key={standpoint.url}>{standpoint.title}</div>
        ))}
    </div>
  );
}
