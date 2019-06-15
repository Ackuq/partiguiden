import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Bilaga = ({ bilaga }) => (
  <React.Fragment>
    <Typography variant="h5" color="inherit" gutterBottom>
      Bilaga
    </Typography>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {bilaga.map(curr => (
        <Link
          href={curr.fil_url}
          key={curr.fil_url}
          target="_blank"
          rel="noopener"
          variant="body1"
          color="primary"
        >
          {curr.titel} {curr.dok_id}
        </Link>
      ))}
    </div>
  </React.Fragment>
);

export default Bilaga;
