import { styled } from '@material-ui/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Theme } from '@material-ui/core';

const SectionButton = styled(ButtonBase)(({ theme }: { theme: Theme }) => ({
  backgroundColor:
    theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[100],
  width: '100%',
  borderRadius: '0.25rem',
  marginBottom: '0.25rem',
  padding: '0.5rem',
}));

export default SectionButton;
