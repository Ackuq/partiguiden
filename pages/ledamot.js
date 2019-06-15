import React, { useState, useEffect } from 'react';
import { withRouter } from 'next/router';
import Head from 'next/head';

import LoadCircle from '../components/LoadCircle';
import Member from '../components/Views/Member';
import getMemberInformation from '../components/Views/Member/lib/getMemberInformation';

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
      <main>{member ? <Member member={member} /> : <LoadCircle />}</main>
    </React.Fragment>
  );
};

export default withRouter(LedamotContainer);
