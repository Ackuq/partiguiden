import { ParsedUrlQuery } from 'querystring';

export type QueryAttribute = ParsedUrlQuery[0];

export const queryAttrToString = (attr: QueryAttribute, def = ''): string => {
  if (attr) {
    if (Array.isArray(attr)) {
      return attr[0];
    }
    return attr;
  }
  return def;
};

export const queryAttrToNumber = (attr: QueryAttribute, def = 0): number => {
  const str = queryAttrToString(attr);
  if (str) {
    return parseInt(str, 10);
  }
  return def;
};

export const queryAttrToArray = (attr: QueryAttribute, def = []): Array<string> => {
  if (attr) {
    if (Array.isArray(attr)) {
      return attr;
    }
    return [attr];
  }
  return def;
};
