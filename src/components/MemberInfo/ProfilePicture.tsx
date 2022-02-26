import Image from 'next/image';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useTheme } from '@mui/material/styles';

import { Member } from '../../types/member';

import { PARTY_LOGOS_LOW_RES } from '../../assets/logos';
import { PartyAbbreviation } from '../../utils/parties';

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
        bgcolor={theme.palette.mode === 'dark' ? 'primary.dark' : 'primary.light'}
        justifyContent="center"
        boxShadow={2}
      >
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
                src={PARTY_LOGOS_LOW_RES[member.party.toUpperCase() as PartyAbbreviation]}
                alt="Partisymbol"
              />
            </Box>
          )}
        </Box>
      </Box>
      <Box textAlign="center" py={2}>
        <Typography variant="h6" component="span">
          {member.status}
          {member.isLeader && ' och partiledare'}
        </Typography>
        <Typography variant="h4" component="h1">
          {member.firstName} {member.lastName}
        </Typography>
        <Typography variant="h6" color="textPrimary" component="span">
          {member.age} år
        </Typography>
      </Box>
    </>
  );
};

export default ProfilePicture;
