import type { MemberData } from "@lib/api/parliament/types";

import type { MemberResponse } from "../types";
import parsePictureUrl from "./image";
import parseInformation from "./information";
import parseTask from "./task";

const notAcceptedTasks = [
  "sv",
  "en",
  "HarBild",
  "KandiderarINastaVal",
  "Officiell e-postadress",
  "Föräldrar",
  "Tjänstetelefon",
];

export const parseMember = (data: MemberData): MemberResponse => {
  const {
    intressent_id: id,
    tilltalsnamn: firstName,
    sourceid: sourceId,
    efternamn: lastName,
    fodd_ar: birthYear,
    valkrets: district,
    bild_url_192: pictureUrl,
    personuppgift,
    personuppdrag,
    parti: party,
    status,
  } = data;

  const unparsedInformation = personuppgift?.uppgift ?? [];
  const unparsedTasks = personuppdrag?.uppdrag ?? [];

  const information = unparsedInformation
    .filter((el) => !notAcceptedTasks.includes(el.kod))
    .map(parseInformation);

  const tasks = unparsedTasks.map(parseTask);

  const isLeader = !!tasks.find((el) => el.role === "Partiledare" && !el.to);

  const age = new Date().getFullYear() - parseInt(birthYear, 10);

  return {
    id,
    sourceId,
    firstName,
    lastName,
    pictureUrl: parsePictureUrl(pictureUrl),
    age,
    party,
    district,
    status,
    information,
    tasks,
    isLeader,
  };
};
