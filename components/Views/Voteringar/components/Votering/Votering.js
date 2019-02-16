import React, { useState, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';

/* Material UI */
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

/* Custom components */
import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import { VoteringResult } from '..';

/* Functions */
import getOrganInfo from '../../../../../lib/authorityTable';
import getVotes from '../../../Votering/lib/getVotes';
import getMaxVotes from '../../lib';

import { Link } from '../../../../../lib/routes';

import styles from './styles';

// eslint-disable-next-line camelcase
const Votering = ({ classes, votering: { id, beteckning, kall_id, tempbeteckning, titel } }) => {
  const [organ, setOrgan] = useState(null);
  const [votes, setVotes] = useState({});
  const [rubrik, setRubrik] = useState('');

  useEffect(() => {
    const bet = `${id.substring(0, 2)}01${beteckning}`;
    const fetchData = async () => {
      axios({
        method: 'get',
        url: `https://data.riksdagen.se/dokumentstatus/${bet}.json`
      }).then(response => {
        if (typeof response.data === 'string') return;

        const { dokumentstatus } = response.data;
        const { utskottsforslag } = dokumentstatus.dokutskottsforslag;

        const voteringObject = Array.isArray(utskottsforslag)
          ? utskottsforslag[tempbeteckning - 1]
          : utskottsforslag;

        const { table } = voteringObject.votering_sammanfattning_html;
        const tableRow = Array.isArray(table) ? table[table.length - 1].tr : table.tr;

        setRubrik(voteringObject.rubrik);
        setVotes(getMaxVotes(getVotes(tableRow)));
        setOrgan(getOrganInfo(dokumentstatus.dokument.organ));
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
