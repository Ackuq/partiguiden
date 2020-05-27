import React from 'react';
import { NextPage } from 'next';
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

MemberContainer.getInitialProps = async ({ query }) => {
  const id = Array.isArray(query.id) ? query.id[0] : query.id || '';
  const member = await getMember(id);

  return { member };
};

export default MemberContainer;
