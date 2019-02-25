import "../styles/Styles.scss";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "../lib/routes";
import React from "react";

// Components
import NavLink from "./NavLink";
import SearchBar from "./SearchBar";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.setNavExpanded = this.setNavExpanded.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.state = {
      navExpanded: false
    };
  }
  setNavExpanded(expanded) {
    this.setState({ navExpanded: expanded });
  }
  closeNav() {
    this.setState({ navExpanded: false });
  }
  render() {
    return (
      <Navbar
        fixed="top"
        expand="md"
        expanded={this.state.navExpanded}
        onToggle={this.setNavExpanded}
      >
        <div className="container flex-wrap">
          <div className="navbar-header">
            <Link route="/">
              <a className="navbar-brand text-light">
                <span className="font-weight-normal">Partiguiden</span>
                <span className="font-weight-light">.nu 2.0</span>
              </a>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <SearchBar
              closeNav={this.closeNav}
              id="desktop"
              searchData={this.props.searchData}
            />
          </div>
          <Navbar.Collapse id="basic-navbar-nav">
            <SearchBar
              closeNav={this.closeNav}
              id="phone"
              searchData={this.props.searchData}
            />
            <NavLink closeNav={this.closeNav} />
          </Navbar.Collapse>
        </div>
      </Navbar>
    );
  }
}

export default Header;
