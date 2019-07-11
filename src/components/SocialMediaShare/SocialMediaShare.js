import React from 'react';
import { withRouter } from 'next/router';
import { string, object } from 'prop-types';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/styles';

import { baseUrl } from '../../utils';

const SocialMediaWrapper = styled(Box)({
  display: 'flex',
  marginBottom: '1rem',
  justifyContent: 'flex-end',
});

const IconWrapper = styled(Box)({
  cursor: 'pointer',
  marginLeft: '0.25rem',
  marginRight: '0.25rem',
});

const size = 45;

const SocialMediaShare = ({ title, router }) => (
  <SocialMediaWrapper>
    <IconWrapper>
      <FacebookShareButton url={baseUrl + router.asPath} quote={title}>
        <FacebookIcon size={size} round />
      </FacebookShareButton>
    </IconWrapper>
    <IconWrapper>
      <TwitterShareButton url={baseUrl + router.asPath} title={title}>
        <TwitterIcon size={size} round />
      </TwitterShareButton>
    </IconWrapper>
  </SocialMediaWrapper>
);

SocialMediaShare.propTypes = {
  title: string.isRequired,
  router: object.isRequired,
};

export default withRouter(SocialMediaShare);
