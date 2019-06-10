import React, { useState, useEffect } from 'react';
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
import { getVoteringList } from '../../lib';

import styles from './styles';

const Voteringar = ({ classes, asPath, query, page }) => {
  const [next, setNext] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastPage, setLastPage] = useState(true);
  const [voteringar, setVoteringar] = useState([]);
  const { filter } = useStateValue()[0];

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    const { search } = filter;
    const org = filter.org.join('&org=');
    const url = `https://data.riksdagen.se/dokumentlista/?sok=${search}&doktyp=votering&org=${org}&sort=datum&sortorder=desc&utformat=json&a=s&p=${page}`;
    getVoteringList({ page, url }).then(result => {
      if (mounted) {
        setLastPage(result.lastPage);
        setVoteringar(result.voteringar || []);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [filter]);

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
