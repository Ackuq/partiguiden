import fetch from 'isomorphic-unfetch';
import stripJsonComments from 'strip-json-comments';

import { getVotes, getMaxVotes } from '../../../../lib/votingHelpers';

const getVotering = ({ dokId, tempbeteckning }) =>
  fetch(`https://data.riksdagen.se/dokumentstatus/${dokId}.json`)
    .then(res => res.text())
    .then(json => {
      const result = JSON.parse(stripJsonComments(json));

      const { dokumentstatus } = result;
      const { utskottsforslag } = dokumentstatus.dokutskottsforslag;
      const voteringObject = Array.isArray(utskottsforslag)
        ? utskottsforslag[tempbeteckning - 1]
        : utskottsforslag;

      const { table } = voteringObject.votering_sammanfattning_html;
      const tableRow = Array.isArray(table) ? table[table.length - 1].tr : table.tr;
      return { maxVotes: getMaxVotes(getVotes(tableRow)), rubrik: voteringObject.rubrik };
    })
    // eslint-disable-next-line no-console
    .catch(err => console.error(err));

export default getVotering;
