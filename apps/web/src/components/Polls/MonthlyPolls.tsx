import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useTheme } from '@mui/material/styles';

import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, Tooltip, XAxis, YAxis } from 'recharts';

import PartySymbolTick from '../PartySymbolTick';

import { AveragePoll, PollDetails } from '../../lib/polls';

import { PartyAbbreviation } from '../../utils/parties';
import { partiesMap } from '../../utils/getParties';
import tooltipProps from '../../utils/tooltipProps';

import { ChartContainer, PollCard } from './utils';
import { DefaultTooltipContent } from '../../types/recharts.d';
import BarrierLabel from './BarrierLabel';

interface ToolTipProps {
  payload?: Array<{ name: string; payload?: unknown }>;
}

const CustomToolTip: React.FC<ToolTipProps> = ({ ...props }) => {
  const newProps = props;

  if (props.payload && props.payload[0]) {
    const averagePayload = props.payload[0];

    const details = [...(averagePayload.payload as { details: Array<PollDetails> }).details].map(
      (el) => ({
        name: el.institute,
        value: `${el.value}% (${el.published})`,
      })
    );

    newProps.payload = [averagePayload, ...details];
  }
  return <DefaultTooltipContent {...newProps} />;
};

CustomToolTip.defaultProps = {
  payload: undefined,
};

interface Props {
  currentAverage: AveragePoll;
}

const MonthlyPolls: React.FC<Props> = ({ currentAverage }) => {
  const theme = useTheme();
  const shortScreen = useMediaQuery('(max-height:1000px)');
  return (
    <PollCard>
      <Typography variant="h5" align="center">
        Senaste mätningar
      </Typography>
      <ChartContainer height={shortScreen ? 300 : 500}>
        <BarChart data={currentAverage}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="category" dataKey="party" tick={<PartySymbolTick />} tickLine={false} />
          <YAxis type="number" unit="%" />
          <Tooltip content={<CustomToolTip />} {...tooltipProps(theme)} />
          <Bar dataKey="value" name="Genomsnitt" legendType="none" unit="%">
            {currentAverage.map((el) => (
              <Cell key={el.party} fill={partiesMap[el.party as PartyAbbreviation].color} />
            ))}
          </Bar>
          <ReferenceLine
            y={4}
            stroke="black"
            strokeWidth={2}
            label={<BarrierLabel title="4% spärren" />}
            textAnchor="middle"
          />
        </BarChart>
      </ChartContainer>
    </PollCard>
  );
};

export default MonthlyPolls;
