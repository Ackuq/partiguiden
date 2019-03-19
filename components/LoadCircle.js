import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const circleStyles = theme => ({
  circleContainer: {
    display: "flex",
    justifyContent: "center",
    height: "50vh",
    alignItems: "center",
    flexDirection: "column"
  }
});

export default withStyles(circleStyles)(
  class LoadCircle extends React.Component {
    render() {
      return (
        <div className={this.props.classes.circleContainer}>
          <CircularProgress size={100} />
        </div>
      );
    }
  }
);
