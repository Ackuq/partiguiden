import Paper from '@mui/material/Paper';

import Typography, { TypographyProps } from '@mui/material/Typography';

import { styled } from '@mui/material/styles';

const PageTitleContainer = styled(Paper, { shouldForwardProp: (prop) => prop !== 'marginBottom' })<{
  marginBottom: string;
}>`
  z-index: 99;
  background-color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.primary.light};
  text-align: center;
  padding: 1.5rem 0.25rem;
  margin-bottom: ${({ marginBottom }) => marginBottom};
  color: #fff;
  min-height: 5rem;
`;

interface Props extends TypographyProps {
  title: string;
  Icon?: React.ElementType;
  marginBottom?: string;
}

const PageTitle: React.FC<Props> = ({ title, variant = 'h1', Icon, marginBottom = '1rem' }) => (
  <PageTitleContainer square marginBottom={marginBottom}>
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
