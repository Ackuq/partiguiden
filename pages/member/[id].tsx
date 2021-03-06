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
      <meta
        name="description"
        content={`Här kan du ta reda på information om ledamot ${id}. Se vilka dokument som hen har varit med och skapat och samt voteringsnärvaro.`}
      />
    </Head>
    <Member id={id} />
  </>
);

export const getServerSideProps: GetServerSideProps<{ id: string }, { id: string }> = async ({
  params,
}) => {
  const id = params?.id;
  if (id === undefined || !/^\d+$/.test(id)) {
    // A member id may only contain numbers
    return { notFound: true };
  }

  return { props: { id } };
};

export default MemberContainer;
