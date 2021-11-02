import { JSDOM } from 'jsdom';
import { Leader } from '../../types/member';
import { ParliamentPartyData } from '../../types/party';
import { PartyAbbreviation } from '../../utils/parties';
// import { getMember } from '../controllers/members';

// eslint-disable-next-line import/prefer-default-export
export const parliamentInfoSerializer = (
  html: string,
  _party: Lowercase<PartyAbbreviation>
): Promise<ParliamentPartyData> => {
  const dom = new JSDOM(html);

  // const leadersContainer = dom.window.document.body.getElementsByClassName('fellows-list').item(0);

  const leaderPromises: Promise<Leader>[] = [];

  // TODO: Adapt to new website format
  /*   if (leadersContainer) {
    const elements = leadersContainer.getElementsByClassName('fellow-item');
    // eslint-disable-next-line no-restricted-syntax
    for (const leaderItem of elements) {
      const role = leaderItem.getElementsByClassName('fellow-position').item(0)?.textContent;
      const nameArray = leaderItem
        .getElementsByClassName('fellow-name')
        .item(0)
        ?.textContent?.trim()
        .split(' ');

      const [firstName, ...lastName] = nameArray || ['Not found', 'Not found'];

      const query = {
        fnamn: firstName,
        enamn: lastName.join(' '),
        parti: party,
        rdlstatus: 'samtliga',
        utformat: 'json',
      };

      const promise = new Promise<Leader>((resolve, reject) => {
        getMember(query).then((member) => {
          if (member === null) {
            reject(Error("Couldn't find member"));
          }
          resolve({ role, ...member } as unknown as Leader);
        });
      });

      leaderPromises.push(promise);
    }
  } */

  const website = dom.window.document.body
    .getElementsByClassName('party-website')
    .item(0)
    ?.getElementsByTagName('a')
    .item(0)
    ?.getAttribute('href');

  return Promise.all(leaderPromises).then((leaders) => ({
    website: website === null ? undefined : website,
    leaders,
  }));
};
