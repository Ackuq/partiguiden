import React from 'react';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import Breadcrumbs from '../../../components/Breadcrumbs';

interface Props {
  src: string;
  name: string;
  status: string;
  age: number;
  party: string;
  isLeader?: boolean;
}

const ProfilePicture: React.FC<Props> = ({ src, name, status, age, party, isLeader = false }) => (
  <>
    <Box
      position="relative"
      height={142}
      display="flex"
      mb="100px"
      pt="50px"
      bgcolor="primary.light"
      justifyContent="center"
      boxShadow={2}
    >
      <Box p={2} position="absolute" top={0} left={0}>
        <Breadcrumbs
          links={[
            { label: 'Ledamöter', href: '/ledamoter' },
            { label: 'Ledamot', href: '#' },
          ]}
        />
      </Box>

      <Box
        style={{ background: `url(${src}) 50% 25% no-repeat` }}
        width={192}
        height={192}
        borderRadius="50%"
        position="relative"
      >
        {party !== '-' && (
          <Box position="absolute" top={0} right={0}>
            <img
              width={65}
              height={65}
              src={`../../static/images/party-logos/${party.toUpperCase()}.svg`}
              alt="Partisymbol"
            />
          </Box>
        )}
      </Box>
    </Box>
    <Box textAlign="center" py={2}>
      <Typography variant="h6">
        {status}
        {isLeader && ' och partiledare'}
      </Typography>
      <Typography variant="h4">{name}</Typography>
      <Typography variant="h6" color="textPrimary">
        {age} år
      </Typography>
    </Box>
  </>
);

export default ProfilePicture;
