import React from 'react';

import { Container } from '@material-ui/core';

import SocialMediaShare from '../components/SocialMediaShare';
import { ProfilePicture, Information } from '../components/MemberInfo';
import LoadCircle from '../components/LoadCircle';

import { useMember } from '../hooks/parliamentHooks';

interface Props {
  id: string;
}

const Member: React.FC<Props> = ({ id }) => {
  const member = useMember(id);

  if (!member) {
    return <LoadCircle />;
  }

  return (
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
};

export default Member;
