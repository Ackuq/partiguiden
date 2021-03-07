import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';

import Member from '../../src/containers/Member';

interface Props {
  id: string;
}

const MemberContainer: NextPage<Props> = ({ id }) => (
  <>
    <Head>
      <title>{id} | Ledamot | Partiguiden</title>
    </Head>
    <Member id={id} />
  </>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = Array.isArray(query.id) ? query.id[0] : query.id || '';

  return { props: { id } };
};

export default MemberContainer;
