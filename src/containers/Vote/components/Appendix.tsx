import React from 'react';

import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Appendix: React.FC<{ appendix: Array<any> }> = ({ appendix }) => (
  <>
    <Typography variant="h5" color="inherit" gutterBottom>
      Bilaga
    </Typography>
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {appendix.map(curr => (
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
  </>
);

export default Appendix;
