import React from 'react';
import Link from 'next/link';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/styles';
import grey from '@material-ui/core/colors/grey';
import { Theme } from '@material-ui/core';
import { SubjectListEntry } from '../types/subjects';

import * as ROUTES from '../lib/routes';

const useStyles = makeStyles((theme: Theme) => ({
  subjectList: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '-1rem',
    marginBottom: '1rem',
    [theme.breakpoints.up('md')]: {
      maxWidth: '90%',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '70%',
    },
    [theme.breakpoints.up('xl')]: {
      maxWidth: '60%',
    },
  },

  transition: {
    margin: 0,
    background: `linear-gradient( to left, transparent 50%, ${theme.palette.primary.main} 50% )`,
    backgroundSize: '202% 100%',
    backgroundPosition: 'right bottom',
    backgroundRepeat: 'no-repeat',
    color: grey[900],
    lineHeight: '50px',
    padding: '0 0.5rem',
    transition: 'all 0.2s ease-in-out',
  },

  button: {
    textDecoration: 'none',
    display: 'flex',
    flex: 1,
    fontSize: '1rem',
    justifyContent: 'flex-start',
    '&:hover span': {
      backgroundPosition: 'left bottom',
      color: grey[100],
    },
  },

  item: {
    [theme.breakpoints.down('sm')]: {
      borderColor: theme.palette.primary.main,
      borderLeft: 'solid 2px',
    },
    [theme.breakpoints.up('md')]: {
      '&:nth-child(2n + 1)': {
        borderColor: theme.palette.primary.main,
        borderLeft: 'solid 2px',
      },
      '&:nth-child(2n)': {
        borderRight: 'solid 2px',
        borderColor: theme.palette.primary.main,
      },
    },
    '&:nth-child(3n)': {
      backgroundColor: grey[50],
    },
    '&:nth-child(3n + 1)': {
      backgroundColor: grey[100],
    },
    '&:nth-child(3n + 2)': {
      backgroundColor: grey[200],
    },
  },
}));

interface Props {
  subjects: Array<SubjectListEntry>;
}

const PartiernasStandpunkter: React.FC<Props> = ({ subjects }) => {
  const classes = useStyles();
  return (
    <Grid container classes={{ container: classes.subjectList }}>
      {subjects.map((subject) => (
        <Grid item xs={12} md={6} className={classes.item} key={subject.id}>
          <Link href={ROUTES.STANDPOINT} as={ROUTES.getStandpointHref(subject.id)} passHref>
            <a className={classes.button}>
              <span className={classes.transition}>{subject.name}</span>
            </a>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
};

export default PartiernasStandpunkter;
