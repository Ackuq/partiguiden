import React from 'react';
import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';

import PersonIcon from '@mui/icons-material/Person';

import PageTitle from '../../src/components/PageTitle';
import Members from '../../src/containers/Members';

import { MemberList } from '../../src/types/member';
import { membersController } from '../../src/api/controllers/members';

const LedamoterContainer: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  members,
}) => (
  <>
    <Head>
      <title>Riksdagsledamöter | Partiguiden</title>
      <meta
        name="description"
        content="Här kan du ta reda på information om ledamöterna i riksdagen, samt se vilka ledamöter är aktiva för varje parti"
      />
    </Head>
    <PageTitle title="Riksdagsledamöter" Icon={PersonIcon} />
    <Members members={members} />
  </>
);

export const getStaticProps: GetStaticProps<{
  members: MemberList;
}> = async () => {
  const members = await membersController();

  return { props: { members }, revalidate: 259200 };
};

export default LedamoterContainer;
