import React from 'react';
import { Box } from '@material-ui/core';
import GoogleAd from 'react-google-publisher-tag';

const Ad = () => (
  <React.Fragment>
    {process.env.NODE_ENV === 'production' && (
      <Box textAlign="center">
        <GoogleAd path="/21821978280/responsive-ad" />
      </Box>
    )}
  </React.Fragment>
);

export default Ad;
