import { JSDOM } from 'jsdom';
import { WikipediaInfoBox } from '../../types/party';

interface WikipediaAbstractResponse {
  query: {
    pages: Record<
      number,
      {
        pageid: number;
        ns: number;
        title: string;
        extract: string;
      }
    >;
  };
}

export const getAbstract = (data: WikipediaAbstractResponse): string => {
  const pageData = Object.values(data.query.pages)[0];

  const abstract = pageData.extract;

  return abstract;
};

interface WikipediaInfoBoxResponse {
  parse: {
    text: {
      '*': string;
    };
  };
}

export const getInfoBoxAttr = (data: WikipediaInfoBoxResponse): WikipediaInfoBox => {
  const dom = new JSDOM(data.parse.text['*']);

  const rowHeaders = dom.window.document.body.getElementsByTagName('th');

  const ideology: string[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const header of rowHeaders) {
    /* Remove spaces since HTML spaces are treated differently */
    const text = header.textContent?.replace(/[[\s]/g, '');
    if (text === 'Politiskideologi') {
      const ideologyParent = header.nextSibling;
      if (ideologyParent) {
        // eslint-disable-next-line no-restricted-syntax
        for (const ideologyNode of ideologyParent?.childNodes) {
          if (ideologyNode.nodeName === 'A' && ideologyNode.textContent !== null) {
            ideology.push(ideologyNode.textContent);
          }
        }
      }
    }
  }

  return { ideology };
};
