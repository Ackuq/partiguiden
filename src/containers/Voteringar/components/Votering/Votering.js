import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, CardHeader, Typography, ButtonBase } from '@material-ui/core';
import { shape, string } from 'prop-types';
import Link from 'next/link';

import { apiLinks } from '../../../../utils';
import VoteringResult from '../VoteringResult';
import { getVotering } from '../../lib';
import getOrganInfo from '../../../../utils/authorityTable';
import styles from './styles';

const useStyles = makeStyles(styles);

const Votering = ({ votering: { id, beteckning, tempbeteckning, titel, organ } }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [votes, setVotes] = useState({});
  const [rubrik, setRubrik] = useState('');

  const organObject = getOrganInfo(organ);
  const dokId = `${id.substring(0, 2)}01${beteckning.split('p')[0]}`;

  let mounted = true;

  const url = `${apiLinks.riksdagenApi}/dokumentstatus/${dokId}.json`;

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
        <Link
          href={`/votering?id=${dokId}&bet=${tempbeteckning}`}
          as={`/votering/${dokId}/${tempbeteckning}`}
        >
          <ButtonBase style={{ width: '100%' }}>
            <Card elevation={1} style={{ flex: 1 }}>
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
                  {rubrik}
                </Typography>
              </CardContent>

              <VoteringResult votes={votes} />
            </Card>
          </ButtonBase>
        </Link>
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
