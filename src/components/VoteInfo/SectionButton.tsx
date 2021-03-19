import { styled } from '@material-ui/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import { grey } from '@material-ui/core/colors';
import { Theme } from '@material-ui/core';

const SectionButton = styled(ButtonBase)(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.type === 'dark' ? grey[900] : grey[100],
  width: '100%',
  borderRadius: '0.25rem',
  marginBottom: '0.25rem',
  padding: '0.5rem',
}));

export default SectionButton;
