import React from 'react';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Featured from '../components/Featured';
import { SubjectListEntry } from '../types/subjects';

interface Props {
  popular: Array<SubjectListEntry>;
}

const FrontPage: React.FC<Props> = ({ popular }) => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h4" paragraph align="center">
            Vilket parti ska man rösta på?
          </Typography>
          <Typography variant="body1" paragraph>
            Vilket parti ska man rösta på? Och vad tycker partierna egentligen? På Partiguiden kan
            du läsa om vad partierna tycker enligt sina partiprogram och samt se hur de röstar i
            riksdagsvoteringar.
          </Typography>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="h5" paragraph align="center">
            Mest besökta ämnen de senaste 30 dagarna
          </Typography>
          <Featured popular={popular} />
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default FrontPage;
