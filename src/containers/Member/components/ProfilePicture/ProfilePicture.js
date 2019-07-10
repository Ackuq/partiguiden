import React from 'react';
import { Typography, Box } from '@material-ui/core';
import PropTypes from 'prop-types';

import Breadcrumbs from '../../../../components/Breadcrumbs';

const ProfilePicture = ({ src, name, status, age, parti }) => (
  <React.Fragment>
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
          links={[{ label: 'Ledamöter', href: '/ledamoter' }, { label: 'Ledamot', href: '#' }]}
        />
      </Box>

      <Box
        style={{ background: `url(${src}) 50% 25% no-repeat` }}
        width={192}
        height={192}
        borderRadius="50%"
        position="relative"
      >
        {parti !== '-' && (
          <Box position="absolute" top={0} right={0}>
            <img
              width={75}
              height={75}
              src={`../../static/images/party-logos/${parti.toUpperCase()}.svg`}
              alt="Partisymbol"
            />
          </Box>
        )}
      </Box>
    </Box>
    <Box textAlign="center" py={2}>
      <Typography variant="h6">{status}</Typography>
      <Typography variant="h4">{name}</Typography>
      <Typography variant="h6" color="textPrimary">
        {age} år
      </Typography>
    </Box>
  </React.Fragment>
);

ProfilePicture.propTypes = {
  src: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  parti: PropTypes.string.isRequired
};

export default ProfilePicture;
