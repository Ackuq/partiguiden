export interface WikidataResponse<T> {
  head: {
    vars: keyof T[];
  };
  results: {
    bindings: T[];
  };
}

export interface TwitterResult {
  person: {
    type: 'uri';
    value: string;
  };
  twitterHandle: {
    type: 'literal';
    value: string;
  };
  twitterId: {
    type: 'literal';
    value: string;
  };
}
