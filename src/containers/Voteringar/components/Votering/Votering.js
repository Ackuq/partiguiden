/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';

import VoteringResult from '../VoteringResult';
import { getVotering } from '../../lib';
import getOrganInfo from '../../../../utils/authorityTable';
import { Router } from '../../../../lib/routes';
import styles from './styles';

// eslint-disable-next-line camelcase
const Votering = ({ classes, votering: { id, beteckning, tempbeteckning, titel, organ } }) => {
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState({});
  const [rubrik, setRubrik] = useState('');

  const organObject = getOrganInfo(organ);
  const dokId = `${id.substring(0, 2)}01${beteckning.split('p')[0]}`;

  let mounted = true;

  useEffect(() => {
    getVotering({ dokId, tempbeteckning }).then(result => {
      if (mounted && result) {
        setVotes(result.maxVotes);
        setRubrik(result.rubrik);
        setLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <React.Fragment>
      {!loading && organObject && (
        <Card
          elevation={1}
          style={{ cursor: 'pointer' }}
          onClick={() =>
            Router.pushRoute('votering', {
              id: dokId,
              bet: tempbeteckning
            })
          }
        >
          <CardHeader
            title={organObject.desc}
            style={{ background: organObject.color }}
            classes={{
              title: classes.headerTitle,
              root: classes.headerRoot
            }}
          />

          <CardContent>
            <Typography
              variant="h3"
              color="textSecondary"
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
              {rubrik}
            </Typography>
          </CardContent>
          <VoteringResult votes={votes} />
        </Card>
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(Votering);
