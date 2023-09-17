import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";

import NoteIcon from "@mui/icons-material/Note";

import PageTitle from "../../components/PageTitle";

import type { SubjectList } from "../../types/subjects";
import { getSubjects } from "../../lib/api";
import Subjects from "../../containers/Subjects";

const StandpointsListContainer: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ subjects }) => (
  <>
    <Head>
      <title>Partiernas ståndpunkter | Partiguiden</title>
      <meta
        name="description"
        content="Vad tar Sveriges partier för ståndpunkter i olika ämnen och sakfrågor? Jämför Sveriges partier politik och hitta det parti du sympatiserar mest med nu!"
      />
    </Head>
    <PageTitle title="Partiernas ståndpunkter" Icon={NoteIcon} />
    <Subjects subjects={subjects} />
  </>
);

export const getStaticProps: GetStaticProps<{
  subjects: SubjectList;
}> = async () => {
  const subjects = await getSubjects();

  return { props: { subjects }, revalidate: 518400 };
};

export default StandpointsListContainer;
