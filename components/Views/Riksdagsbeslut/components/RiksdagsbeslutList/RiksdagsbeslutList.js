import React from 'react';
/* Material ui components */
import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';

import axios from 'axios';
// eslint-disable-next-line import/no-cycle
import RiksdagsListContainer from './RiksdagsbeslutListContainer';
import Riksdagsbeslut from '../Riksdagsbeslut/Riksdagsbeslut';
import LoadCircle from '../../../../LoadCircle';

import styles from './styles';

export default withStyles(styles)(
  class RiksdagsList extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        beslut: [],
        loading: true,
        next: false,
        lastPage: true,
        nextPage: props.page + 1,
        page: props.page,
        query: props.query,
        asPath: props.asPath
      };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.asPath !== prevState.asPath) {
        return { asPath: nextProps.asPath, query: nextProps.query, page: 1 };
      }
      return null;
    }

    componentDidMount() {
      this.getPage();
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.asPath !== this.state.asPath) {
        this.getPage();
      }
    }

    getPage() {
      const { page } = this.state;
      const url = `https://data.riksdagen.se/dokumentlista/?u17=22%2c22&avd=dokument&doktyp=bet&beslutad=1&sort=beslutsdag&sortorder=desc&utformat=json&p=${page}`;

      axios({
        method: 'get',
        url
      }).then(response => {
        const { dokumentlista } = response.data;
        const lastPage = page === dokumentlista['@sidor'];
        this.setState({
          beslut: dokumentlista.dokument,
          loading: false,
          lastPage
        });
      });
    }

    render() {
      const { loading, beslut, next, nextPage, lastPage } = this.state;
      const { classes } = this.props;
      return (
        <React.Fragment>
          {loading ? (
            <LoadCircle />
          ) : (
            <React.Fragment>
              <Grid className={classes.listContainer} container spacing={16}>
                {beslut.map(beslutObject => (
                  <Grid item xs={12} key={beslutObject.notisrubrik}>
                    <Riksdagsbeslut beslut={beslutObject} />
                  </Grid>
                ))}
              </Grid>
              {!lastPage && (
                <React.Fragment>
                  {next ? (
                    <RiksdagsListContainer page={nextPage} />
                  ) : (
                    <div className={classes.buttonContainer}>
                      <ButtonBase
                        className={classes.loadMore}
                        onClick={() => this.setState({ next: true })}
                      >
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
    }
  }
);
