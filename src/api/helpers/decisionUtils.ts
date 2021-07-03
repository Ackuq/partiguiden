import stripJsonComments from 'strip-json-comments';

export const checkVote = (list: any): boolean => {
  if (!Array.isArray(list) && list.votering_id !== null) {
    return true;
  }

  for (let i = 0; i < list.length; i += 1) {
    if (list[i].votering_id !== null) {
      return true;
    }
  }
  return false;
};

export const checkIfVotesExist = (url: string): Promise<boolean> =>
  fetch(url)
    .then((res) => res.text())
    .then((json) => {
      const result = JSON.parse(stripJsonComments(json));
      const { dokumentstatus } = result;

      if (dokumentstatus.dokutskottsforslag) {
        const { utskottsforslag: suggestions } = dokumentstatus.dokutskottsforslag;

        if (!Array.isArray(suggestions) && suggestions.votering_id !== null) {
          return true;
        }

        for (let i = 0; i < suggestions.length; i += 1) {
          if (suggestions[i].votering_id !== null) {
            return true;
          }
        }
      }
      return false;
    });
