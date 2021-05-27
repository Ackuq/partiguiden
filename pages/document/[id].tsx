import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';

import { Container } from '@material-ui/core';

import PageTitle from '../../src/components/PageTitle';
import SocialMediaShare from '../../src/components/SocialMediaShare';
import Document from '../../src/containers/Document';
import { useDocument } from '../../src/hooks/parliamentHooks';
import LoadCircle from '../../src/components/LoadCircle';

interface Props {
  id: string;
}

const DocumentContainer: NextPage<Props> = ({ id }) => {
  const document = useDocument(id);

  return (
    <>
      <Head>
        <title>{id} | Dokument | Partiguiden</title>
      </Head>
      <PageTitle title={`Dokument ${id}`} />
      <Container>
        <SocialMediaShare title={`Dokument ${id}`} />
        {document ? <Document body={document.html} /> : <LoadCircle />}
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = Array.isArray(query.id) ? query.id[0] : query.id || '';

  return { props: { id } };
};

export default DocumentContainer;
