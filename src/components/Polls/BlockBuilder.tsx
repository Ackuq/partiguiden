import { AveragePoll } from '../../lib/polls';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  LegendProps,
  ReferenceLine,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartContainer, PollCard } from './utils';
import { Formatter, Payload } from 'recharts/types/component/DefaultLegendContent';
import { PARTY_LOGOS_LOW_RES } from '../../assets/logos';
import { PartyAbbreviation } from '../../utils/parties';
import { partiesMap } from '../../utils/getParties';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import BarrierLabel from './BarrierLabel';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import tooltipProps from '../../utils/tooltipProps';
import useMediaQuery from '@mui/material/useMediaQuery';

interface Props {
  currentAverage: AveragePoll;
}

type StackedData = Record<PartyAbbreviation | 'total', number>;

const toStackedData = (data: AveragePoll, included: PartyAbbreviation[]): StackedData => {
  const withParties = data.reduce(
    (prev, current) => ({ ...prev, [current.party]: current.value }),
    {} as StackedData
  );
  const total = (included
    .map((party) => withParties[party])
    .reduce((prev, curr) => prev + curr, 0)
    .toFixed(2) + '%') as unknown as number;
  return { ...withParties, total };
};

const legendFormatter: Formatter = (value, entry: Payload) => {
  return (
    <Image
      src={PARTY_LOGOS_LOW_RES[entry.value.toUpperCase() as PartyAbbreviation]}
      layout="fixed"
      width="40%"
      height="40%"
      quality={100}
      alt={`${entry.value} logo`}
      style={{
        filter: `grayscale(${entry.inactive ? '75%' : '0'})`,
      }}
    />
  );
};

const BlockBuilder: React.FC<Props> = ({ currentAverage }) => {
  const theme = useTheme();
  const [included, setIncluded] = useState<PartyAbbreviation[]>([]);

  const shortScreen = useMediaQuery('(max-height:1000px)');

  const includeParty = (party: PartyAbbreviation) => {
    setIncluded((prev) => [...prev, party]);
  };

  const removeParty = (party: PartyAbbreviation) => {
    setIncluded((prev) => prev.filter((p) => p !== party));
  };

  const onClick: LegendProps['onClick'] = (data) => {
    const party = data.value;
    if (included.includes(party)) {
      removeParty(party);
    } else {
      includeParty(party);
    }
  };

  const stackedData = toStackedData(currentAverage, included);

  return (
    <PollCard>
      <Typography variant="h5" align="center" marginBottom="1rem">
        Bygg din egna regering
      </Typography>
      <ChartContainer height={shortScreen ? 500 : 800}>
        <BarChart data={[stackedData]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="total" />
          <YAxis type="number" unit="%" domain={[0, 100]} />
          <Tooltip {...tooltipProps(theme)} />
          {currentAverage.map((el) => (
            <Bar
              hide={!included.includes(el.party)}
              dataKey={el.party}
              stackId="a"
              key={el.party}
              fill={partiesMap[el.party].color}
              unit="%"
            />
          ))}
          <Legend
            formatter={legendFormatter}
            wrapperStyle={{ marginLeft: 30, bottom: -5 }}
            onClick={onClick}
            iconSize={0}
          />
          <ReferenceLine
            y={50}
            stroke="black"
            strokeWidth={2}
            label={<BarrierLabel title="50%" />}
            textAnchor="middle"
          />
        </BarChart>
      </ChartContainer>
    </PollCard>
  );
};

export default BlockBuilder;
