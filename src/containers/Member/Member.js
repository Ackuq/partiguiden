import React from 'react';
import { Container } from '@material-ui/core';
import { object } from 'prop-types';

import SocialMediaShare from '../../components/SocialMediaShare';
import { ProfilePicture, Information } from './components';

const Member = ({ member }) => (
  <React.Fragment>
    <ProfilePicture
      src={member.picture}
      name={member.name}
      status={member.status}
      age={member.age}
      party={member.party}
      isLeader={member.isLeader}
    />
    <Container>
      <SocialMediaShare title={member.namn} />
      <Information id={member.id} records={member.missions} absence={member.absence} />
    </Container>
  </React.Fragment>
);

Member.propTypes = {
  member: object.isRequired,
};

export default Member;
