import React from 'react';
import { NextPage, GetServerSideProps } from 'next';
import Head from 'next/head';

import Member from '../../src/containers/Member';
import { Member as MemberType } from '../../src/types/member';

interface Props {
  member: MemberType;
}

const MemberContainer: NextPage<Props> = ({ member }) => (
  <>
    <Head>
      <title>
        {member.firstName} {member.lastName} | Ledamot | Partiguiden
      </title>
    </Head>
    <Member member={member} />
  </>
);

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const id = Array.isArray(query.id) ? query.id[0] : query.id || '';
  const res = await fetch(`${process.env.PROXY_URL}/swe/member/${id}`);
  const member = await res.json();

  return { props: { member } };
};

export default MemberContainer;
