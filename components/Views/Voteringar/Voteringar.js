import React from 'react';
/* Next.js Head component */
import Head from 'next/head';
import { withStyles } from '@material-ui/core/styles';

import VoteringList from './components/VoteringList';
import Filter from '../../Filter';

import styles from './styles';

const Voteringar = ({ classes }) => (
  <React.Fragment>
    <Head>
      <title>Voteringar | Partiguiden.nu</title>
      <meta
        name="description"
        content="Hur har partierna röstat i voteringar? Ta reda på det här."
      />
    </Head>
    <div className="list-title text-center">
      <h1>Voteringar</h1>
    </div>
    <div className={`container ${classes.VoteringListContainer}`}>
      <div className={`VoteringPage ${classes.voteringarPageContainer}`}>
        <VoteringList />
      </div>
      <Filter />
    </div>
  </React.Fragment>
);

export default withStyles(styles)(Voteringar);
