/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';

/* Material UI */
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// eslint-disable-next-line import/no-cycle
import VoteringResult from '../VoteringResult';

import { getVotering } from '../../lib';
import getOrganInfo from '../../../../../lib/authorityTable';
import { Link } from '../../../../../lib/routes';
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
        <Card elevation={1}>
          <Link
            route="votering"
            params={{
              id: dokId,
              bet: tempbeteckning
            }}
          >
            <a>
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
            </a>
          </Link>
          <VoteringResult votes={votes} />
        </Card>
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(Votering);
