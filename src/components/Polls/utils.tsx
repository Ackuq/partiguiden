import { ResponsiveContainer } from 'recharts';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export const ChartContainer = styled(ResponsiveContainer)`
  margin-top: 1rem;
  margin-left: -20px;
`;

export const PollCard = styled(Paper)`
  padding: 1rem 0.5rem;
  margin: 1rem 0;
`;
