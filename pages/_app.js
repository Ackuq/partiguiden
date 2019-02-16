import React from "react";
import App, { Container } from "next/app";

import Header from "../components/Header";
import Meta from "../components/Meta";
import Footer from "../components/Footer";

class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Meta />
        <header>
          <Header />
        </header>
        <main>{this.props.children}</main>
        <footer className="py-4 mt-3 text-light">
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
}

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}
