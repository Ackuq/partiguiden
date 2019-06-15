import stripJsonComments from 'strip-json-comments';
import { checkVote } from '../../../lib/votingHelpers';

const checkIfVotesExist = ({ url }) =>
  fetch(url)
    .then(res => res.text())
    .then(json => {
      const result = JSON.parse(stripJsonComments(json));
      const { dokumentstatus } = result;

      if (dokumentstatus.dokutskottsforslag) {
        return { voteringarExist: checkVote(dokumentstatus.dokutskottsforslag.utskottsforslag) };
      }
      return { voteringarExist: false };
    });

export default checkIfVotesExist;
