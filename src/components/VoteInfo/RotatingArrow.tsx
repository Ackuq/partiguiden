import ArrowDownRounded from '@material-ui/icons/KeyboardArrowDownRounded';
import { styled, Theme } from '@material-ui/core';

const RotatingArrow = styled(ArrowDownRounded)(({ theme }: { theme: Theme }) => ({
  transition: 'transform 0.25s ease-in-out',
  fontSize: '2.5rem',
  marginLeft: 'auto',
  color: theme.palette.primary.dark,
}));

export default RotatingArrow;
