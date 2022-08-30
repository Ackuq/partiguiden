import { Information, MemberListEntry, MemberResponse, Task } from '../../types/member';
import {
  Person,
  PersonInformation,
  PersonTask,
  VoteListGroupedSingle,
} from '../../types/parliament';

const notAcceptedTasks = [
  'sv',
  'en',
  'KandiderarINastaVal',
  'Officiell e-postadress',
  'Föräldrar',
  'Tjänstetelefon',
];

const serializeInformation = (unparsed: PersonInformation): Information => {
  const { kod: code, uppgift: content, typ: type } = unparsed;
  const parsedContent =
    Array.isArray(content) && content.length > 0 && typeof content[0] === 'string'
      ? (content as string[])
      : [];
  return { code, content: parsedContent, type };
};

const serializeTask = (unparsed: PersonTask): Task => {
  const {
    organ_kod: authorityCode,
    roll_kod: role,
    status,
    uppgift: content,
    typ: type,
    from,
    tom: to,
  } = unparsed;

  const parsedContent =
    Array.isArray(content) && content.length > 0 && typeof content[0] === 'string'
      ? (content as string[])
      : [];

  return { authorityCode, role, content: parsedContent, status, type, from, to };
};

export const serializeAbsence = (data: VoteListGroupedSingle): number | null => {
  if (data.voteringlista.votering) {
    const votes = data.voteringlista.votering;
    const total =
      (parseInt(votes.Ja, 10) || 0) +
      (parseInt(votes.Nej, 10) || 0) +
      (parseInt(votes.Frånvarande, 10) || 0) +
      (parseInt(votes.Avstår, 10) || 0);
    return Math.round((1 - (parseInt(votes.Frånvarande, 10) || 0) / total) * 1000) / 10;
  }
  return null;
};

export const memberSerializer = (data: Person): MemberResponse => {
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
    .map(serializeInformation);

  const tasks = unparsedTasks.map(serializeTask);

  const isLeader = !!tasks.find((el) => el.role === 'Partiledare' && !el.to);

  const age = new Date().getFullYear() - parseInt(birthYear, 10);

  return {
    id,
    sourceId,
    firstName,
    lastName,
    pictureUrl: pictureUrl?.replace('http://', 'https://'),
    pictureUrlLowRes: pictureUrlLowRes?.replace('http://', 'https://'),
    age,
    party,
    district,
    status,
    information,
    tasks,
    isLeader,
  };
};

export const memberListEntrySerializer = (data: Person): MemberListEntry => {
  const {
    intressent_id: id,
    tilltalsnamn: firstName,
    efternamn: lastName,
    fodd_ar: birthYear,
    valkrets: district,
    bild_url_192: pictureUrl,
    parti: party,
    status,
  } = data;

  const age = new Date().getFullYear() - parseInt(birthYear, 10);

  return {
    id,
    firstName,
    lastName,
    pictureUrl: pictureUrl?.replace('http://', 'https://'),
    age,
    party,
    district,
    status,
  };
};
