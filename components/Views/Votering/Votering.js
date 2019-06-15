import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import { TotalVote, BehandladeDokument, Bilaga, RostFordelning, Beslut } from './components';

const Votering = ({
  forslag,
  bilaga,
  behandladeDokument,
  beslut,
  voting,
  notisRubrik,
  notisBeskrivning
}) => (
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
);

export default Votering;
