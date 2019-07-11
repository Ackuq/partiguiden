import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, CardHeader, Typography, ButtonBase } from '@material-ui/core';
import { shape, string } from 'prop-types';
import Router from 'next/router';

import { apiLinks, getAuthorityInfo } from '../../../../utils';
import VoteResult from '../VoteResult';
import fetchVote from './fetchVote';
import styles from './styles';

const useStyles = makeStyles(styles);

const Vote = ({ votering: { id, beteckning, tempbeteckning, titel, organ } }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState({});
  const [title, setTitle] = useState('');

  const authority = getAuthorityInfo(organ);
  const docId = `${id.substring(0, 2)}01${beteckning.split('p')[0]}`;

  let mounted = true;

  const url = `${apiLinks.riksdagenApi}/dokumentstatus/${docId}.json`;

  useEffect(() => {
    fetchVote({ url, tempbeteckning }).then(result => {
      if (mounted && result) {
        setVotes(result.maxVotes);
        setTitle(result.rubrik);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return !loading && authority ? (
    <Card elevation={1} style={{ flex: 1 }}>
      <ButtonBase
        style={{ display: 'block' }}
        href={`/votering/${docId}/${tempbeteckning}`}
        component="a"
        onClick={event => {
          event.preventDefault();
          Router.push(`/votering/${docId}/${tempbeteckning}`);
        }}
      >
        <CardHeader
          title={authority.desc}
          style={{ background: authority.color }}
          classes={{
            title: classes.headerTitle,
            root: classes.headerRoot,
          }}
        />
        <CardContent>
          <Typography
            variant="h3"
            color="textSecondary"
            align="left"
            gutterBottom
            classes={{ h3: classes.title }}
          >
            {titel}
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            align="left"
            classes={{ h6: classes.subtitle }}
          >
            {title}
          </Typography>
        </CardContent>

        <VoteResult votes={votes} />
      </ButtonBase>
    </Card>
  ) : null;
};

Vote.propTypes = {
  votering: shape({
    id: string.isRequired,
    beteckning: string.isRequired,
    tempbeteckning: string.isRequired,
    titel: string.isRequired,
    organ: string.isRequired,
  }).isRequired,
};

export default Vote;
