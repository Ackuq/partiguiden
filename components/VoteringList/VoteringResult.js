import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const voteringResult = theme => ({
  votering: {
    display: "flex",
    "& .box": {
      padding: "0.25rem"
    }
  },
  parties: {
    display: "flex",
    justifyContent: "center",
    "& h6": {
      padding: "0.25rem"
    },
    "& img": {
      height: "30px"
    }
  }
});

export default withStyles(voteringResult)(
  class Votering extends React.Component {
    state = {
      total: 0,
      ja: [],
      nej: []
    };

    renderParty(key) {
      if (this.props.data[key]) {
        this.state.ja.push(key);
      } else {
        this.state.nej.push(key);
      }
    }

    render() {
      let votering = this.props.votering;
      const bgYes = this.props.total
        ? { backgroundColor: "#c8e6c9" }
        : { backgroundColor: "#e0e0e0" };

      const bgNo = this.props.total
        ? { backgroundColor: "#e0e0e0" }
        : { backgroundColor: "#ffcdd2" };
      return (
        <Grid
          container
          spacing={16}
          className={`${this.props.classes.votering} ${this.props.total}`}
        >
          {Object.keys(this.props.data).forEach(key => this.renderParty(key))}

          <Grid item sm={6} xs={12}>
            <Card className="box" style={bgYes}>
              <Typography align="center" variant="h5" gutterBottom>
                JA
              </Typography>
              <div className={this.props.classes.parties}>
                {this.state.ja.map(party => (
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    key={`${votering.titel}${party}`}
                  >
                    <img src={`../static/images/party-logos/${party}.svg`} />
                  </Typography>
                ))}
              </div>
            </Card>
          </Grid>

          <Grid item sm={6} xs={12}>
            <Card className="box" style={bgNo}>
              <Typography align="center" variant="h5" gutterBottom>
                NEJ
              </Typography>
              <div className={this.props.classes.parties}>
                {this.state.nej.map(party => (
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    key={`${votering.titel}${party}`}
                  >
                    <img src={`../static/images/party-logos/${party}.svg`} />
                  </Typography>
                ))}
              </div>
            </Card>
          </Grid>
        </Grid>
      );
    }
  }
);
