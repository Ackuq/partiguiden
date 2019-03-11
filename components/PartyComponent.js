import Link from "next/link";

/* Material UI components */
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

const subjectStyles = theme => ({
  partyStandpoint: {
    marginBottom: "1.5rem",
    marginTop: "0.5rem",
    "& h3": {
      marginTop: "0.5rem"
    },
    "& li": {
      fontSize: "1.125rem",
      listStyle: "none",
      position: "relative"
    },
    "& li + li": {
      marginTop: "0.75rem"
    },
    "& ul": {
      paddingLeft: "1rem"
    }
  },
  partyTitle: {
    width: "100%",
    borderRadius: "3rem",
    textAlign: "center",
    padding: "0.5rem 0",
    backgroundColor: "#ffffff",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.08)"
    }
  },
  collapse: {
    paddingLeft: "0.5rem",
    paddingRight: "0.5rem"
  }
});

export default withStyles(subjectStyles)(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = { visible: false };
      this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
      this.setState({
        visible: !this.state.visible
      });
    }

    renderInfo(data) {
      return (
        <Grid item xs={12} key={`${this.props.party.name}${data.name}`}>
          <Card>
            <CardContent>
              <Typography variant="h5" color="textSecondary" gutterBottom>
                {data.name}
              </Typography>
              <ul>
                {data.opinions.map((opinion, index) => (
                  <li
                    className="partyOpinions"
                    key={`${this.props.party.name}${data.name}${index}`}
                  >
                    <Typography variant="body1">{opinion}</Typography>
                  </li>
                ))}
              </ul>
              <Button component="div">
                <Link href={`${data.url}`}>
                  <a target="_blank" className="d-flex p-1 m-1">
                    Läs mer på partiets hemsida
                  </a>
                </Link>
              </Button>
            </CardContent>
          </Card>
        </Grid>
      );
    }

    render() {
      const data = this.props.party.data;
      return (
        <React.Fragment>
          {data && (
            <div
              key={`${this.props.party.name}`}
              id={`${this.props.party.name}`}
              className={this.props.classes.partyStandpoint}
            >
              <ButtonBase
                onClick={this.handleClick}
                classes={{ root: this.props.classes.partyTitle }}
              >
                <h3>{this.props.party.name}</h3>
              </ButtonBase>
              <Collapse
                in={this.state.visible}
                classes={{ container: this.props.classes.collapse }}
              >
                <Grid container spacing={16} style={{ marginTop: "0.5rem" }}>
                  {this.props.party.data.map(subject =>
                    this.renderInfo(subject)
                  )}
                </Grid>
              </Collapse>
            </div>
          )}
        </React.Fragment>
      );
    }
  }
);
