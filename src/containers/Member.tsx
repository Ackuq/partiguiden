import React from 'react';
import Container from '@material-ui/core/Container';

import SocialMediaShare from '../components/SocialMediaShare';
import { ProfilePicture, Information } from '../components/MemberInfo';
import { Member as MemberType } from '../types/member';

interface Props {
  member: MemberType;
}

const Member: React.FC<Props> = ({ member }) => (
  <>
    <ProfilePicture member={member} />
    <Container>
      <SocialMediaShare title={`${member.firstName} ${member.lastName}`} />
      <Information
        id={member.id}
        informationRecords={member.information}
        absence={member.absence}
      />
    </Container>
  </>
);

export default Member;
