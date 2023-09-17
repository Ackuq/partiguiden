import { styled } from '@mui/material/styles';

import Breadcrumbs, { BreadcrumbsProps } from './Breadcrumbs';
import SocialMediaShare, { SocialMediaShareProps } from './SocialMediaShare';

const Container = styled('div')`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

interface Props {
  breadcrumbsProps: BreadcrumbsProps;
  socialMediaShareProps: SocialMediaShareProps;
}

const BreadcrumbsSocialMediaShare: React.FC<Props> = ({
  socialMediaShareProps,
  breadcrumbsProps,
}) => {
  return (
    <Container>
      <Breadcrumbs {...breadcrumbsProps} />
      <SocialMediaShare {...socialMediaShareProps} />
    </Container>
  );
};

export default BreadcrumbsSocialMediaShare;
