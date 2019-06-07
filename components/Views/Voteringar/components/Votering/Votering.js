import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';

/* Material UI */
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

/* Custom components */
import axios from 'axios';
import { parseString } from 'xml2js';
// eslint-disable-next-line import/no-cycle
import { VoteringResult } from '..';

/* Functions */
import getOrganInfo from '../../../../../lib/authorityTable';
import { getMaxVotes, getVotes } from '../../lib';

import { Link } from '../../../../../lib/routes';

import styles from './styles';

// eslint-disable-next-line camelcase
const Votering = ({ classes, votering: { id, beteckning, kall_id, tempbeteckning, titel } }) => {
  const [organ, setOrgan] = useState(null);
  const [votes, setVotes] = useState({});
  const [rubrik, setRubrik] = useState('');

  useEffect(() => {
    const newBet = beteckning.split('p')[0];

    const bet = `${id.substring(0, 2)}01${newBet}`;

    const fetchData = async () => {
      axios({
        method: 'get',
        url: `https://data.riksdagen.se/dokumentstatus/${bet}.xml`
      })
        .then(response => {
          parseString(response.data, (err, result) => {
            const { dokumentstatus } = result;
            const { utskottsforslag } = dokumentstatus.dokutskottsforslag[0];
            const voteringObject = Array.isArray(utskottsforslag)
              ? utskottsforslag[tempbeteckning - 1]
              : utskottsforslag;
            const { table } = voteringObject.votering_sammanfattning_html[0];
            const tableRow = Array.isArray(table) ? table[table.length - 1].tr : table.tr;

            setRubrik(voteringObject.rubrik[0]);
            setVotes(getMaxVotes(getVotes(tableRow)));
            setOrgan(getOrganInfo(dokumentstatus.dokument[0].organ[0]));
          });
        })
        .catch(thrown => {
          if (axios.isCancel(thrown)) {
            // eslint-disable-next-line no-console
            console.log('Request canceled', thrown.message);
          }
        });
    };
    fetchData();
  }, []);

  return (
    <React.Fragment>
      {organ && (
        <Card elevation={1}>
          <Link
            route="votering"
            params={{
              id: kall_id,
              bet: tempbeteckning
            }}
          >
            <a>
              <CardHeader
                title={organ.desc}
                style={{ background: organ.color }}
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
