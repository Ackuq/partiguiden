import "../styles/Styles.scss";
import React from "react";
import App, { Container } from "next/app";

import Head from "next/head";

import { loadFirebase } from "../lib/db.js";

/* For server side css */
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from "react-jss/lib/JssProvider";
import getPageContext from "../lib/getPageContext";

/* Header and footer components*/
import Header from "../components/Header";
import Footer from "../components/Footer";

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

  static async getInitialProps({ Component, router, ctx }) {
    let firebase = await loadFirebase();

    let result = await new Promise(resolve => {
      firebase
        .firestore()
        .collection("Pages")
        .onSnapshot({ includeMetadataChanges: true }, function(snapshot) {
          var data = [];
          snapshot.docChanges().forEach(function(change) {
            data.push(
              Object.assign({
                id: change.doc.id,
                name: change.doc.data().name
              })
            );
          });
          resolve(data);
        });
    });

    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps, result };
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
            <CssBaseline />

            <Header searchData={result} />
            <main>
              <Component pageContext={this.pageContext} {...pageProps} />
            </main>
            <Footer />
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}
