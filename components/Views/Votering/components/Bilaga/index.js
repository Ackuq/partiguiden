import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from '../../../../../lib/routes';

export default ({ bilaga }) => (
  <div>
    <Typography variant="h5" color="inherit" gutterBottom>
      Bilaga
    </Typography>
    <Link href={bilaga.fil_url}>
      <a target="_blank" rel="noopener">
        <Typography variant="body1" color="primary">
          {bilaga.titel} {bilaga.dok_id}
        </Typography>
      </a>
    </Link>
  </div>
);
