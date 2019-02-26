import React from "react";
import App, { Container } from "next/app";

import Head from "next/head";

import { loadFirebase } from "../lib/db.js";

/* Header and footer components*/
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    const { Component, pageProps, result } = this.props;

    return (
      <Container>
        <Header searchData={result} />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
      </Container>
    );
  }
}
