import React from 'react';

import NextLink from 'next/link';

import { Avatar, Divider, Grid, Link, Paper, Typography, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import * as ROUTES from '../lib/routes';

import { Leader as LeaderType } from '../types/member';
import { PartyData } from '../types/party';

const useStyles = makeStyles((theme: Theme) => ({
  cardContainer: {
    padding: '1rem',
    marginBottom: theme.spacing(4),
  },

  informationDivider: {
    marginTop: '0.5rem',
    marginBottom: '0.5rem',
  },

  biography: {
    '& p': {
      marginTop: '0.5em',
      marginBottom: '0.5em',
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
    boxShadow: theme.shadows[2],
    '&:hover': {
      backgroundColor:
        theme.palette.type === 'dark' ? theme.palette.grey[700] : theme.palette.grey[200],
      boxShadow: theme.shadows[10],
    },
  },
  leadersContainer: {
    padding: '1rem',
  },
}));

interface Props {
  party: PartyData;
}

const Party: React.FC<Props> = ({ party }) => {
  const classes = useStyles();

  const InformationCard: React.FC = () => (
    <Paper classes={{ root: classes.cardContainer }}>
      <div>
        <Typography variant="h5">Hemsida</Typography>
        <Typography>
          <Link href={party.website} rel="noopener" target="_blank">
            {party.website}
          </Link>
        </Typography>
      </div>
      <Divider className={classes.informationDivider} />
      <div>
        <Typography variant="h5">Ideologi</Typography>
        <Typography>{party.ideology.join(', ')}</Typography>
        <Typography component="p" variant="caption">
          Källa:{' '}
          <Link href="https://www.wikipedia.org/" rel="noopener" target="_blank">
            https://www.wikipedia.org/
          </Link>
        </Typography>
      </div>
      <Divider className={classes.informationDivider} />
      <div>
        <Typography variant="h5">Biografi</Typography>
        <Typography component="div" variant="body2">
          <div dangerouslySetInnerHTML={{ __html: party.abstract }} className={classes.biography} />
        </Typography>
        <Typography component="p" variant="caption">
          Källa:{' '}
          <Link href="https://www.wikipedia.org/" rel="noopener" target="_blank">
            https://www.wikipedia.org/
          </Link>
        </Typography>
      </div>
    </Paper>
  );

  const Leader: React.FC<LeaderType> = ({ id, role, firstName, lastName, pictureUrl }) => {
    return (
      <Grid item md={3} sm={4} xs={6}>
        <NextLink passHref href={ROUTES.MEMBER} as={ROUTES.getMemberHref(id)}>
          <a style={{ textDecoration: 'none' }}>
            <Paper classes={{ root: classes.leaderCard }} elevation={0}>
              <Avatar
                className={classes.leaderAvatar}
                src={pictureUrl}
                alt={`${firstName} ${lastName}`}
              />
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
    <Paper classes={{ root: classes.leadersContainer }}>
      <Typography gutterBottom variant="h4" align="center">
        Ledning
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {party.leaders.map((leader) => (
          <Leader key={leader.sourceId} {...leader} />
        ))}
      </Grid>
    </Paper>
  );

  return (
    <>
      <InformationCard />
      <Leaders />
    </>
  );
};

export default Party;
