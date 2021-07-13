import { Box } from '@material-ui/core';
import { styled, Theme } from '@material-ui/core/styles';

const FilterContainerDesktop = styled(Box)(({ theme }: { theme: Theme }) => ({
  boxShadow: theme.shadows[1],
  position: 'sticky',
  height: 'min-content',
  maxHeight: 'calc(100vh - 110px)',
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.paper : theme.palette.grey[50],
  top: 102,
  overflowY: 'auto',
  overflowX: 'hidden',
  marginRight: 'auto',
}));

export default FilterContainerDesktop;
