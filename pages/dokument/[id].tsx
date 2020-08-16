import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';

import Container from '@material-ui/core/Container';

import PageTitle from '../../src/components/PageTitle';
import SocialMediaShare from '../../src/components/SocialMediaShare';
import Document from '../../src/containers/Document';

interface Props {
  document: { html: string };
  id: string | string[];
}

const DocumentContainer: NextPage<Props> = ({ document, id }) => (
  <>
    <Head>
      <title>{id} | Dokument | Partiguiden</title>
    </Head>
    <PageTitle title={`Dokument ${id}`} />
    <Container>
      <SocialMediaShare title={`Dokument ${id}`} />
      <Document body={document.html} />
    </Container>
  </>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = Array.isArray(query.id) ? query.id[0] : query.id || '';

  const res = await fetch(`${process.env.PROXY_URL}/swe/document/${id}/json`);
  const document = await res.json();

  return { props: { document, id } };
};

export default DocumentContainer;
