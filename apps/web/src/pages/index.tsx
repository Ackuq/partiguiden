import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import Head from "next/head";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material/styles";

import type { SubjectListEntry } from "../types/subjects";
import { getPopular } from "../lib/api";
import FrontPage from "../containers/FrontPage";
import Typed from "../components/Typed";

const PageTitleContainer = styled(Paper)`
  background-color: ${({ theme }) =>
    theme.palette.mode === "dark"
      ? theme.palette.background.paper
      : theme.palette.primary.light};
  text-align: center;
  padding: 1.5rem 0.25rem;
  margin-bottom: 1rem;
  color: #fff;
  min-height: 5rem;
`;

const FrontPageContainer: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ popular }) => (
  <>
    <Head>
      <title>Partiguiden | Rösta rätt</title>
      <meta
        name="description"
        content="Vad tar Sveriges partier för ståndpunkter i sakfrågor? På Partiguiden kan du hitta och jämföra vad partierns åsikter för att hitta det parti du sympatiserar mest med."
      />
    </Head>
    <PageTitleContainer square>
      <Typography variant="h4" paragraph>
        Hur vill Sveriges partier förbättra
      </Typography>
      <Typography variant="h4">
        <Typed
          strings={["miljön?", "jämlikheten?", "vården?", "Sverige?"]}
          typeSpeed={100}
          backSpeed={50}
          showCursor={false}
        />
        &nbsp;
      </Typography>
    </PageTitleContainer>
    <Container>
      <FrontPage popular={popular} />
    </Container>
  </>
);

export const getStaticProps: GetStaticProps<{
  popular: Array<SubjectListEntry>;
}> = async () => {
  const data = await getPopular();
  const popular = data.slice(0, 4).map((el) => el[0]);

  return {
    props: { popular },
    revalidate: 518400,
  };
};

export default FrontPageContainer;
