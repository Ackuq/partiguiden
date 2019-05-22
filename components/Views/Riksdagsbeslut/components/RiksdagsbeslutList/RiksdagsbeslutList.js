import React, { useState, useEffect } from 'react';
/* Material ui components */
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import RiksdagsListContainer from './RiksdagsbeslutListContainer';
import Riksdagsbeslut from '../Riksdagsbeslut/Riksdagsbeslut';
import LoadCircle from '../../../../LoadCircle';

import { useStateValue } from '../../../../../lib/stateProvider';

import styles from './styles';

const RiksdagsList = ({ classes, page }) => {
  const [beslut, setBeslut] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(true);
  const [next, setNext] = useState(false);
  const { filter } = useStateValue()[0];

  const getPage = () => {
    const { rm, search } = filter;

    const org = filter.org.join('&org=');

    const url = `https://data.riksdagen.se/dokumentlista/?sok=${search}&doktyp=bet&org=${org}&rm=${rm}&dokstat=beslutade&sort=beslutsdag&sortorder=desc&utformat=json&p=${page}`;

    axios({
      method: 'get',
      url
    }).then(response => {
      const { dokumentlista } = response.data;

      const pages = parseInt(dokumentlista['@sidor'], 10);

      // eslint-disable-next-line eqeqeq
      setLastPage(parseInt(page, 10) === pages || pages === 0);
      setBeslut(dokumentlista.dokument);
      setLoading(false);
    });
  };

  useEffect(() => getPage(), [filter]);

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
