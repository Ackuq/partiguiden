import React from 'react';
import Link from 'next/link';

import Grid from '@material-ui/core/Grid';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import grey from '@material-ui/core/colors/grey';
import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { getStandpointHref, STANDPOINT } from '../lib/routes';
import { SubjectListEntry } from '../types/subjects';

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

const useStyles = makeStyles(styles);

interface Props {
  popular: Array<SubjectListEntry>;
}

const Featured: React.FC<Props> = ({ popular }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      {popular.map((subject) => (
        <Grid key={subject.id} item xs={12} md={6}>
          <Link href={STANDPOINT} as={getStandpointHref(subject.id)} passHref>
            <ButtonBase className={classes.featured}>
              <Typography variant="button" color="primary">
                {subject.name}
              </Typography>
            </ButtonBase>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default Featured;
