import React, { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';
/* Material ui components */
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';

import Ad from 'react-google-publisher-tag';

// eslint-disable-next-line import/no-cycle
import VoteringListContainer from './VoteringListContainer';
// eslint-disable-next-line import/no-cycle
import { Votering } from '..';
import PlaceholderCards from '../../../../PlaceholderCards';
import { useStateValue } from '../../../../../lib/stateProvider';

import styles from './styles';

const Voteringar = ({ classes, asPath, query, page }) => {
  const [next, setNext] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastPage, setLastPage] = useState(true);
  const { filter } = useStateValue()[0];
  const [loadedVoteringar, setLoadedVoteringar] = useState([]);

  const loadVoteringar = voteringar => {
    const loaded = [];
    if (voteringar) {
      voteringar.map(votering =>
        loaded.push(
          <Grid item xs={12} key={votering.id}>
            <Votering votering={votering} />
          </Grid>
        )
      );
    }
    setLoadedVoteringar(loaded);
  };

  const getPage = () => {
    setLoading(true);

    const { num, rm, bet, search } = filter;

    const org = filter.org.join('&org=');
    const url = `https://data.riksdagen.se/dokumentlista/?sok=${search}&doktyp=votering&rm=${rm}&bet=${bet}&nr=${num}&org=${org}&sort=datum&sortorder=desc&utformat=json&a=s&p=${page}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const { dokumentlista } = data;
        const pages = parseInt(dokumentlista['@sidor'], 10);

        setLastPage(parseInt(page, 10) === pages || pages === 0);
        loadVoteringar(dokumentlista.dokument);
        setLoading(false);
      });
  };

  useEffect(getPage, [filter]);

  return (
    <React.Fragment>
      {loading ? (
        <PlaceholderCards />
      ) : (
        <React.Fragment>
          <div className="responsive-ad">
            <Ad canBeLower={false} path="/21821978280/responsive-ad" />
          </div>
          <Grid className={classes.listContainer} container spacing={16}>
            {loadedVoteringar}
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
