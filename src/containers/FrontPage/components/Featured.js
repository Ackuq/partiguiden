import React from 'react';
/* Material UI import */
import { Grid, ButtonBase } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

import { Router } from '../../../lib/routes';

const featuredStyles = theme => ({
  featured: {
    width: '100%',
    textAlign: 'center',
    border: '2px solid',
    borderColor: theme.palette.secondary.main,
    borderRadius: '3rem',
    fontWeight: '400',
    padding: '1rem',
    display: 'flex',
    flexGrow: '1',
    color: grey[900],
    '&:hover': {
      backgroundColor: grey[100]
    }
  }
});

const getFeatured = () => [
  { id: 'miljo', name: 'Miljö och klimat' },
  { id: 'vard-och-omsorg', name: 'Vård och omsorg' },
  { id: 'skola', name: 'Skola och utbildning' },
  { id: 'migration-och-integration', name: 'Migration och integration' }
];

export default withStyles(featuredStyles)(({ classes }) => (
  <Grid container spacing={3}>
    {getFeatured().map(obj => (
      <Grid key={`${obj.id}`} item xs={12} md={6}>
        <ButtonBase
          className={classes.featured}
          component="div"
          onClick={() => Router.pushRoute('subject', { id: obj.id })}
        >
          <span>{obj.name}</span>
        </ButtonBase>
      </Grid>
    ))}
  </Grid>
));
