import type { MemberResponse } from "../types";
import parsePictureUrl from "./image";
import parseInformation from "./information";
import parseTask from "./task";
import type { Person } from "@lib/api/parliament/types";

const notAcceptedTasks = [
  "sv",
  "en",
  "KandiderarINastaVal",
  "Officiell e-postadress",
  "Föräldrar",
  "Tjänstetelefon",
];

export const parseMember = (data: Person): MemberResponse => {
  const {
    intressent_id: id,
    tilltalsnamn: firstName,
    sourceid: sourceId,
    efternamn: lastName,
    fodd_ar: birthYear,
    valkrets: district,
    bild_url_80: pictureUrlLowRes,
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
    pictureUrlLowRes: parsePictureUrl(pictureUrlLowRes),
    age,
    party,
    district,
    status,
    information,
    tasks,
    isLeader,
  };
};
