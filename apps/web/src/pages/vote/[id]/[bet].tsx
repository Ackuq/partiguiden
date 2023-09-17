import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Container from "@mui/material/Container";
import Head from "next/head";

import PageTitle from "../../../components/PageTitle";
import Vote from "../../../containers/Vote";

import * as ROUTES from "../../../lib/routes";
import { ResponsiveAd } from "../../../components/Ad";
import { useVote } from "../../../hooks/parliamentHooks";
import BreadcrumbsSocialMediaShare from "../../../components/BreadcrumbsSocialMediaShare/BreadcrumbsSocialMediaShare";
import LoadCircle from "../../../components/LoadCircle";

const VoteContainer: NextPage<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ proposition, id }) => {
  const vote = useVote(id, proposition);

  const title = `${id} ${proposition} | Votering | Partiguiden`;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content={`Hur har partiernat röstat i voteringen ${id}`}
        />
      </Head>

      <PageTitle
        title={vote ? `${vote.title} förslagspunkt ${proposition}` : ""}
        variant="h4"
      />
      <Container>
        <BreadcrumbsSocialMediaShare
          breadcrumbsProps={{
            links: [
              { href: ROUTES.VOTES, label: "Voteringar" },
              {
                href: ROUTES.VOTE,
                as: ROUTES.getVoteHref(id, proposition),
                label: "Votering",
              },
            ],
          }}
          socialMediaShareProps={{
            title: `${id} förslagspunkt ${proposition}`,
          }}
        />
        {vote ? <Vote vote={vote} /> : <LoadCircle />}
        <ResponsiveAd />
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  { proposition: number; id: string },
  { id: string; bet: string }
> = async ({ params }) => {
  const id = params?.id;
  const bet = params?.bet;
  if (id === undefined || bet === undefined) {
    return { notFound: true };
  }
  const proposition = parseInt(bet, 10);

  return { props: { proposition, id } };
};

export default VoteContainer;
