import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const voteringResult = theme => ({
  votering: {
    display: "flex",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column"
    },
    "& .box": {
      backgroundColor: "#e0e0e0",
      borderRadius: "0.5rem",
      padding: "0.5rem",
      display: "flex",
      flex: 1,
      flexDirection: "column",
      textAlign: "center"
    },

    "& .box:nth-child(2n + 1)": {
      [theme.breakpoints.down("xs")]: {
        marginLeft: "1rem",
        marginBottom: "1rem"
      },
      marginRight: "1rem"
    },

    "& .box:nth-child(2n)": {
      [theme.breakpoints.down("xs")]: {
        marginRight: "1rem"
      },
      marginLeft: "1rem"
    },

    "&.yes .box:nth-child(2n + 1)": {
      backgroundColor: "#c8e6c9"
    },

    "&.no .box:nth-child(2n)": {
      backgroundColor: "#ffcdd2"
    }
  },
  parties: {
    display: "flex",
    justifyContent: "center",
    "& h6": {
      padding: "0.25rem"
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
      return (
        <div className={`${this.props.classes.votering} ${this.props.total}`}>
          {Object.keys(this.props.data).forEach(key => this.renderParty(key))}

          <div className="box">
            <Typography variant="h5">JA</Typography>
            <div className={this.props.classes.parties}>
              {this.state.ja.map(party => (
                <Typography
                  variant="h6"
                  color="textSecondary"
                  key={`${votering.titel}${party}`}
                >
                  {party}
                </Typography>
              ))}
            </div>
          </div>

          <div className="box">
            <Typography variant="h5">NEJ</Typography>
            <div className={this.props.classes.parties}>
              {this.state.nej.map(party => (
                <Typography
                  variant="h6"
                  color="textSecondary"
                  key={`${votering.titel}${party}`}
                >
                  {party}
                </Typography>
              ))}
            </div>
          </div>
        </div>
      );
    }
  }
);
