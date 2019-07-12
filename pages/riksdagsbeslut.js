import React from 'react';
import Head from 'next/head';
import GavelIcon from '@material-ui/icons/GavelRounded';
import { object } from 'prop-types';

import PageTitle from '../src/components/PageTitle';
import Decisions from '../src/containers/Decisions';

const RiksdagsbeslutContainer = ({ query }) => (
  <React.Fragment>
    <Head>
      <title>Riksdagsbeslut | Partiguiden.nu</title>
      <meta
        name="description"
        content="Vad tar riksdagen för beslut? Här hittar du en sammanfattning på de senaste besluten som tas upp i riksdagen."
      />
    </Head>
    <PageTitle title="Riksdagsbeslut" Icon={GavelIcon} />
    <Decisions query={query} />
  </React.Fragment>
);

RiksdagsbeslutContainer.getInitialProps = ({ query }) => ({ query });

RiksdagsbeslutContainer.propTypes = {
  query: object.isRequired,
};

export default RiksdagsbeslutContainer;
