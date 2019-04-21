import Link from "next/link";

/* Material UI components */
import Collapse from "@material-ui/core/Collapse";
import ButtonBase from "@material-ui/core/ButtonBase";
import Grid from "@material-ui/core/Grid";
import grey from "@material-ui/core/colors/grey";
import { withStyles } from "@material-ui/core/styles";

/* Custom components */
import PartyOpinion from "./PartyOpinion";

const subjectStyles = theme => ({
  partyStandpoint: {
    marginBottom: "2rem",
    marginTop: "2rem",
    "& h3": {
      marginBottom: "0.5rem",
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
    backgroundColor: grey[100],
    "&:hover": {
      backgroundColor: grey[200]
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

    render() {
      const { party, classes } = this.props;
      return (
        <React.Fragment>
          {party.data && (
            <div
              key={`${party.name}`}
              id={`${party.name}`}
              className={classes.partyStandpoint}
            >
              <ButtonBase
                onClick={this.handleClick}
                classes={{ root: classes.partyTitle }}
              >
                <h3>{party.name}</h3>
              </ButtonBase>
              <Collapse
                in={this.state.visible}
                classes={{ container: classes.collapse }}
              >
                <Grid container spacing={16} style={{ marginTop: "0.5rem" }}>
                  {party.data.map(subject => (
                    <PartyOpinion
                      subject={subject}
                      partyName={party.name}
                      key={`${party.name}${subject.name}`}
                    />
                  ))}
                </Grid>
              </Collapse>
            </div>
          )}
        </React.Fragment>
      );
    }
  }
);
