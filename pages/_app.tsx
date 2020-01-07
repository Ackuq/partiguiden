import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import ReactGA from 'react-ga';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import ToTopButton from '../src/components/ToTopButton';
import CookieBanner from '../src/components/CookieBanner';

import theme from '../src/lib/theme';

const initReactGA = () => {
  ReactGA.initialize('UA-111642551-2');
  ReactGA.pageview(window.location.pathname);
};

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    initReactGA();
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <main
        style={{
          marginBottom: '1rem',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
        }}
      >
        <Component {...pageProps} />
      </main>
      <Footer />
      <ToTopButton />
      <CookieBanner />
    </ThemeProvider>
  );
};

export default App;
