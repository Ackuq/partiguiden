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
import Header from "../components/LayoutComponents/Header";
import Footer from "../components/LayoutComponents/Footer";
/* Google analytics */
import ReactGA from "react-ga";

/* Scroll up button */
import ToTopButton from "../components/LayoutComponents/ToTopButton";

import withReduxStore from "../lib/with-redux-store";
import { Provider } from "react-redux";

class MyApp extends App {
  pageContext = null;

  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  initReactGA() {
    ReactGA.initialize("UA-111642551-2");
    ReactGA.pageview(window.location.pathname);
  }

  componentDidMount() {
    this.initReactGA();
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Provider store={reduxStore}>
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
        </Provider>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
