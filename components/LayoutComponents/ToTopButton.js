import ScrollUp from "react-scroll-up";

/* Material ui */
import { withStyles } from "@material-ui/core/styles";
import ArrowUpRounded from "@material-ui/icons/ArrowUpwardRounded";

const arrowStyles = theme => ({
  arrow: {
    fontSize: "3.5rem",
    color: theme.palette.primary.dark
  }
});

export default withStyles(arrowStyles)(
  class ToTopButton extends React.Component {
    render() {
      return (
        <ScrollUp showUnder={500} style={{ bottom: 15, right: "5%" }}>
          <ArrowUpRounded classes={{ root: this.props.classes.arrow }} />
        </ScrollUp>
      );
    }
  }
);
