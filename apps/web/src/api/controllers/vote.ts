import type { Vote, VoteResultsResponse } from "../../types/voting";
import { parliamentURL } from "../constants";
import { voteResultSerializer, voteSerializer } from "../serializers/vote";
import stripJsonComments from "strip-json-comments";

export const getVote = (id: string, proposition: number): Promise<Vote> =>
  fetch(`${parliamentURL}/dokumentstatus/${id}.json`)
    .then((res) => res.text())
    .then((data) => {
      const jsonData = JSON.parse(stripJsonComments(data));

      return voteSerializer(jsonData, proposition);
    });

export const getVoteResult = (
  id: string,
  num: number,
): Promise<VoteResultsResponse> =>
  fetch(`${parliamentURL}/dokumentstatus/${id}.json`)
    .then((res) => res.text())
    .then((res) => {
      const data = JSON.parse(stripJsonComments(res));

      return voteResultSerializer(data, num);
    });

export const voteController = (
  id: string,
  proposition: string,
): Promise<Vote> => {
  return getVote(id, parseInt(proposition, 10));
};
