import React, { useState, useEffect } from 'react';
/* Material ui components */
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import VoteringListContainer from './VoteringListContainer';
// eslint-disable-next-line import/no-cycle
import { Votering } from '..';
import LoadCircle from '../../../../LoadCircle';
import { useStateValue } from '../../../../../lib/stateProvider';

import styles from './styles';

const Voteringar = ({ classes, asPath, query, page }) => {
  const [next, setNext] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastPage, setLastPage] = useState(true);
  const [voteringar, setVoteringar] = useState(null);
  const { filter } = useStateValue()[0];

  const getPage = () => {
    setLoading(true);
    let { bet, rm, num, org } = query;

    bet = bet || '';
    rm = rm || '';
    num = num || '';
    if (org) {
      org = org || '';
    } else {
      org = filter.org.join('&org=');
    }

    const url = `https://data.riksdagen.se/dokumentlista/?doktyp=votering&rm=${rm}&bet=${bet}&nr=${num}&org=${org}&sort=datum&sortorder=desc&utformat=json&a=s&p=${page}`;

    axios({
      method: 'get',
      url
    }).then(response => {
      const { dokumentlista } = response.data;

      setLastPage(parseInt(page, 10) === parseInt(dokumentlista['@sidor'], 10));
      setVoteringar(dokumentlista.dokument);
      setLoading(false);
    });
  };

  useEffect(getPage, [filter]);

  return (
    <React.Fragment>
      {loading ? (
        <LoadCircle />
      ) : (
        <React.Fragment>
          <Grid className={classes.listContainer} container spacing={16}>
            {voteringar.map(votering => (
              <Grid item xs={12} key={votering.id}>
                <Votering votering={votering} />
              </Grid>
            ))}
          </Grid>
          {!lastPage && (
            <React.Fragment>
              {next ? (
                <VoteringListContainer query={query} asPath={asPath} page={page + 1} />
              ) : (
                <div className={classes.buttonContainer}>
                  <ButtonBase className={classes.loadMore} onClick={() => setNext(true)}>
                    Ladda mer
                  </ButtonBase>
                </div>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default withStyles(styles)(Voteringar);
