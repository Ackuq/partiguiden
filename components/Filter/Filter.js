import { withStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import grey from "@material-ui/core/colors/grey";
import Card from "@material-ui/core/Card";

/* Import icon */
import FilterIcon from "@material-ui/icons/FilterList";

import FilterScreen from "./FilterScreen";

const filterStyles = theme => ({
  filterContainer: {
    position: "fixed",
    bottom: "1rem",
    left: "1rem",
    borderRadius: "2rem",
    zIndex: 999
  },
  icon: {
    fontSize: "3rem"
  },
  buttonContainer: {
    minWidth: "0",
    height: "4rem",
    width: "4rem",
    borderRadius: "2rem",
    background: grey[100],
    "&:hover": {
      background: grey[200]
    }
  }
});

export default withStyles(filterStyles)(
  class Filter extends React.Component {
    state = {
      showFilterScreen: false
    };
    render() {
      const { showFilterScreen } = this.state;
      const { classes } = this.props;
      return (
        <React.Fragment>
          <Card className={classes.filterContainer}>
            <Button
              classes={{ root: classes.buttonContainer }}
              onClick={() =>
                this.setState({ showFilterScreen: !showFilterScreen })
              }
            >
              <FilterIcon className={classes.icon} />
            </Button>
          </Card>
          <FilterScreen show={showFilterScreen} />
        </React.Fragment>
      );
    }
  }
);
