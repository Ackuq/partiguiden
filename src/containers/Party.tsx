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
  },

  partyLogo: {
    height: 150,
  },

  [theme.breakpoints.down('md')]: {
    partyLogo: {
      height: 125,
    },
  },

  [theme.breakpoints.down('sm')]: {
    partyLogo: {
      height: 100,
    },
  },

  leaderAvatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },

  leaderCard: {
    padding: '1rem',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
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
      <Grid item>
        <NextLink passHref href="/ledamot/[id]" as={`/ledamot/${id}`}>
          <a style={{ textDecoration: 'none' }}>
            <Paper classes={{ root: classes.leaderCard }}>
              <div>
                <Avatar className={classes.leaderAvatar} src={pictureUrl} />
              </div>
              <div style={{ marginTop: 5 }}>
                <Typography variant="subtitle2">
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
    <Grid style={{ marginTop: '0.75rem' }} container spacing={5}>
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
