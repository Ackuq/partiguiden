import React from 'react';
import App, { Container } from 'next/app';
import ReactGA from 'react-ga';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Footer, Header, ToTopButton, CookieBanner } from '../src/containers/App';
import { StateProvider } from '../src/lib/stateProvider';
import { initialState, reducer } from '../src/lib/store';
import theme from '../src/lib/theme';

const initReactGA = () => {
  ReactGA.initialize('UA-111642551-2');
  ReactGA.pageview(window.location.pathname);
};

class MyApp extends App {
  componentDidMount() {
    initReactGA();
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <ThemeProvider theme={theme}>
          <StateProvider initialState={initialState} reducer={reducer}>
            <CssBaseline />
            <Header />
            <main
              style={{
                marginBottom: '1rem',
                display: 'flex',
                flexDirection: 'column',
                flexGrow: 1
              }}
            >
              <Component pageContext={this.pageContext} {...pageProps} />
            </main>
            <Footer />
            <ToTopButton />
            <CookieBanner />
          </StateProvider>
        </ThemeProvider>
      </Container>
    );
  }
}

export default MyApp;
