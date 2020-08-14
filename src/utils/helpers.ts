import { ParsedUrlQuery } from 'querystring';

export type queryAttr = ParsedUrlQuery[0];

export const queryAttrToString = (attr: queryAttr, def = '') => {
  if (attr) {
    if (Array.isArray(attr)) {
      return attr[0];
    }
    return attr;
  }
  return def;
};

export const queryAttrToNumber = (attr: queryAttr, def = 0) => {
  const str = queryAttrToString(attr);
  if (str) {
    return parseInt(str, 10);
  }
  return def;
};

export const queryAttrToArray = (attr: queryAttr, def = []) => {
  if (attr) {
    if (Array.isArray(attr)) {
      return attr;
    }
    return [attr];
  }
  return def;
};
