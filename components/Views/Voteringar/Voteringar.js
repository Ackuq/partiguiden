import React from 'react';
/* Next.js Head component */
import Head from 'next/head';
import { withRouter } from 'next/router';

import { VoteringList } from './components';

const Voteringar = ({ router, ...rest }) => (
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
    <VoteringList query={router.query} asPath={router.asPath} {...rest} page={1} />
  </React.Fragment>
);

export default withRouter(Voteringar);
