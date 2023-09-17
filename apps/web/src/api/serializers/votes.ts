import { DocumentList, DocumentListEntry } from '../../types/parliament';
import { VoteList, VoteListEntry } from '../../types/voting';
import { getVoteResult } from '../controllers/vote';
import { titleTrim } from '../helpers/voteUtils';

export const voteSerializer = async (data: DocumentListEntry): Promise<VoteListEntry> => {
  const { beteckning: denomination, id, organ: authority } = data;
  const title: string = titleTrim(data.sokdata.titel);
  const proposition = parseInt(data.tempbeteckning, 10);

  const documentId = `${id.substring(0, 2)}01${denomination.split('p')[0]}`;

  const { results, subtitle } = await getVoteResult(documentId, proposition);

  return { title, results, authority, documentId, proposition, subtitle };
};

export const votesSerializer = (data: DocumentList): Promise<VoteList> => {
  const { dokumentlista: document } = data;

  const pages = parseInt(document['@sidor'], 10);

  const unserializedVotes = document.dokument;

  if (!unserializedVotes || pages === 0) {
    return Promise.resolve({
      pages,
      votes: [],
    });
  }

  const votesPromises: Array<Promise<VoteListEntry>> = unserializedVotes.map(voteSerializer);

  return Promise.all(votesPromises).then((votes) => ({
    pages,
    votes,
  }));
};
