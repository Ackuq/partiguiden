import React from 'react';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';

/* Custom components */
import { Featured } from './components';

const FrontPage = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h4" paragraph align="center">
            Vilket parti ska man rösta på?
          </Typography>
          <Typography variant="body1" paragraph>
            Vilket parti ska man rösta på? Och vad tycker partierna egentligen? På Partiguiden.nu
            kan du läsa om vad partierna tycker enligt sina partiprogram och samt se hur de röstar i
            riksdagsvoteringar.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h4" paragraph align="center">
            Aktuella frågor
          </Typography>
          <Featured />
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default FrontPage;
