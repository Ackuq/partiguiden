import React from 'react';
import Router from 'next/router';
import { Grid, ButtonBase, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/styles';

const styles = theme => ({
  featured: {
    width: '100%',
    textAlign: 'center',
    borderBottom: '2px solid',
    borderColor: theme.palette.primary.main,
    fontWeight: '400',
    padding: '1rem',
    display: 'flex',
    flexGrow: '1',
    color: grey[900],
    '&:hover': {
      backgroundColor: grey[100],
    },
  },
});

const getFeatured = () => [
  { id: 'miljo', name: 'Miljö och klimat' },
  { id: 'vard-och-omsorg', name: 'Vård och omsorg' },
  { id: 'skola', name: 'Skola och utbildning' },
  { id: 'migration-och-integration', name: 'Migration och integration' },
];

const useStyles = makeStyles(styles);

const Featured = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      {getFeatured().map(obj => (
        <Grid key={obj.id} item xs={12} md={6}>
          <ButtonBase
            className={classes.featured}
            onClick={event => {
              event.preventDefault();
              Router.push('/standpunkter/[id]', `/standpunkter/${obj.id}`);
            }}
          >
            <Typography
              component="a"
              variant="button"
              href={`/standpunkter/${obj.id}`}
              color="primary"
            >
              {obj.name}
            </Typography>
          </ButtonBase>
        </Grid>
      ))}
    </Grid>
  );
};

export default Featured;
