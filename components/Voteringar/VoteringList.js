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
    state = {
      voteringar: [],
      loading: true,
      next: false,
      nextPage: -1
    };

    componentDidMount() {
      let url = `http://data.riksdagen.se/dokumentlista/?u17=22&doktyp=votering&sort=datum&sortorder=desc&rapport=&utformat=json&a=s&p=${
        this.props.page
      }`;
      this.getPage(url);
    }

    getPage(url) {
      axios({
        method: "get",
        url: url
      }).then(response => {
        this.setState({
          voteringar: response.data.dokumentlista.dokument,
          loading: false,
          nextPage: this.props.page + 1
        });
      });
    }

    render() {
      return (
        <React.Fragment>
          {this.state.loading ? (
            <LoadCircle />
          ) : (
            <React.Fragment>
              <Grid
                className={this.props.classes.listContainer}
                container
                spacing={16}
              >
                {this.state.voteringar.map(votering => (
                  <Grid item xs={12} key={votering.id}>
                    <Votering votering={votering} />
                  </Grid>
                ))}
              </Grid>

              {this.state.next ? (
                <VoteringListContainer page={this.state.nextPage} />
              ) : (
                <div className={this.props.classes.buttonContainer}>
                  <ButtonBase
                    className={this.props.classes.loadMore}
                    onClick={() => this.setState({ next: true })}
                  >
                    Ladda mer
                  </ButtonBase>
                </div>
              )}
            </React.Fragment>
          )}
        </React.Fragment>
      );
    }
  }
);
