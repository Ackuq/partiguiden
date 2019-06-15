import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Link } from '../../../../lib/routes';

const Bilaga = ({ bilaga }) => (
  <div>
    <Typography variant="h5" color="inherit" gutterBottom>
      Bilaga
    </Typography>
    {bilaga.map(curr => (
      <Link href={curr.fil_url} key={curr.fil_url}>
        <a target="_blank" rel="noopener">
          <Typography variant="body1" color="primary">
            {curr.titel} {curr.dok_id}
          </Typography>
        </a>
      </Link>
    ))}
  </div>
);

export default Bilaga;
