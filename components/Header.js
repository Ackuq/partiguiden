import '../styles/Navigation.scss';
import '../styles/Roboto.scss';
import 'bootstrap/dist/css/bootstrap.css';

import Meta from './Meta'
import Head from 'next/head';
import Container from 'react-bootstrap/Container';
import Link from 'next/link';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


const header = () => (
  <Navbar fixed="top" expand="md">
    <Meta />
    <Container>
      <Navbar.Brand href="/">React bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link href="/">
            <a className="custom-nav-link">Hem</a>
          </Link>
          <Link href="/om-oss">
            <a className="custom-nav-link">Om oss</a>
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)

export default header;
