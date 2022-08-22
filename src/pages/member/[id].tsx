import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';

import { MemberDetailedResponse } from '../../types/member';
import { memberController, membersController } from '../../api/controllers/members';
import Member from '../../containers/Member';
import dynamic from 'next/dynamic';

const LoadCircle = dynamic(() => import('../../components/LoadCircle'));

const MemberContainer: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ member }) => (
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
    member: MemberDetailedResponse;
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
  } catch (err) {
    console.log(`Failed to render member ${id}, got error`);
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
