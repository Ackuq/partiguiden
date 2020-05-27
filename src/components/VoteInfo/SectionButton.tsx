import { styled } from '@material-ui/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import { grey } from '@material-ui/core/colors';

const SectionButton = styled(ButtonBase)({
  backgroundColor: grey[100],
  width: '100%',
  borderRadius: '0.25rem',
  marginBottom: '0.25rem',
  padding: '0.5rem',
});

export default SectionButton;
