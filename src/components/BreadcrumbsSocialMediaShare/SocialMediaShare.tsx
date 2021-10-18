import React from 'react';

import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from 'react-share';

import { styled } from '@mui/material/styles';

import { useRouter } from 'next/router';

const SocialMediaWrapper = styled('div')`
  display: flex;
  margin-bottom: 1rem;
  justify-content: flex-end;
  flex-grow: 1;
`;

const IconWrapper = styled('div')`
  cursor: pointer;
  margin-left: 0.25rem;
  margin-right: 0.25rem;
`;

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

export type SocialMediaShareProps = Props;

export default SocialMediaShare;
