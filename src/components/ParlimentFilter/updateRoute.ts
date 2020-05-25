import Router from 'next/router';

interface Props {
  baseUrl: string;
  search: string;
  org: Array<string>;
}

export default ({ baseUrl, search, org }: Props) => {
  const searchString = search && `sok=${search}`;
  const orgString = org.length > 0 && `org=${org.join('&org=')}`;
  let href = '';
  if (searchString || orgString) {
    href += '?';
    if (searchString) {
      href += searchString;
      if (orgString) href += '&';
    }
    if (orgString) href += orgString;
  }

  Router.push(`${baseUrl}${href}`);
};
