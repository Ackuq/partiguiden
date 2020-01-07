import React, { useState, useEffect } from 'react';
import Router from 'next/router';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import { apiLinks, getAuthorityInfo } from '../../../utils';
import VoteResult from './VoteResult';
import fetchVote from './fetchVote';

interface Props {
  votering: {
    id: string;
    beteckning: string;
    tempbeteckning: string;
    titel: string;
    organ: string;
  };
  classes: any;
}

const Vote: React.FC<Props> = ({
  votering: { id, beteckning, tempbeteckning, titel, organ },
  classes,
}) => {
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
          Router.push('/votering/[id]/[bet]', `/votering/${docId}/${tempbeteckning}`);
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

        <VoteResult votes={votes} classes={classes} />
      </ButtonBase>
    </Card>
  ) : null;
};

export default Vote;
