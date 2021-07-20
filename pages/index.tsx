import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import Head from 'next/head';

import { Container, Paper, Typography } from '@material-ui/core';
import styled from '@emotion/styled';

import Typed from '../src/components/Typed';
import FrontPage from '../src/containers/FrontPage';
import { getPopular } from '../src/lib/api';
import { SubjectListEntry } from '../src/types/subjects';
import { ResponsiveAd } from '../src/components/Ad';

const PageTitleContainer = styled(Paper)`
  background-color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.primary.light};
  text-align: center;
  padding: 1.5rem 0.25rem;
  margin-bottom: 1rem;
  color: #fff;
  min-height: 5rem;
`;

const FrontPageContainer: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  popular,
}) => (
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
          strings={['miljön?', 'jämlikheten?', 'vården?', 'Sverige?']}
          typeSpeed={100}
          backSpeed={50}
          showCursor={false}
        />
        &nbsp;
      </Typography>
    </PageTitleContainer>
    <Container>
      <FrontPage popular={popular} />
      <ResponsiveAd />
    </Container>
  </>
);

export const getStaticProps: GetStaticProps<{ popular: Array<SubjectListEntry> }> = async () => {
  const data = await getPopular();
  const popular = data.slice(0, 4).map((el) => el[0]);

  return {
    props: { popular },
    revalidate: 518400,
  };
};

export default FrontPageContainer;
