/* Custom css */
import "../styles/Styles.scss";

/* Next js and React*/
import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";

/* For server side css */
import { MuiThemeProvider } from "@material-ui/core/styles";
import JssProvider from "react-jss/lib/JssProvider";
import getPageContext from "../lib/getPageContext";

/* Header and footer components*/
import Header from "../components/Header";
import Footer from "../components/Footer";

/* Scroll up button */
import ToTopButton from "../components/ToTopButton";

export default class MyApp extends App {
  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  pageContext = null;

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, result } = this.props;
    return (
      <Container>
        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          <MuiThemeProvider
            theme={this.pageContext.theme}
            sheetsManager={this.pageContext.sheetsManager}
          >
            <Header />
            <main>
              <Component pageContext={this.pageContext} {...pageProps} />
            </main>
            <Footer />
            <ToTopButton />
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}
