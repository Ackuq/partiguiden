import type { VoteDocumentStatus } from "../../types/parliament";
import stripJsonComments from "strip-json-comments";

export const checkIfVotesExist = (url: string): Promise<boolean> =>
  fetch(url)
    .then((res) => res.text())
    .then((json) => {
      const result: VoteDocumentStatus = JSON.parse(stripJsonComments(json));
      const { dokumentstatus } = result;

      if (dokumentstatus.dokutskottsforslag) {
        const { utskottsforslag: suggestions } =
          dokumentstatus.dokutskottsforslag;

        if (!Array.isArray(suggestions) && suggestions.votering_id !== null) {
          return true;
        } else if (Array.isArray(suggestions)) {
          for (let i = 0; i < suggestions.length; i += 1) {
            if (suggestions[i].votering_id !== null) {
              return true;
            }
          }
        }
      }
      return false;
    });
