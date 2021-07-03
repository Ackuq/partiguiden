import { Information, MemberList, Task } from '../../types/member';

interface UnparsedVotes {
  voteringlista: {
    votering?: {
      namn: string;
      Ja: string;
      Nej: string;
      Frånvarande: string;
      Avstår: string;
    };
  };
}

const notAcceptedTasks = [
  'sv',
  'en',
  'KandiderarINastaVal',
  'Officiell e-postadress',
  'Föräldrar',
  'Tjänstetelefon',
];

const serializeInformation = (unparsed: any): Information => {
  const { kod: code, uppgift: content, typ: type } = unparsed;

  return { code, content, type };
};

const serializeTask = (unparsed: any): Task => {
  const {
    organ_kod: authorityCode,
    roll_kod: role,
    status,
    uppgift: content,
    typ: type,
    from,
    tom: to,
  } = unparsed;

  return { authorityCode, role, content, status, type, from, to };
};

export const serializeAbsence = (data: UnparsedVotes): number | null => {
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

export const memberSerializer = (data: any): MemberList[number] => {
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
    .filter((el: any) => !notAcceptedTasks.includes(el.kod))
    .map(serializeInformation);

  const tasks = unparsedTasks.map(serializeTask);

  const isLeader = !!tasks.find((el: any) => el.role === 'Partiledare' && !el.to);

  const age = new Date().getFullYear() - parseInt(birthYear, 10);

  return {
    id,
    sourceId,
    firstName,
    lastName,
    pictureUrl: pictureUrl?.replace('http://', 'https://'),
    age,
    party,
    district,
    status,
    information,
    tasks,
    isLeader,
  };
};
