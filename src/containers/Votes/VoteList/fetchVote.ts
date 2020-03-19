import fetch from 'isomorphic-unfetch';
import stripJsonComments from 'strip-json-comments';

import { getVotes, getMaxVotes } from '../../../utils/votingHelpers';

const fetchVote = ({ url, tempbeteckning }) =>
  fetch(url)
    .then(res => res.text())
    .then(json => {
      const result = JSON.parse(stripJsonComments(json));

      const { dokumentstatus } = result;
      const { utskottsforslag } = dokumentstatus.dokutskottsforslag;
      const voteObject = Array.isArray(utskottsforslag)
        ? utskottsforslag[tempbeteckning - 1]
        : utskottsforslag;

      const { table } = voteObject.votering_sammanfattning_html;
      const tableRow = Array.isArray(table) ? table[table.length - 1].tr : table.tr;

      const votes = getVotes(tableRow);
      return { maxVotes: getMaxVotes(votes), rubrik: voteObject.rubrik };
    })
    // eslint-disable-next-line no-console
    .catch(err => console.error(err));

export default fetchVote;
