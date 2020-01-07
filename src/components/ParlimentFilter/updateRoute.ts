import Router from 'next/router';

export default ({ baseUrl, search, org }) => {
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
