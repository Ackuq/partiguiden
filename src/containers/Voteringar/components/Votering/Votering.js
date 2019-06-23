/* eslint-disable camelcase */
import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { shape, string } from 'prop-types';

import ApiContext from '../../../../lib/ApiContext';
import VoteringResult from '../VoteringResult';
import { getVotering } from '../../lib';
import getOrganInfo from '../../../../utils/authorityTable';
import { Router } from '../../../../lib/routes';
import styles from './styles';

const useStyles = makeStyles(styles);

const Votering = ({ votering: { id, beteckning, tempbeteckning, titel, organ } }) => {
  const { riksdagenApi } = useContext(ApiContext);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState({});
  const [rubrik, setRubrik] = useState('');

  const organObject = getOrganInfo(organ);
  const dokId = `${id.substring(0, 2)}01${beteckning.split('p')[0]}`;

  let mounted = true;

  const url = `${riksdagenApi}/dokumentstatus/${dokId}.json`;

  useEffect(() => {
    getVotering({ url, tempbeteckning }).then(result => {
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

Votering.propTypes = {
  votering: shape({
    id: string.isRequired,
    beteckning: string.isRequired,
    tempbeteckning: string.isRequired,
    titel: string.isRequired,
    organ: string.isRequired
  }).isRequired
};

export default Votering;
