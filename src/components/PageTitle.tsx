import React from 'react';

import { Typography, TypographyProps, Paper } from '@material-ui/core';
import styled from '@emotion/styled';

const PageTitleContainer = styled(Paper)`
  z-index: 99;
  background-color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.primary.light};
  text-align: center;
  padding: 1.5rem 0.25rem;
  margin-bottom: 1rem;
  color: #fff;
  min-height: 5rem;
`;

interface Props extends TypographyProps {
  title: string;
  Icon?: React.ElementType;
}

const PageTitle: React.FC<Props> = ({ title, variant = 'h1', Icon }) => (
  <PageTitleContainer square>
    {Icon && <Icon style={{ fontSize: '2.5rem' }} />}
    <Typography variant={variant} component="h1">
      {title}
    </Typography>
  </PageTitleContainer>
);

PageTitle.defaultProps = {
  Icon: undefined,
};

export default PageTitle;
