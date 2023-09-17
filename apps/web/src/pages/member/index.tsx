import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';

import PersonIcon from '@mui/icons-material/Person';

import Members from '../../containers/Members';
import PageTitle from '../../components/PageTitle';

import { MemberListEntry } from '../../types/member';
import { membersController } from '../../api/controllers/members';
import MembersTabs from '../../components/MemberStatistics/MemberTabs';

const MembersContainer: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
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
    <PageTitle marginBottom="0" title="Riksdagsledamöter" Icon={PersonIcon} />
    <MembersTabs value={0} />
    <Members members={members} />
  </>
);

export const getStaticProps: GetStaticProps<{
  members: MemberListEntry[];
}> = async () => {
  const members = await membersController();

  return { props: { members }, revalidate: 259200 };
};

export default MembersContainer;
