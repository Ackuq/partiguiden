import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import {
  TotalVote,
  Decision,
  Appendix,
  VoteDistribution,
  ProcessedDocuments,
} from '../components/VoteInfo';

interface Props {
  suggestion: string;
  appendix?: Array<any>;
  processedDocuments: Array<any>;
  decision: string;
  description: string;
  voting: any;
  title: string;
}

const Vote: React.FC<Props> = ({
  suggestion,
  appendix = null,
  processedDocuments,
  decision,
  voting,
  title,
  description,
}) => (
  <Card>
    <CardContent>
      <TotalVote voting={voting.Totalt} />
      <Typography
        variant="h5"
        style={{ marginBottom: '1rem', marginTop: '1rem' }}
        color="textSecondary"
      >
        {title}
      </Typography>
      <Typography variant="h5" gutterBottom>
        Utskottets förslag
      </Typography>
      <Typography variant="body1" paragraph>
        {suggestion}
      </Typography>
      {processedDocuments.length > 0 && (
        <ProcessedDocuments processedDocuments={processedDocuments} />
      )}
      <VoteDistribution voting={voting} />
      <Decision decision={decision} description={description} />
      {appendix && <Appendix appendix={appendix} />}
    </CardContent>
  </Card>
);

export default Vote;
