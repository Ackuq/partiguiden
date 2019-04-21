/* Material ui components */
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";

import RiksdagsListContainer from "./index";
import Riksdagsbeslut from "./Riksdagsbeslut";
import LoadCircle from "../LoadCircle";

import axios from "axios";

const riksdagsbeslutList = theme => ({
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
    marginBottom: "1rem"
  },
  loadMore: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: "1rem",
    height: "2rem",
    padding: "0 2rem"
  },
  listContainer: {
    marginBottom: "0.5rem"
  }
});

export default withStyles(riksdagsbeslutList)(
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

    componentDidUpdate(prevProps, prevState) {
      if (prevState.asPath !== this.state.asPath) {
        this.getPage();
      }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.asPath !== prevState.asPath) {
        return { asPath: nextProps.asPath, query: nextProps.query, page: 1 };
      } else return null;
    }

    componentDidMount() {
      this.getPage();
    }

    getPage() {
      const { page } = this.state;
      const url = `https://data.riksdagen.se/dokumentlista/?u17=22%2c22&avd=dokument&doktyp=bet&beslutad=1&sort=beslutsdag&sortorder=desc&utformat=json&p=${page}`;

      axios({
        method: "get",
        url: url
      }).then(response => {
        const { dokumentlista } = response.data;
        const lastPage = page == dokumentlista["@sidor"] ? true : false;
        this.setState({
          beslut: dokumentlista.dokument,
          loading: false,
          lastPage: lastPage
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
                {beslut.map(beslut => (
                  <Grid item xs={12} key={beslut.notisrubrik}>
                    <Riksdagsbeslut beslut={beslut} />
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
