import React from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';

import Container from '@material-ui/core/Container';
import Dokument from '../src/containers/Dokument';

const DokumentContainer = ({ router }) => (
  <React.Fragment>
    <Head>
      <title>Dokument {router.query.id} | Partiguiden.nu</title>
    </Head>
    <Container>
      <Dokument id={router.query.id} />
    </Container>
  </React.Fragment>
);
export default withRouter(DokumentContainer);
