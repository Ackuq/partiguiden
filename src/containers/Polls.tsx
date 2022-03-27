import { AveragePoll, BlocksAverage, MonthlyAverage } from '../lib/polls';

import dynamic from 'next/dynamic';

const BlockBuilder = dynamic(() => import('../components/Polls/BlockBuilder'));
const BlockStatistics = dynamic(() => import('../components/Polls/BlockStatistics'));
const HistoricPolls = dynamic(() => import('../components/Polls/HistoricPolls'));
const MonthlyPolls = dynamic(() => import('../components/Polls/MonthlyPolls'));

interface Props {
  currentAverage: AveragePoll;
  blockAverage: BlocksAverage;
  historicPolls: MonthlyAverage;
}

const Polls: React.FC<Props> = ({ historicPolls, currentAverage, blockAverage }) => {
  return (
    <>
      <MonthlyPolls currentAverage={currentAverage} />
      <HistoricPolls historicPolls={historicPolls} />
      <BlockBuilder currentAverage={currentAverage} />
      <BlockStatistics currentAverage={currentAverage} blockAverage={blockAverage} />
    </>
  );
};

export default Polls;
