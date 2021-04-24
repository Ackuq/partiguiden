import React from 'react';

import Image from 'next/image';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useTheme } from '@material-ui/core';

import Breadcrumbs from '../Breadcrumbs';
import { Member } from '../../types/member';

import * as ROUTES from '../../lib/routes';

interface Props {
  member: Member;
}

const ProfilePicture: React.FC<Props> = ({ member }) => {
  const theme = useTheme();

  return (
    <>
      <Box
        position="relative"
        height={142}
        display="flex"
        mb="100px"
        pt="50px"
        bgcolor={theme.palette.type === 'dark' ? 'primary.dark' : 'primary.light'}
        justifyContent="center"
        boxShadow={2}
      >
        <Box p={2} position="absolute" top={0} left={0}>
          <Breadcrumbs
            links={[
              { label: 'Ledamöter', href: ROUTES.MEMBERS },
              {
                label: `${member.firstName} ${member.lastName}`,
                href: ROUTES.MEMBER,
                as: ROUTES.getMemberHref(member.id),
              },
            ]}
          />
        </Box>

        <Box
          style={{ background: `url(${member.pictureUrl}) 50% 25% no-repeat` }}
          width={192}
          height={192}
          borderRadius="50%"
          position="relative"
        >
          {member.party !== '-' && (
            <Box position="absolute" top={0} right={0}>
              <Image
                width={65}
                height={65}
                src={`/static/images/party-logos/${member.party.toUpperCase()}.png`}
                layout="intrinsic"
                alt="Partisymbol"
              />
            </Box>
          )}
        </Box>
      </Box>
      <Box textAlign="center" py={2}>
        <Typography variant="h6">
          {member.status}
          {member.isLeader && ' och partiledare'}
        </Typography>
        <Typography variant="h4">
          {member.firstName} {member.lastName}
        </Typography>
        <Typography variant="h6" color="textPrimary">
          {member.age} år
        </Typography>
      </Box>
    </>
  );
};

export default ProfilePicture;
