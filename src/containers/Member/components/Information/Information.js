import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';

import { getVoteAbsence } from '../../lib';

const VoteAbsence = ({ id, documentCount }) => {
  const [absence, setAbsence] = useState('');

  const url = `https://data.riksdagen.se/voteringlista/?iid=${id}&utformat=JSON&gruppering=namn`;

  useEffect(() => {
    getVoteAbsence({ url }).then(res => setAbsence(res.absence));
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <Paper style={{ padding: '0.5rem' }}>
          <Typography variant="h5" align="center">
            {absence} %
          </Typography>
          <Typography variant="body2" align="center">
            Voteringsnärvaro
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper style={{ padding: '0.5rem' }}>
          <Typography variant="h5" align="center">
            {documentCount}
          </Typography>
          <Typography variant="body2" align="center">
            Dokument
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default VoteAbsence;
