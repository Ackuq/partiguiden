import ButtonBase from '@material-ui/core/ButtonBase';
import '../styles/Styles.scss';

import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Link from 'next/link';
import React from 'react';

function getPages () {
  return [
    { id: '/', title: 'Hem'},
    { id: '/partiernas-standpunkter', title: 'Partiernas Ståndpunkter'},
    { id: '/om-oss', title: 'Om oss'},
  ]
}



class Header extends React.Component {
  constructor(props){
    super(props);
    this.setNavExpanded = this.setNavExpanded.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.state = {
      navExpanded: false
    }
  }
  setNavExpanded(expanded) {
   this.setState({ navExpanded: expanded });
  }
  closeNav() {
    this.setState({ navExpanded: false})
  }
  render() {
    return (
      <Navbar fixed="top" expand="md"
        expanded={this.state.navExpanded} onToggle={this.setNavExpanded}>
        <Container>
          <Link href="/">
            <a className="navbar-brand text-light"><span className="font-weight-normal">Partiguiden</span><span className="font-weight-light">.nu 2.0</span></a>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="mr-auto"  >
              {getPages().map((page) => (
                <ButtonBase key={`${page.id}`} onClick={this.closeNav} className="menu-btn btn-secondary">
                  <Link href={`${page.id}`}>
                    <a className="custom-nav-link">{page.title}</a>
                  </Link>
                </ButtonBase>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
  }
}

export default Header;
