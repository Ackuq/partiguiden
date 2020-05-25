import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';

import { apiLinks } from '../../src/utils';
import Member from '../../src/containers/Member';

const MemberContainer: NextPage<{ member: any }> = ({ member }) => (
  <>
    <Head>
      <title>{member.name} | Ledamot | Partiguiden</title>
    </Head>
    <Member member={member} />
  </>
);

MemberContainer.getInitialProps = async ({ query }) => {
  const url = `${apiLinks.partiguidenApi}/member/${query.id}`;
  const res = await fetch(url);
  const member = await res.json();

  return { member };
};

export default MemberContainer;
