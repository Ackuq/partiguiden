import { NextPage } from 'next';
import Head from 'next/head';

import VoteIcon from '@mui/icons-material/HowToVoteRounded';

import PageTitle from '../../components/PageTitle';
import Votes from '../../containers/Votes';

const VotesContainer: NextPage = () => (
  <>
    <Head>
      <title>Voteringar | Partiguiden</title>
      <meta
        name="description"
        content="Hur har partierna röstat i voteringar? Ta reda på det här."
      />
    </Head>
    <PageTitle title="Voteringar" Icon={VoteIcon} />
    <Votes />
  </>
);

export default VotesContainer;
