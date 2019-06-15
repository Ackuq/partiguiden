import React from 'react';
import Head from 'next/head';
import GavelIcon from '@material-ui/icons/GavelRounded';
import Container from '@material-ui/core/Container';

import PageTitle from '../src/components/PageTitle';
import Riksdagsbeslut from '../src/containers/Riksdagsbeslut';

const RiksdagsbeslutContainer = () => (
  <React.Fragment>
    <Head>
      <title>Riksdagsbeslut | Partiguiden.nu</title>
      <meta
        name="description"
        content="Vad tar riksdagen för beslut? Här hittar du en sammanfattning på de senaste besluten som tas upp i riksdagen."
      />
    </Head>
    <PageTitle title="Riksdagsbeslut" Icon={GavelIcon} />
    <Container>
      <Riksdagsbeslut />
    </Container>
  </React.Fragment>
);

export default RiksdagsbeslutContainer;
