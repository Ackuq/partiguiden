import React from "react";
import App, { Container } from "next/app";

import { loadFirebase } from "../lib/db.js";
import Header from "../components/Header";
import Meta from "../components/Meta";
import Footer from "../components/Footer";

class Layout extends React.Component {
  static async getInitialProps(ctx) {
    console.log(ctx);
    let firebase = await loadFirebase();
    let result = await new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("Pages")
        .get()
        .then(snapshot => {
          let data = [];
          snapshot.forEach(doc => {
            data.push(
              Object.assign({
                id: doc.id,
                name: doc.data().name
              })
            );
          });
          resolve(data);
        })
        .catch(error => {
          reject([]);
        });
    });
    return { data: result };
  }

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
    let result = await new Promise((resolve, reject) => {
      firebase
        .firestore()
        .collection("Pages")
        .get()
        .then(snapshot => {
          let data = [];
          snapshot.forEach(doc => {
            data.push(
              Object.assign({
                id: doc.id,
                name: doc.data().name
              })
            );
          });
          resolve(data);
        })
        .catch(error => {
          reject([]);
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
