/* Material ui components */
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";

import VoteringListContainer from "./VoteringListContainer";
import Votering from "./Votering";
import LoadCircle from "../LoadCircle";

import axios from "axios";

const voteringarStyles = theme => ({
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

export default withStyles(voteringarStyles)(
  class Voteringar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        voteringar: [],
        loading: true,
        next: false,
        nextPage: props.page + 1,
        lastPage: true,
        page: props.page,
        asPath: props.asPath,
        query: props.query
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
      const { page } = this.props;
      let { bet, rm, num, org } = this.state.query;

      bet = bet ? bet : "";
      rm = rm ? rm : "";
      num = num ? num : "";
      org = org ? org : "";

      const url = `https://data.riksdagen.se/dokumentlista/?doktyp=votering&rm=${rm}&bet=${bet}&nr=${num}&org=${org}&sort=datum&sortorder=desc&utformat=json&a=s&p=${page}`;

      axios({
        method: "get",
        url: url
      }).then(response => {
        const { dokumentlista } = response.data;
        const lastPage = page == dokumentlista["@sidor"] ? true : false;
        this.setState({
          voteringar: dokumentlista.dokument,
          loading: false,
          lastPage: lastPage
        });
      });
    }

    render() {
      const {
        loading,
        nextPage,
        lastPage,
        voteringar,
        next,
        query,
        asPath
      } = this.state;
      const { classes } = this.props;
      return (
        <React.Fragment>
          {this.state.loading ? (
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
                    <VoteringListContainer
                      query={query}
                      asPath={asPath}
                      page={nextPage}
                    />
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
