import React from "react";
import App, { Container } from "next/app";

import { loadFirebase } from "../lib/db.js";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Meta from "../components/Meta";

class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Meta />
        <header>
          <Header searchData={this.props.searchData} />
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
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Layout searchData={this.props.result}>
          <Component {...pageProps} />
        </Layout>
      </Container>
    );
  }
}
