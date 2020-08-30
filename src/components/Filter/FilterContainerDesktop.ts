import Box from '@material-ui/core/Box';

import { styled } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

const FilterContainerDesktop = styled(Box)(({ theme }: { theme: Theme }) => ({
  boxShadow: theme.shadows[1],
  position: 'sticky',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  minWidth: '270px',
  maxHeight: 'calc(100vh - 68px)',
  backgroundColor: '#fff',
  top: 94,
  bottom: 10,
  overflowY: 'auto',
  overflowX: 'hidden',
  marginRight: 'auto',
}));

export default FilterContainerDesktop;
