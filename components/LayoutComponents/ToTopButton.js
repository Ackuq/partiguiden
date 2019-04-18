import ScrollUp from "react-scroll-up";

/* Material ui */
import { withStyles } from "@material-ui/core/styles";
import ArrowUpRounded from "@material-ui/icons/ArrowUpwardRounded";
import ButtonBase from "@material-ui/core/ButtonBase";

const arrowStyles = theme => ({
  arrow: {
    fontSize: "3.5rem",
    color: theme.palette.primary.dark
  },
  circleButton: {
    borderRadius: "2rem"
  }
});

export default withStyles(arrowStyles)(
  class ToTopButton extends React.Component {
    render() {
      return (
        <ScrollUp showUnder={500} style={{ bottom: 15, right: "5%" }}>
          <ButtonBase classes={{ root: this.props.classes.circleButton }}>
            <ArrowUpRounded classes={{ root: this.props.classes.arrow }} />
          </ButtonBase>
        </ScrollUp>
      );
    }
  }
);
