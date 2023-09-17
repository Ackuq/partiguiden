import { styled } from "@mui/material/styles";

import type { BreadcrumbsProps } from "./Breadcrumbs";
import Breadcrumbs from "./Breadcrumbs";
import type { SocialMediaShareProps } from "./SocialMediaShare";
import SocialMediaShare from "./SocialMediaShare";

const Container = styled("div")`
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
