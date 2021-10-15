import { ButtonBase } from '@mui/material';
import styled from '@emotion/styled';

const SectionButton = styled(ButtonBase)`
  background-color: ${({ theme }) =>
    theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100]};
  width: 100%;
  border-radius: 0.25rem;
  margin-bottom: 0.25rem;
  padding: 0.5rem;
`;

export default SectionButton;
