import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import { Member as MemberType } from '../../types/member';
import { memberController, membersController } from '../../api/controllers/members';
import LoadCircle from '../../components/LoadCircle';
import Member from '../../containers/Member';

interface Props {
  member?: MemberType;
}

const MemberContainer: NextPage<Props> = ({ member }) => (
  <>
    <Head>
      <title>{member && `${member.firstName} ${member.lastName} |`} Ledamot | Partiguiden</title>
      <meta
        name="description"
        content={`Här kan du ta reda på information om ledamot${
          member && `${member.firstName} ${member.lastName}`
        }. Se vilka dokument som hen har varit med och skapat och samt voteringsnärvaro.`}
      />
    </Head>
    {member ? <Member member={member} /> : <LoadCircle />}
  </>
);

export const getStaticPaths: GetStaticPaths = async () => {
  const members = await membersController();

  const paths = members.map((member) => ({
    params: { id: member.id.toString() },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps<
  {
    member: MemberType;
  },
  { id: string }
> = async ({ params }) => {
  const id = params?.id;
  if (!id) {
    return { notFound: true };
  }

  let member = null;
  try {
    member = await memberController(id);
  } catch {
    // Handled after
  }

  if (member == null) {
    return { notFound: true };
  }

  return {
    props: {
      member,
    },
    revalidate: 60 * 60 * 24 * 2, // Every 2 days
  };
};

export default MemberContainer;
