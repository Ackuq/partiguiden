import { styled } from '@mui/material/styles';
import ArrowDownRounded from '@mui/icons-material/KeyboardArrowDownRounded';

const RotatingArrow = styled(ArrowDownRounded)<{ active: 'true' | 'false' }>`
  transition: transform 0.25s ease-in-out;
  font-size: 2.5rem;
  margin-left: auto;
  color: theme.palette.primary.dark;
  transform: rotate(${({ active }) => (active === 'true' ? '180deg' : '0')});
`;

export default RotatingArrow;
