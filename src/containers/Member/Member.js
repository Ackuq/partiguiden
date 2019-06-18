import React from 'react';
import { Container } from '@material-ui/core';
import { object } from 'prop-types';

import { ProfilePicture, Information } from './components';

const Member = ({ member }) => (
  <React.Fragment>
    <ProfilePicture
      src={member.bild_url_192}
      name={`${member.tilltalsnamn} ${member.efternamn}`}
      status={member.status}
      age={new Date().getFullYear() - member.fodd_ar}
    />
    <Container>
      <Information id={member.intressent_id} records={member.personuppgift.uppgift} />
    </Container>
  </React.Fragment>
);

Member.propTypes = {
  member: object.isRequired
};

export default Member;
