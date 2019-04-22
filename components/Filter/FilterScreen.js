import { withStyles } from "@material-ui/core/styles";
import grey from "@material-ui/core/colors/grey";
import Card from "@material-ui/core/Card";

import FilterCategory from "./FilterCategory";

const filterScreenStyles = theme => ({
  filterScreenContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingTop: "104px",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    overflowY: "scroll",
    maxHeight: "-webkit-fill-available",
    position: "fixed",
    minHeight: "100%",
    maxWidth: "100%",
    minWidth: "50%",
    top: 0,
    right: "-100%",
    background: grey[100],
    transition: "all 0.3s ease-in-out",
    boxShadow:
      "0px 1px 3px 0px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 2px 1px -1px rgba(0,0,0,0.12)"
  },
  showFilterScreen: {
    right: 0
  }
});

export default withStyles(filterScreenStyles)(
  class FilterScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = { show: props.show };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (nextProps.show !== prevState.show) {
        return {
          show: nextProps.show
        };
      } else return null;
    }

    render() {
      const { show } = this.state;
      const { classes } = this.props;
      const showClass = show ? classes.showFilterScreen : "";
      return (
        <div className={`${classes.filterScreenContainer} ${showClass}`}>
          <FilterCategory />
        </div>
      );
    }
  }
);
