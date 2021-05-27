import React from 'react';

import { Card, CardContent, Typography } from '@material-ui/core';

import {
  TotalVote,
  Decision,
  Appendix,
  VoteDistribution,
  ProcessedDocuments,
} from '../components/VoteInfo';
import { Vote as VoteType } from '../types/voting';

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
        {propositionText}
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
