import React from 'react';
import Link from 'next/link';

import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import grey from '@material-ui/core/colors/grey';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { getStandpointHref, STANDPOINT } from '../lib/routes';

const styles = (theme: Theme) =>
  createStyles({
    featured: {
      width: '100%',
      textAlign: 'center',
      borderBottom: '2px solid',
      borderColor: theme.palette.primary.main,
      fontWeight: 'normal',
      padding: '1rem',
      display: 'flex',
      flexGrow: 1,
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

const Featured: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={3}>
      {getFeatured().map((obj) => (
        <Grid key={obj.id} item xs={12} md={6}>
          <Link href={STANDPOINT} as={getStandpointHref(obj.id)} passHref>
            <ButtonBase className={classes.featured}>
              <Typography variant="button" color="primary">
                {obj.name}
              </Typography>
            </ButtonBase>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default Featured;
