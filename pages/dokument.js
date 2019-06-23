import React from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';

import PageTitle from '../src/components/PageTitle';
import SocialMediaShare from '../src/components/SocialMediaShare';
import Dokument from '../src/containers/Dokument';

const DokumentContainer = ({ router }) => (
  <React.Fragment>
    <Head>
      <title>{router.query.id} | Dokument | Partiguiden.nu</title>
    </Head>
    <PageTitle title={`Dokument ${router.query.id}`} />
    <Container>
      <SocialMediaShare title={`Dokument ${router.query.id}`} />
      <Dokument id={router.query.id} />
    </Container>
  </React.Fragment>
);

DokumentContainer.propTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(DokumentContainer);
