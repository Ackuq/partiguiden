import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

import GavelIcon from '@mui/icons-material/GavelRounded';

import PageTitle from '../src/components/PageTitle';
import Decisions from '../src/containers/Decisions';

const RiksdagsbeslutContainer: NextPage = () => (
  <>
    <Head>
      <title>Riksdagsbeslut | Partiguiden</title>
      <meta
        name="description"
        content="Vad tar riksdagen för beslut? Här hittar du en sammanfattning på de senaste besluten som tas upp i riksdagen."
      />
    </Head>
    <PageTitle title="Riksdagsbeslut" Icon={GavelIcon} />
    <Decisions />
  </>
);

export default RiksdagsbeslutContainer;
