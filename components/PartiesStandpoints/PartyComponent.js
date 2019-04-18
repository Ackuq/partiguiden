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
      const { data, name } = this.props.party;
      return (
        <React.Fragment>
          {data && (
            <div
              key={`${name}`}
              id={`${name}`}
              className={this.props.classes.partyStandpoint}
            >
              <ButtonBase
                onClick={this.handleClick}
                classes={{ root: this.props.classes.partyTitle }}
              >
                <h3>{name}</h3>
              </ButtonBase>
              <Collapse
                in={this.state.visible}
                classes={{ container: this.props.classes.collapse }}
              >
                <Grid container spacing={16} style={{ marginTop: "0.5rem" }}>
                  {data.map(subject => (
                    <PartyOpinion
                      subject={subject}
                      partyName={name}
                      key={`${name}${subject.name}`}
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
