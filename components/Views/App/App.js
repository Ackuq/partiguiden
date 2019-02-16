import React from 'react';
import App, { Container } from 'next/app';

import { MuiThemeProvider } from '@material-ui/core/styles';
import JssProvider from 'react-jss/lib/JssProvider';
import ReactGA from 'react-ga';
import getPageContext from '../../../lib/getPageContext';

import { Footer, Header, ToTopButton } from './components';

import { StateProvider } from '../../../lib/stateProvider';
import { initialState, reducer } from '../../../lib/store';

import '../../../styles/Styles.scss';

const initReactGA = () => {
  ReactGA.initialize('UA-111642551-2');
  ReactGA.pageview(window.location.pathname);
};

class MyApp extends App {
  pageContext = null;

  constructor(props) {
    super(props);
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    initReactGA();
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
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
            <StateProvider initialState={initialState} reducer={reducer}>
              <Header />
              <main>
                <Component pageContext={this.pageContext} {...pageProps} />
              </main>
              <Footer />
              <ToTopButton />
            </StateProvider>
          </MuiThemeProvider>
        </JssProvider>
      </Container>
    );
  }
}

export default MyApp;
