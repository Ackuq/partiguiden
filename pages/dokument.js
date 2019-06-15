import React from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';

import Dokument from '../src/containers/Dokument';

const DokumentContainer = ({ router }) => (
  <React.Fragment>
    <Head>
      <title>Dokument {router.query.id} | Partiguiden.nu</title>
    </Head>
    <main className="container dokumentBody" style={{ paddingTop: '1.5rem' }}>
      <Dokument id={router.query.id} />
    </main>
  </React.Fragment>
);
export default withRouter(DokumentContainer);
