import React, { useState, useEffect } from 'react';
/* Material ui components */
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';

// eslint-disable-next-line import/no-cycle
import RiksdagsListContainer from './RiksdagsbeslutListContainer';
import Riksdagsbeslut from '../Riksdagsbeslut/Riksdagsbeslut';
import LoadCircle from '../../../../LoadCircle';
import { getRiksdagsBeslutList } from '../../lib';
import { useStateValue } from '../../../../../lib/stateProvider';

import styles from './styles';

const RiksdagsList = ({ classes, page }) => {
  const [beslut, setBeslut] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(true);
  const [next, setNext] = useState(false);
  const { filter } = useStateValue()[0];

  useEffect(() => {
    let mounted = true;
    const { search } = filter;
    const org = filter.org.join('&org=');
    const url = `https://data.riksdagen.se/dokumentlista/?sok=${search}&doktyp=bet&org=${org}&dokstat=beslutade&sort=datum&sortorder=desc&utformat=json&p=${page}`;

    getRiksdagsBeslutList({ url, page }).then(res => {
      if (mounted) {
        setBeslut(res.beslut);
        setLastPage(res.lastPage);
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
        <LoadCircle />
      ) : (
        <React.Fragment>
          <Grid className={classes.listContainer} container spacing={16}>
            {beslut &&
              beslut.map(beslutObject => (
                <Grid item xs={12} key={beslutObject.dok_id}>
                  <Riksdagsbeslut beslut={beslutObject} />
                </Grid>
              ))}
          </Grid>
          {!lastPage && (
            <React.Fragment>
              {next ? (
                <RiksdagsListContainer page={page + 1} />
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

export default withStyles(styles)(RiksdagsList);
