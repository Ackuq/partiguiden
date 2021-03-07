import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Head from 'next/head';
import { useRouter } from 'next/router';

import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import ToTopButton from '../src/components/ToTopButton';
import CookieBanner from '../src/components/CookieBanner';

import theme from '../src/lib/theme';
import { init } from '../src/utils/sentry';
import * as gtag from '../src/utils/gtag';

init();

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
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
