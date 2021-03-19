import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useMediaQuery } from '@material-ui/core';

import Head from 'next/head';
import { useRouter } from 'next/router';

import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import ToTopButton from '../src/components/ToTopButton';
import CookieBanner from '../src/components/CookieBanner';

import getTheme from '../src/lib/theme';
import { init } from '../src/utils/sentry';
import * as gtag from '../src/utils/gtag';

init();

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const [darkModeState, setDarkModeState] = useState<boolean>();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() => {
    if (darkModeState !== undefined) {
      return getTheme(darkModeState);
    } else {
      return getTheme(prefersDarkMode);
    }
  }, [prefersDarkMode, darkModeState]);

  const toggleDarkMode = useCallback(() => {
    setDarkModeState((prevValue) => {
      const newValue = prevValue !== undefined ? !prevValue : !prefersDarkMode;
      localStorage.setItem('prefersDarkMode', newValue.toString());
      return newValue;
    });
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      console.log(window.localStorage);
    }
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      const stored = localStorage.getItem('prefersDarkMode');
      if (stored === 'false' || stored === 'true') {
        setDarkModeState(stored === 'true');
      }
    }
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CssBaseline />
      <Header toggleDarkMode={toggleDarkMode} />
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
