import { ParsedUrlQuery, stringify } from 'querystring';
import { parliamentURL } from '../constants';
import { memberSerializer, serializeAbsence } from '../serializers/member';
import { Member, MemberList } from '../../types/member';

export const getAbsence = (query: string): Promise<number | null> =>
  fetch(`${parliamentURL}/voteringlista/?${query}`)
    .then((res) => res.json())
    .then(serializeAbsence);

export const getMember = (query: ParsedUrlQuery): Promise<MemberList[number] | null> =>
  fetch(`${parliamentURL}/personlista/?${stringify(query)}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.personlista.person) {
        return memberSerializer(data.personlista.person);
      }
      /* Sometimes the first(s) element in last name is an initial, remove it and try again */
      const lastNameArray = (query.enamn as string)?.split(' ');
      if (lastNameArray.length > 1) {
        return getMember({ ...query, enamn: lastNameArray.slice(1).join(' ') });
      }
      return null;
    });

export const membersController = (party?: string): Promise<MemberList> => {
  const query = {
    parti: party,
    utformat: 'json',
    sort: 'sorteringsnamn',
  };

  return fetch(`${parliamentURL}/personlista/?${stringify(query)}`)
    .then((res) => res.json())
    .then((data) => {
      const members = data.personlista.person;
      return members.map(memberSerializer);
    });
};

export const memberController = async (id: string): Promise<Member | null> => {
  const absenceQuery = {
    iid: id,
    utformat: 'json',
    gruppering: 'namn',
  };
  const memberQuery = {
    iid: id,
    rdlstatus: 'samtliga',
    utformat: 'json',
  };
  const [memberData, absence] = await Promise.all([
    getMember(memberQuery),
    getAbsence(stringify(absenceQuery)),
  ]);

  if (!memberData) {
    return null;
  }

  return { ...memberData, absence };
};

export const memberSearchController = (
  firstName?: string,
  lastName?: string,
  party?: string
): Promise<MemberList[number] | null> => {
  const query = {
    fnamn: firstName as string,
    enamn: lastName as string,
    parti: party as string,
    rdlstatus: 'samtliga',
    utformat: 'json',
  };

  return getMember(query);
};
