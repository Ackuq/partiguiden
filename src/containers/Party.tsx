import { Avatar, Grid, Link, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

import React from 'react';
import { Leader as LeaderType, PartyData } from '../types/party';
import NextLink from 'next/link';

const useStyles = makeStyles((theme: Theme) => ({
  cardContainer: {
    padding: '1rem',
    display: 'flex',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems: 'center',
    },
  },

  partyLogo: {
    height: 150,
    [theme.breakpoints.down('md')]: {
      height: 125,
    },
    [theme.breakpoints.down('sm')]: {
      height: 100,
    },
  },

  leaderAvatar: {
    marginBottom: theme.spacing(1),
    marginRight: 'auto',
    marginLeft: 'auto',
    width: theme.spacing(20),
    height: theme.spacing(20),

    [theme.breakpoints.down('md')]: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },

    [theme.breakpoints.down('xs')]: {
      width: theme.spacing(10),
      height: theme.spacing(10),
    },
  },

  leaderCard: {
    height: '100%',
    padding: '1rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    '&:hover': {
      backgroundColor: theme.palette.grey[200],
      boxShadow: theme.shadows[10],
    },
  },
}));

interface Props {
  party: PartyData;
}

const Party: React.FC<Props> = ({ party }) => {
  const classes = useStyles();

  const InformationCard: React.FC = () => (
    <Paper classes={{ root: classes.cardContainer }}>
      <div style={{ marginRight: '1rem' }}>
        <img
          className={classes.partyLogo}
          src={`/static/images/party-logos/${party.abbrev.toLocaleUpperCase()}.svg`}
        />
      </div>
      <div>
        <Typography>
          <strong>Hemsida:</strong>{' '}
          <Link href={party.website} rel="noopener" target="_blank">
            {party.website}
          </Link>
        </Typography>
        <Typography>
          <strong>Ideologi:</strong> {party.ideology.join(', ')}[1]
        </Typography>
      </div>
    </Paper>
  );

  const Leader: React.FC<LeaderType> = ({ id, role, firstName, lastName, pictureUrl }) => {
    return (
      <Grid item md={3} sm={4} xs={6}>
        <NextLink passHref href="/ledamot/[id]" as={`/ledamot/${id}`}>
          <a style={{ textDecoration: 'none' }}>
            <Paper classes={{ root: classes.leaderCard }}>
              <Avatar className={classes.leaderAvatar} src={pictureUrl} />
              <div>
                <Typography variant="subtitle2" component="p">
                  {firstName} {lastName}
                </Typography>
                <Typography>{role}</Typography>
              </div>
            </Paper>
          </a>
        </NextLink>
      </Grid>
    );
  };

  const Leaders: React.FC = () => (
    <Grid container spacing={2} justify="center">
      {party.leaders.map((leader) => (
        <Leader key={leader.sourceId} {...leader} />
      ))}
    </Grid>
  );

  return (
    <>
      <InformationCard />
      <Leaders />
    </>
  );
};

export default Party;
