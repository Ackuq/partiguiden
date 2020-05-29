import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';

import Member from '../../src/containers/Member';
import { getMember } from '../../src/lib/api';

const MemberContainer: NextPage<{ member: any }> = ({ member }) => (
  <>
    <Head>
      <title>{member.name} | Ledamot | Partiguiden</title>
    </Head>
    <Member member={member} />
  </>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = Array.isArray(query.id) ? query.id[0] : query.id || '';
  const member = await getMember(id);

  return { props: { member } };
};

export default MemberContainer;
