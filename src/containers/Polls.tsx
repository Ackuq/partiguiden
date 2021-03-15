import React from 'react';
import { Polls as PollsType } from '../types/polls';
import MonthlyPolls from '../components/MonthlyPolls';
import HistoricPolls from '../components/HistoricPolls';

interface Props {
  polls: PollsType;
}

const Polls: React.FC<Props> = ({ polls }) => {
  return (
    <>
      <MonthlyPolls polls={polls} />
      <HistoricPolls polls={polls} />
    </>
  );
};

export default Polls;
