import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';

import { apiLinks } from '../../src/utils';
import Member from '../../src/containers/Member';

const MemberContainer = ({ member }) => (
  <React.Fragment>
    <Head>
      <title>{member.namn} | Ledamot | Partiguiden.nu</title>
    </Head>
    <Member member={member} />
  </React.Fragment>
);

MemberContainer.getInitialProps = async ({ query }) => {
  const url = `${apiLinks.partiguidenApi}/member/${query.id}`;
  const res = await fetch(url);
  const member = await res.json();

  return { member };
};

MemberContainer.propTypes = {
  member: PropTypes.object.isRequired
};

export default MemberContainer;
