import { styled } from '@material-ui/styles';
import { IconButton } from '@material-ui/core';

const CloseButton = styled(IconButton)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'none'
  },
  padding: '0.35rem',
  position: 'absolute',
  top: '5px',
  right: '15px'
}));

export default CloseButton;
