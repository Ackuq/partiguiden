/* Material ui components */
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";

import RiksdagsListContainer from "./RiksdagsbeslutListContainer";
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
    state = {
      beslut: [],
      loading: true,
      next: false,
      nextPage: -1
    };

    componentDidMount() {
      var url = `http://data.riksdagen.se/dokumentlista/?u17=22%2c22&avd=dokument&doktyp=bet&beslutad=1&sort=beslutsdag&sortorder=desc&utformat=json&p=${
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
          beslut: response.data.dokumentlista.dokument,
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
                {this.state.beslut.map(beslut => (
                  <Grid item xs={12} key={beslut.notisrubrik}>
                    <Riksdagsbeslut beslut={beslut} />
                  </Grid>
                ))}
              </Grid>

              {this.state.next ? (
                <RiksdagsListContainer page={this.state.nextPage} />
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
