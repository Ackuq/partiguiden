import Container from '@mui/material/Container';

import Information from '../components/MemberInfo/Information';
import ProfilePicture from '../components/MemberInfo/ProfilePicture';

import * as ROUTES from '../lib/routes';
import BreadcrumbsSocialMediaShare from '../components/BreadcrumbsSocialMediaShare/BreadcrumbsSocialMediaShare';

import { Member as MemberType } from '../types/member';

interface Props {
  member: MemberType;
}

const Member: React.FC<Props> = ({ member }) => {
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
