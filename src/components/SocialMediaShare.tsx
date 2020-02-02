import React from 'react';
import { withRouter } from 'next/router';
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import styled from '@material-ui/styles/styled';

import { baseUrl } from '../utils';

const SocialMediaWrapper = styled('div')({
  display: 'flex',
  marginBottom: '1rem',
  justifyContent: 'flex-end',
});

const IconWrapper = styled('div')({
  cursor: 'pointer',
  marginLeft: '0.25rem',
  marginRight: '0.25rem',
});

const size = 45;

interface Props {
  title: string;
  router: any;
}

const SocialMediaShare: React.FC<Props> = ({ title, router }) => (
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

export default withRouter(SocialMediaShare);
