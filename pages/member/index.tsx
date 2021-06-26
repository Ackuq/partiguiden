import React from 'react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import { Person as PersonIcon } from '@material-ui/icons';

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
      <meta
        name="description"
        content="Här kan du ta reda på information om ledamöterna i riksdagen, samt se vilka ledamöter är aktiva för varje parti"
      />
    </Head>
    <PageTitle title="Riksdagsledamöter" Icon={PersonIcon} />
    <Members members={members} />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const members = await getMembers();

  return { props: { members }, revalidate: 259200 };
};

export default LedamoterContainer;
