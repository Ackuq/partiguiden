import React from 'react';
/* Material UI import */
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

/* Custom components */
import { Featured } from './components';

const FrontPage = () => (
  <Grid container spacing={16}>
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h4" paragraph align="center">
            Vilket parti ska man rösta på?
          </Typography>
          <Typography variant="body1" paragraph style={{ fontSize: '1.25rem' }}>
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
