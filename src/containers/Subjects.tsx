import React, { useState } from 'react';
import Link from 'next/link';

import { Grid, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { SubjectList } from '../types/subjects';

import * as ROUTES from '../lib/routes';
import Search from '../components/Search/Search';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginLeft: 'auto',
    marginRight: 'auto',
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

  searchContainer: {
    width: '100%',
    marginTop: '-1rem',
  },

  subjectsContainer: {
    marginBottom: '1rem',
  },

  transition: {
    margin: 0,
    background: `linear-gradient( to left, transparent 50%, ${
      theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main
    } 50% )`,
    backgroundSize: '202% 100%',
    backgroundPosition: 'right bottom',
    backgroundRepeat: 'no-repeat',
    color:
      theme.palette.type === 'dark' ? theme.palette.primary.contrastText : theme.palette.grey[900],
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
      color: theme.palette.grey[100],
    },
  },

  item: {
    [theme.breakpoints.down('sm')]: {
      borderLeft: `solid 2px ${
        theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main
      }`,
    },
    [theme.breakpoints.up('md')]: {
      '&:nth-child(2n + 1)': {
        borderLeft: `solid 2px ${
          theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main
        }`,
      },
      '&:nth-child(2n)': {
        borderRight: `solid 2px ${
          theme.palette.type === 'dark' ? theme.palette.primary.dark : theme.palette.primary.main
        }`,
      },
    },
    '&:nth-child(3n)': {
      backgroundColor:
        theme.palette.type === 'dark' ? theme.palette.background.paper : theme.palette.grey[50],
    },
    '&:nth-child(3n + 1)': {
      backgroundColor:
        theme.palette.type === 'dark' ? theme.palette.background.paper : theme.palette.grey[100],
    },
    '&:nth-child(3n + 2)': {
      backgroundColor:
        theme.palette.type === 'dark' ? theme.palette.background.paper : theme.palette.grey[200],
    },
  },
}));

interface Props {
  subjects: SubjectList;
}

const Subjects: React.FC<Props> = ({ subjects }) => {
  const classes = useStyles();

  const [shownSubjects, setShownSubjects] = useState(subjects);

  return (
    <>
      <div className={`${classes.searchContainer} ${classes.container}`}>
        <Search setSearchResult={setShownSubjects} />
      </div>
      <Grid container classes={{ container: `${classes.container} ${classes.subjectsContainer}` }}>
        {shownSubjects.map((subject) => (
          <Grid item xs={12} md={6} className={classes.item} key={subject.id}>
            <Link href={ROUTES.STANDPOINT} as={ROUTES.getStandpointHref(subject.id)} passHref>
              <a className={classes.button}>
                <span className={classes.transition}>{subject.name}</span>
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Subjects;
