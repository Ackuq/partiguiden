import "../styles/Styles.scss";

import Head from "next/head";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import React from "react";
import NavLink from "./NavLink";

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
        <Container>
          <Link href="/">
            <a className="navbar-brand text-light">
              <span className="font-weight-normal">Partiguiden</span>
              <span className="font-weight-light">.nu 2.0</span>
            </a>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <NavLink closeNav={this.closeNav} />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
