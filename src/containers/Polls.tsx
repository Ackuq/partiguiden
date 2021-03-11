import React from 'react';
import { Polls as PollsType } from '../types/polls';
import MonthlyPolls from '../components/MonthlyPolls';

interface Props {
  polls: PollsType;
}

const Polls: React.FC<Props> = ({ polls }) => {
  return (
    <>
      <MonthlyPolls polls={polls} />
    </>
  );
};

export default Polls;
