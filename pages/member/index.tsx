import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import PersonIcon from '@material-ui/icons/Person';

import PageTitle from '../../src/components/PageTitle';
import Members from '../../src/containers/Members';

import { getMembers } from '../../src/lib/proxy';
import { Member } from '../../src/types/member';

interface Props {
  members: Array<Member>;
}

const LedamoterContainer: NextPage<Props> = ({ members }) => (
  <>
    <Head>
      <title>Riksdagsledamöter | Partiguiden</title>
      <meta name="description" content="" />
    </Head>
    <PageTitle title="Riksdagsledamöter" Icon={PersonIcon} variant="h2" />
    <Members members={members} />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const members = await getMembers();

  return { props: { members }, revalidate: 259200 };
};

export default LedamoterContainer;
