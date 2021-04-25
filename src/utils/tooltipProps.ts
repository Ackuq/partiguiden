import React from 'react';
import { TooltipProps } from 'recharts';
import { Theme } from '@material-ui/core';

const toolTipStyles = (theme: Theme): React.CSSProperties => ({
  backgroundColor: theme.palette.background.paper,
  border: 0,
  boxShadow: theme.shadows[2],
});

const tooltipProps = (theme: Theme): TooltipProps<string | number, string> => ({
  contentStyle: toolTipStyles(theme),
  cursor: {
    fill: theme.palette.type === 'dark' ? theme.palette.grey[800] : theme.palette.grey[400],
  },
  itemStyle: { color: theme.palette.type === 'dark' ? 'white' : 'black' },
  labelStyle: { color: theme.palette.type === 'dark' ? 'white' : 'black' },
});

export default tooltipProps;
