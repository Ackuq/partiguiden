import { PartyData, ParliamentPartyData } from '../../types/party';
import { PartyAbbreviation, partyNameMap } from '../../utils/parties';
import { parliamentInfoSerializer } from '../serializers/parties';
import { getWikipediaAbstract, getWikipediaInfoBox } from './wikipedia';

// TODO: Adapt to new website format
const getParliamentInformation = (
  party: Lowercase<PartyAbbreviation>
): Promise<ParliamentPartyData> => {
  const urlParam = partyNameMap[party]
    .toLocaleLowerCase()
    .replace('ä', 'a')
    .replace('å', 'a')
    .replace('ö', 'o');
  console.log(urlParam);
  return fetch(`https://www.riksdagen.se/sv/ledamoter-partier/${urlParam}`)
    .then((res) => res.text())
    .then((html) => parliamentInfoSerializer(html, party));
};

export const getParty = (
  party: Lowercase<PartyAbbreviation>
): Promise<Omit<PartyData, 'abbrev'>> => {
  return Promise.all([
    getWikipediaAbstract(party),
    getWikipediaInfoBox(party),
    getParliamentInformation(party),
  ]).then(([abstract, infoBox, parliamentInfo]) => {
    return {
      abstract,
      ...infoBox,
      ...parliamentInfo,
      name: partyNameMap[party],
    };
  });
};

export const partyController = (
  party: Lowercase<PartyAbbreviation>
): Promise<Omit<PartyData, 'abbrev'>> => {
  return getParty(party);
};
