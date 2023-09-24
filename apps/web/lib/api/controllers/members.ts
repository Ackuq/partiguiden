import type {
  Absence,
  MemberAbsenceResponse,
  MemberDetailedResponse,
  MemberListEntry,
  MemberResponse,
} from "../types/member";
import type { ParsedUrlQuery } from "querystring";
import { stringify } from "querystring";
import type {
  Person,
  PersonListMany,
  PersonListSingle,
} from "../types/parliament";
import { getLatestMandatePeriod } from "../utils/parliament";
import {
  memberListEntrySerializer,
  memberSerializer,
  serializeAbsence,
} from "../serializers/member";
import { PARLIAMENT_BASE_URL } from "@lib/constants";

export const getAbsence = (query: string): Promise<number | null> =>
  fetch(`${PARLIAMENT_BASE_URL}/voteringlista/?${query}`, {
    next: { revalidate: 60 * 60 * 24 },
  })
    .then((res) => res.json())
    .then(serializeAbsence);

export const getMember = (id: string): Promise<MemberResponse> =>
  fetch(`${PARLIAMENT_BASE_URL}/person/${id}/json`, {
    next: { revalidate: 60 * 60 * 24 },
  })
    .then((res) => res.json())
    .then((data: PersonListSingle) => {
      return memberSerializer(data.personlista.person as Person);
    });

export const getMemberQuery = (
  query: ParsedUrlQuery,
): Promise<MemberResponse | null> =>
  fetch(`${PARLIAMENT_BASE_URL}/personlista/?${stringify(query)}`, {
    next: { revalidate: 60 * 60 * 24 },
  })
    .then((res) => res.json())
    .then((data: PersonListSingle) => {
      if (data.personlista.person) {
        return memberSerializer(data.personlista.person as Person);
      }
      /* Sometimes the first(s) element in last name is an initial, remove it and try again */
      const lastNameArray = (query.enamn as string)?.split(" ");
      if (lastNameArray.length > 1) {
        return getMemberQuery({
          ...query,
          enamn: lastNameArray.slice(1).join(" "),
        });
      }
      return null;
    });

export const membersController = (
  party?: string,
): Promise<MemberListEntry[]> => {
  const query = {
    parti: party,
    utformat: "json",
    sort: "sorteringsnamn",
  };

  return fetch(`${PARLIAMENT_BASE_URL}/personlista/?${stringify(query)}`, {
    next: { revalidate: 60 * 60 * 24 },
  })
    .then((res) => res.json())
    .then((data: PersonListMany) => {
      const members = data.personlista.person as Person[];
      return members.map(memberListEntrySerializer);
    });
};

export const membersWithAbsenceController = (
  parliamentYears: string[] = [],
  party?: string,
): Promise<MemberAbsenceResponse[]> => {
  return membersController(party).then((memberList) => {
    const absenceQueries = memberList.map((member) => {
      const absenceQuery = {
        iid: member.id,
        utformat: "json",
        gruppering: "namn",
        rm: parliamentYears.join(","),
      };
      return getAbsence(stringify(absenceQuery));
    });
    return Promise.all(absenceQueries).then((absence) =>
      memberList.map((member, i) => ({
        ...member,
        absence: absence[i],
      })),
    );
  });
};

export const memberController = async (
  id: string,
): Promise<MemberDetailedResponse | null> => {
  const absenceQuery = {
    iid: id,
    utformat: "json",
    gruppering: "namn",
  };
  // Get latest parliament year and mandate period
  const mandatePeriod = await getLatestMandatePeriod();

  const [memberData, absenceParliamentYear, absenceMandatePeriod] =
    await Promise.all([
      getMember(id),
      getAbsence(
        stringify({
          ...absenceQuery,
          rm: [mandatePeriod.latestParliamentYear],
        }),
      ).then(
        (absence) =>
          ({
            value: absence,
            description: mandatePeriod.latestParliamentYear,
          }) as Absence,
      ),
      getAbsence(
        stringify({ ...absenceQuery, rm: mandatePeriod.parliamentYears }),
      ).then(
        (absence) =>
          ({
            value: absence,
            description: mandatePeriod.period,
          }) as Absence,
      ),
    ]);

  if (!memberData) {
    return null;
  }

  return {
    ...memberData,
    absence: {
      mandatePeriod: absenceMandatePeriod,
      parliamentYear: absenceParliamentYear,
    },
  };
};
