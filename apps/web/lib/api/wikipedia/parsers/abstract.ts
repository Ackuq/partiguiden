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

export default function parseAbstract(data: WikipediaAbstractResponse): string {
  const pageData = Object.values(data.query.pages)[0];

  const abstract = pageData.extract;

  return abstract;
}
