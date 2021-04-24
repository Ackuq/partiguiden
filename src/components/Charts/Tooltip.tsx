import React from 'react';
import { Tooltip as RCTooltip, TooltipProps } from 'recharts';
import { Theme, useTheme } from '@material-ui/core';

const toolTipStyles = (theme: Theme): React.CSSProperties => ({
  backgroundColor: theme.palette.background.paper,
  border: 0,
  boxShadow: theme.shadows[2],
});

const Tooltip: React.FC<TooltipProps<number | string, string>> = ({ ...props }) => {
  const theme = useTheme();

  return (
    <RCTooltip
      {...props}
      contentStyle={toolTipStyles(theme)}
      itemStyle={{ color: theme.palette.type === 'dark' ? 'white' : 'black' }}
      labelStyle={{ color: theme.palette.type === 'dark' ? 'white' : 'black' }}
    />
  );
};

export default Tooltip;
