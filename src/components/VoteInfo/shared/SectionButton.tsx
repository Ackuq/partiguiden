import { ButtonBase } from '@material-ui/core';
import { styled, Theme } from '@material-ui/core/styles';

const SectionButton = styled(ButtonBase)(({ theme }: { theme: Theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
  width: '100%',
  borderRadius: '0.25rem',
  marginBottom: '0.25rem',
  padding: '0.5rem',
}));

export default SectionButton;
