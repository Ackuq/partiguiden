import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { Vote as VoteType } from '../types/voting';
import Appendix from '../components/VoteInfo/Appendix';
import Decision from '../components/VoteInfo/Decision';
import ProcessedDocuments from '../components/VoteInfo/ProcessedDocuments';
import SectionDivider from '../components/VoteInfo/SectionDivider';
import TotalVote from '../components/VoteInfo/TotalVote';
import VoteDistribution from '../components/VoteInfo/VoteDistribution';

interface Props {
  vote: VoteType;
}

const Vote: React.FC<Props> = ({
  vote: {
    propositionText,
    title,
    decision,
    description,
    voting,
    processedDocuments,
    appendix = null,
  },
}) => (
  <Card sx={{ marginBottom: '1rem' }}>
    <CardContent>
      <TotalVote voting={voting.total} />
      <Typography
        variant="h3"
        component="h2"
        sx={{
          marginBottom: '1rem',
          marginTop: '1rem',
        }}
      >
        {title}
      </Typography>
      <Typography variant="h4" component="span" gutterBottom>
        Utskottets förslag
      </Typography>
      <Typography variant="body1" paragraph>
        {propositionText}
      </Typography>
      <SectionDivider />
      {processedDocuments.length > 0 && (
        <>
          <ProcessedDocuments processedDocuments={processedDocuments} />
          <SectionDivider />
        </>
      )}
      <VoteDistribution voting={voting} />
      <SectionDivider />
      <Decision decision={decision} description={description} />
      {appendix && <Appendix appendix={appendix} />}
    </CardContent>
  </Card>
);

export default Vote;
