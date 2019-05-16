import React from 'react';
/* Material UI */
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { TotalVote, BehandladeDokument, Bilaga, RostFordelning, Beslut } from './components';

export default ({
  forslag,
  bilaga,
  behandladeDokument,
  beslut,
  voting,
  notisRubrik,
  notisBeskrivning
}) => (
  <div className="container">
    <Card>
      <CardContent>
        <TotalVote voting={voting.Totalt} />
        <Typography variant="h5" style={{ marginBottom: '1rem' }} color="textSecondary">
          {notisRubrik}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Utskottets förslag
        </Typography>
        <Typography variant="body1" paragraph>
          {forslag}
        </Typography>
        {behandladeDokument && <BehandladeDokument behandladeDokument={behandladeDokument} />}
        <RostFordelning voting={voting} />
        <Beslut beslut={beslut} notisBeskrivning={notisBeskrivning} />
        {bilaga && <Bilaga bilaga={bilaga} />}
      </CardContent>
    </Card>
  </div>
);
