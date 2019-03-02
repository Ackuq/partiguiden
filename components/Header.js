import { Link } from "../lib/routes";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";
import Grid from "@material-ui/core/Grid";

class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Grid container justify="center" alignItems="center" className="banner">
          <Grid item xs={4} className="text-center">
            <span>
              <Link route="/">
                <a className="brand text-light">Partiguiden.nu</a>
              </Link>
            </span>
          </Grid>
          <Grid item xs={4} className="aligner" />
          <Grid item xs={4} className="search-bar">
            <SearchBar id="header" searchData={this.props.searchData} />
          </Grid>
        </Grid>
        <NavLinks />
      </React.Fragment>
    );
  }
}

export default Header;
