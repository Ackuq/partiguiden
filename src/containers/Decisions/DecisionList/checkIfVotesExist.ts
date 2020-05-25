import fetch from 'isomorphic-unfetch';
import stripJsonComments from 'strip-json-comments';
import { checkVote } from '../../../utils/votingHelpers';

interface Props {
  url: string;
}

const checkIfVotesExist = ({ url }: Props) =>
  fetch(url)
    .then((res) => res.text())
    .then((json) => {
      const result = JSON.parse(stripJsonComments(json));
      const { dokumentstatus } = result;

      if (dokumentstatus.dokutskottsforslag) {
        return { votesExist: checkVote(dokumentstatus.dokutskottsforslag.utskottsforslag) };
      }
      return { votesExist: false };
    });

export default checkIfVotesExist;
