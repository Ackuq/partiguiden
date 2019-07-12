import React from 'react';
import Head from 'next/head';
import { string } from 'prop-types';
import Container from '@material-ui/core/Container';
import fetch from 'isomorphic-unfetch';

import { apiLinks } from '../../src/utils';
import PageTitle from '../../src/components/PageTitle';
import SocialMediaShare from '../../src/components/SocialMediaShare';
import Document from '../../src/containers/Document';

const DocumentContainer = ({ body, id }) => (
  <React.Fragment>
    <Head>
      <title>{id} | Dokument | Partiguiden.nu</title>
    </Head>
    <PageTitle title={`Dokument ${id}`} />
    <Container>
      <SocialMediaShare title={`Dokument ${id}`} />
      <Document body={body} />
    </Container>
  </React.Fragment>
);

DocumentContainer.getInitialProps = async ({ query }) => {
  const { id } = query;
  const url = `${apiLinks.riksdagenApi}/dokument/${id}`;

  const res = await fetch(url);
  const body = await res.text();

  return { body, id };
};

DocumentContainer.propTypes = {
  body: string.isRequired,
  id: string.isRequired,
};

export default DocumentContainer;
