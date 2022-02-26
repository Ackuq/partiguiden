import MonthlyPolls from '../components/Polls/MonthlyPolls';
import HistoricPolls from '../components/Polls/HistoricPolls';
import BlockStatistics from '../components/Polls/BlockStatistics';
import { AveragePoll, BlocksAverage, MonthlyAverage } from '../lib/polls';

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
      <BlockStatistics currentAverage={currentAverage} blockAverage={blockAverage} />
    </>
  );
};

export default Polls;
