import React from 'react';

import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';

import { styled } from '@material-ui/core/styles';

import { useRouter } from 'next/router';

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
}

const SocialMediaShare: React.FC<Props> = ({ title }) => {
  const router = useRouter();

  const path = process.env.BASE_PATH + router.asPath;

  return (
    <SocialMediaWrapper>
      <IconWrapper>
        <FacebookShareButton url={path} quote={title}>
          <FacebookIcon size={size} round />
        </FacebookShareButton>
      </IconWrapper>
      <IconWrapper>
        <TwitterShareButton url={path} title={title}>
          <TwitterIcon size={size} round />
        </TwitterShareButton>
      </IconWrapper>
    </SocialMediaWrapper>
  );
};

export default SocialMediaShare;
