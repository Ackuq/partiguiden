import React from 'react';

import { Container } from '@mui/material';

import { ProfilePicture, Information } from '../components/MemberInfo';
import LoadCircle from '../components/LoadCircle';

import { useMember } from '../hooks/parliamentHooks';
import BreadcrumbsSocialMediaShare from '../components/BreadcrumbsSocialMediaShare';

import * as ROUTES from '../lib/routes';

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
        <BreadcrumbsSocialMediaShare
          breadcrumbsProps={{
            links: [
              { label: 'Ledamöter', href: ROUTES.MEMBERS },
              {
                label: `${member.firstName} ${member.lastName}`,
                href: ROUTES.MEMBER,
                as: ROUTES.getMemberHref(member.id),
              },
            ],
          }}
          socialMediaShareProps={{ title: `${member.firstName} ${member.lastName}` }}
        />
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
