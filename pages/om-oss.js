import React from 'react';
import InfoIcon from '@material-ui/icons/Info';
import Head from 'next/head';
import Container from '@material-ui/core/Container';

import PageTitle from '../src/components/PageTitle';
import OmOss from '../src/containers/OmOss';

const OmOssContainer = () => (
  <React.Fragment>
    <Head>
      <title>Om oss | Partiguiden.nu</title>
      <meta
        name="description"
        content="Partiguiden.nu erbjuder en platform där du kan jämföra vad olika partier tycker i sakfrågor för att det ska bli lättare att hitta det parti du sympatiserar med mest."
      />
    </Head>
    <PageTitle title="Om oss" Icon={InfoIcon} />
    <Container>
      <OmOss />
    </Container>
  </React.Fragment>
);

export default OmOssContainer;
