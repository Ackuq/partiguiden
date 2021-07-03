import { Decision, Decisions } from '../../types/decision';
import { checkIfVotesExist } from '../helpers/decisionUtils';

export const decisionSerializer = async (data: any): Promise<Decision> => {
  const {
    titel: title,
    organ: authority,
    id,
    rm: session,
    beteckning: denomination,
    notis: paragraph,
    notisrubrik: paragraphTitle,
    dokument_url_text: textUrl,
  } = data;

  const voteSearchTerm = `${session}:${denomination}`;
  const jsonUrl = `https:${textUrl}`.replace('.text', '.json');
  const votesExists = await checkIfVotesExist(jsonUrl);

  return {
    id,
    paragraph,
    paragraphTitle,
    authority,
    denomination,
    title,
    voteSearchTerm,
    votesExists,
  };
};

export const decisionsSerializer = (data: any): Promise<Decisions> => {
  const { dokumentlista } = data;
  const { dokument: document } = dokumentlista;

  const pages = parseInt(dokumentlista['@sidor'], 10);

  if (!document || pages === 0) {
    return Promise.resolve({ decisions: [], pages });
  }

  const unserializedDecisions: Array<Promise<Decision>> = document.map(decisionSerializer);

  return Promise.all(unserializedDecisions).then((decisions) => ({
    decisions,
    pages,
  }));
};
