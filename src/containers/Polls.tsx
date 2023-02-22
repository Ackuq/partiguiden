import { AveragePoll, BlocksAverage, MonthlyAverage } from '../lib/polls';
import BlockBuilder from '../components/Polls/BlockBuilder';
import BlockStatistics from '../components/Polls/BlockStatistics';
import HistoricPolls from '../components/Polls/HistoricPolls';
import MonthlyPolls from '../components/Polls/MonthlyPolls';

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
