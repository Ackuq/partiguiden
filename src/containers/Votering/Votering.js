import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

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

Votering.propTypes = {
  forslag: PropTypes.string.isRequired,
  bilaga: PropTypes.array,
  behandladeDokument: PropTypes.array,
  beslut: PropTypes.string.isRequired,
  notisBeskrivning: PropTypes.string.isRequired,
  voting: PropTypes.object.isRequired,
  notisRubrik: PropTypes.string.isRequired
};

Votering.defaultProps = {
  bilaga: null,
  behandladeDokument: null
};

export default Votering;
