import "../styles/Styles.scss";

import { Link } from "../lib/routes";
import SearchBar from "./SearchBar";
import NavLinks from "./NavLinks";

class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div className="banner">
          <Link route="/">
            <a>
              <span className="brand">Partiguiden.nu</span>
            </a>
          </Link>
          <SearchBar id="header" searchData={this.props.searchData} />
        </div>
        <NavLinks />
      </React.Fragment>
    );
  }
}

export default Header;
