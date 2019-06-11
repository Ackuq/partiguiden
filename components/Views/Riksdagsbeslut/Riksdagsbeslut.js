import React from 'react';
/* Next.js Head component */
import Head from 'next/head';

import { withStyles } from '@material-ui/core/styles';
import Filter from '../../Filter';

import RiksdagsbeslutList from './components/RiksdagsbeslutList';

import styles from './styles';

const Riksdagsbeslut = ({ classes }) => (
  <React.Fragment>
    <Head>
      <title>Riksdagsbeslut | Partiguiden.nu</title>
      <meta
        name="description"
        content="Vad tar riksdagen för beslut? Här hittar du en sammanfattning på de senaste besluten som tas upp i riksdagen."
      />
    </Head>
    <div className="list-title text-center">
      <h1>Riksdagsbeslut</h1>
    </div>
    <div className={`container ${classes.beslutListContainer}`}>
      <div className={classes.beslutPageContainer} id="beslut-container">
        <RiksdagsbeslutList />
      </div>
      <Filter />
    </div>
  </React.Fragment>
);

export default withStyles(styles)(Riksdagsbeslut);
