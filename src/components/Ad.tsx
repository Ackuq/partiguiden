import React from 'react';
import GoogleAd from 'react-google-publisher-tag';

const Ad = () =>
  process.env.NODE_ENV === 'production' ? (
    <div style={{ textAlign: 'center' }}>
      <GoogleAd path="/21821978280/responsive-ad" />
    </div>
  ) : null;

export default Ad;
