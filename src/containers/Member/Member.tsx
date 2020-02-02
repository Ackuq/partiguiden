import React from 'react';
import Container from '@material-ui/core/Container';

import SocialMediaShare from '../../components/SocialMediaShare';
import { ProfilePicture, Information } from './components';

const Member: React.FC<{ member: any }> = ({ member }) => (
  <>
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
  </>
);

export default Member;
