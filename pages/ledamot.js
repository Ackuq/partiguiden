import React, { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import PropTypes from 'prop-types';

import { fetchJSON } from '../src/utils';
import LoadCircle from '../src/components/LoadCircle';
import Member from '../src/containers/Member';

const LedamotContainer = ({ router }) => {
  const [member, setMember] = useState(null);

  const url = `https://api.partiguiden.nu/member?id=${router.query.id}`;

  useEffect(() => {
    fetchJSON(url).then(res => setMember(res));
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Ledamot | Partiguiden.nu</title>
      </Head>
      {member ? <Member member={member} /> : <LoadCircle />}
    </React.Fragment>
  );
};

LedamotContainer.propTypes = {
  router: PropTypes.object.isRequired
};

export default withRouter(LedamotContainer);
