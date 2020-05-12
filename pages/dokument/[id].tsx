import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import Container from '@material-ui/core/Container';

import fetch from 'isomorphic-unfetch';

import { apiLinks } from '../../src/utils';
import PageTitle from '../../src/components/PageTitle';
import SocialMediaShare from '../../src/components/SocialMediaShare';
import Document from '../../src/containers/Document';

interface Props {
  body: string;
  id: string | string[];
}

const DocumentContainer: NextPage<Props> = ({ body, id }) => (
  <>
    <Head>
      <title>{id} | Dokument | Partiguiden.nu</title>
    </Head>
    <PageTitle title={`Dokument ${id}`} />
    <Container>
      <SocialMediaShare title={`Dokument ${id}`} />
      <Document body={body} />
    </Container>
  </>
);

DocumentContainer.getInitialProps = async ({ query }) => {
  const id = query.id || '';
  const url = `${apiLinks.riksdagenApi}/dokument/${id}`;

  const res = await fetch(url);
  const body = await res.text();

  return { body, id };
};

export default DocumentContainer;
