import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';

import Container from '@material-ui/core/Container';

import PageTitle from '../../src/components/PageTitle';
import SocialMediaShare from '../../src/components/SocialMediaShare';
import Document from '../../src/containers/Document';
import { getDocument } from '../../src/lib/parlimentApi';

interface Props {
  body: string;
  id: string | string[];
}

const DocumentContainer: NextPage<Props> = ({ body, id }) => (
  <>
    <Head>
      <title>{id} | Dokument | Partiguiden</title>
    </Head>
    <PageTitle title={`Dokument ${id}`} />
    <Container>
      <SocialMediaShare title={`Dokument ${id}`} />
      <Document body={body} />
    </Container>
  </>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = Array.isArray(query.id) ? query.id[0] : query.id || '';

  const body = await getDocument(id);

  return { props: { body, id } };
};

export default DocumentContainer;
