import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import { TotalVote, Decision, Appendix, VoteDistribution, ProcessedDocuments } from './components';

const Vote = ({
  suggestion,
  appendix,
  processedDocuments,
  decision,
  voting,
  title,
  description,
}) => (
  <Card>
    <CardContent>
      <TotalVote voting={voting.Totalt} />
      <Typography variant="h5" style={{ marginBottom: '1rem' }} color="textSecondary">
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

Vote.propTypes = {
  suggestion: PropTypes.string.isRequired,
  appendix: PropTypes.array,
  processedDocuments: PropTypes.array.isRequired,
  decision: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  voting: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

Vote.defaultProps = {
  appendix: null,
};

export default Vote;
