/* Custom components */
import { Link } from "../../lib/routes";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";

/* Material UI components */
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";

const headerStyles = theme => ({
  banner: {
    zIndex: "1200",
    backgroundColor: theme.palette.primary.main
  },
  brand: {
    textAlign: "center",
    fontSize: "2rem",
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
    "& a": {
      color: theme.palette.primary.contrastText
    }
  },
  aligner: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  searchBar: {
    display: "flex",
    justifyContent: "center",
    padding: "0.5rem",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      maxWidth: "100%",
      flexBasis: "100%"
    }
  }
});

class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={this.props.classes.banner}
        >
          <Grid item xs={3} className={this.props.classes.brand}>
            <span>
              <Link route="/">
                <a>
                  <strong>Partiguiden</strong>.nu
                </a>
              </Link>
            </span>
          </Grid>
          <Grid item xs={3} className={this.props.classes.aligner} />
          <Grid item xs={3} className={this.props.classes.aligner} />
          <Grid item xs={3} className={this.props.classes.searchBar}>
            <SearchBar id="header" />
          </Grid>
        </Grid>
        <NavLinks />
      </React.Fragment>
    );
  }
}

export default withStyles(headerStyles)(Header);
