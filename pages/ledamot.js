import React, { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';
import PropTypes from 'prop-types';

import LoadCircle from '../src/components/LoadCircle';
import Member from '../src/containers/Member';
import { getMemberInformation } from '../src/containers/Member/lib';

const LedamotContainer = ({ router }) => {
  const [member, setMember] = useState(null);

  const url = `https://data.riksdagen.se/personlista/?iid=${router.query.id}&utformat=json`;

  useEffect(() => {
    getMemberInformation({ url }).then(res => setMember(res));
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
