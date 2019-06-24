import React from 'react';
import Head from 'next/head';
import { string, array } from 'prop-types';
import Container from '@material-ui/core/Container';
import fetch from 'isomorphic-unfetch';
import parse from 'html-react-parser';

import { apiLinks } from '../src/utils';
import PageTitle from '../src/components/PageTitle';
import SocialMediaShare from '../src/components/SocialMediaShare';
import Dokument from '../src/containers/Dokument';

const DokumentContainer = ({ body, id }) => (
  <React.Fragment>
    <Head>
      <title>{id} | Dokument | Partiguiden.nu</title>
    </Head>
    <PageTitle title={`Dokument ${id}`} />
    <Container>
      <SocialMediaShare title={`Dokument ${id}`} />
      <Dokument body={body} />
    </Container>
  </React.Fragment>
);

DokumentContainer.getInitialProps = async ({ query }) => {
  const { id } = query;
  const url = `${apiLinks.riksdagenApi}/dokument/${id}`;

  const res = await fetch(url);
  const text = await res.text();
  let body = await parse(text);
  if (!Array.isArray(body)) {
    body = [body];
  }

  return { body, id };
};

DokumentContainer.propTypes = {
  body: array.isRequired,
  id: string.isRequired
};

export default DokumentContainer;
