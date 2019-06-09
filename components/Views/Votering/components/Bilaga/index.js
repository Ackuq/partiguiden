import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from '../../../../../lib/routes';

const Bilaga = ({ bilaga }) => (
  <div>
    <Typography variant="h5" color="inherit" gutterBottom>
      Bilaga
    </Typography>
    <Link href={bilaga.fil_url[0]}>
      <a target="_blank" rel="noopener">
        <Typography variant="body1" color="primary">
          {bilaga.titel[0]} {bilaga.dok_id[0]}
        </Typography>
      </a>
    </Link>
  </div>
);

export default Bilaga;
