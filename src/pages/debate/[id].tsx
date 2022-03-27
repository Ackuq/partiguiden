import * as ROUTES from '../../lib/routes';
import { GetServerSideProps, NextPage } from 'next';
import Container from '@mui/material/Container';
import Debate from '../../containers/Debate';
import Head from 'next/head';
import PageTitle from '../../components/PageTitle';
import dynamic from 'next/dynamic';

const BreadcrumbsSocialMediaShare = dynamic(
  () => import('../../components/BreadcrumbsSocialMediaShare/BreadcrumbsSocialMediaShare')
);
interface Props {
  id: string;
}

const DebateContainer: NextPage<Props> = ({ id }) => (
  <>
    <Head>
      <title>{id} | Debatt | Partiguiden</title>
      <meta name="description" content={`Här kan du ta reda på information om debatt ${id}.`} />
    </Head>
    <PageTitle title={`Debatt angående ${id}`} variant="h4" />
    <Container>
      <BreadcrumbsSocialMediaShare
        breadcrumbsProps={{
          links: [
            { href: ROUTES.DEBATES, label: 'Debatter' },
            { href: ROUTES.DEBATE, as: ROUTES.getDebateHref(id), label: id },
          ],
        }}
        socialMediaShareProps={{ title: id }}
      />
      <Debate id={id} />
    </Container>
  </>
);

export const getServerSideProps: GetServerSideProps<Props, { id: string }> = async ({ params }) => {
  const id = params?.id;
  if (id === undefined) {
    return { notFound: true };
  }

  return { props: { id } };
};

export default DebateContainer;
