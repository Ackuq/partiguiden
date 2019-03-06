import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const footerStyles = theme => ({
  root: {
    padding: "1.5rem 0",
    color: theme.palette.primary.contrastText,
    background: theme.palette.primary.main,
    boxShadow: "0 -1px 3px rgba(34, 25, 25, 0.4)",
    "& a": {
      color: "inherit"
    },
    "& a:hover": {
      color: theme.palette.secondary.contrastText
    }
  }
});

export default withStyles(footerStyles)(
  class extends React.Component {
    render() {
      return (
        <footer className={this.props.classes.root}>
          <Grid
            direction="column"
            justify="center"
            container
            className="text-center"
          >
            <Grid item>
              <span>© Axel Pettersson 2019</span>
            </Grid>
            <Grid item>
              <span>
                <a href="mailto:contact@partiguiden.nu">
                  contact@partiguiden.nu
                </a>
              </span>
            </Grid>
          </Grid>
        </footer>
      );
    }
  }
);
