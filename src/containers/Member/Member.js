import React from 'react';
import { Container } from '@material-ui/core';
import { object } from 'prop-types';

import SocialMediaShare from '../../components/SocialMediaShare';
import { ProfilePicture, Information } from './components';

const Member = ({ member }) => (
  <React.Fragment>
    <ProfilePicture
      src={member.bild_url}
      name={member.namn}
      status={member.status}
      age={member.alder}
      parti={member.parti}
    />
    <Container>
      <SocialMediaShare title={member.namn} />
      <Information id={member.id} records={member.uppgifter} absence={member.absence} />
    </Container>
  </React.Fragment>
);

Member.propTypes = {
  member: object.isRequired
};

export default Member;
