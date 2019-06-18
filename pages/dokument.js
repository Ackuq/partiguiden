import React from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import PropTypes from 'prop-types';

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

DokumentContainer.propTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(DokumentContainer);
