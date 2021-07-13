import { useEffect, useMemo, useState } from 'react';

import { AppProps } from 'next/app';
import Head from 'next/head';
import Script from 'next/script';
import { useRouter } from 'next/router';

import { useMediaQuery, CssBaseline } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { CacheProvider, css, ThemeProvider as EmotionThemeProvider } from '@emotion/react';

import createCache, { EmotionCache } from '@emotion/cache';
import Footer from '../src/components/Footer';
import Header from '../src/components/Header';
import ToTopButton from '../src/components/ToTopButton';
import CookieBanner from '../src/components/CookieBanner';

import getTheme from '../src/lib/theme';
import * as gtag from '../src/utils/gtag';

const browserCache = createCache({ key: 'css' });
browserCache.compat = true;

const DARK_MODE_KEY = 'prefersDarkMode';

const getInitialDarkMode = (prefersDarkMode: boolean): boolean => {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(DARK_MODE_KEY);
    // If we got a stored value, let it override the browser preference
    if (stored !== null) {
      return stored === 'true';
    }
  }
  // If no stored value, let the initial value be the browser preference
  return prefersDarkMode;
};

const setStoredDarkModeValue = (value: boolean) => {
  localStorage.setItem(DARK_MODE_KEY, value.toString());
};

function MyApp({ Component, pageProps, cache }: AppProps & { cache: EmotionCache }): JSX.Element {
  const router = useRouter();
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [darkModeState, setDarkModeState] = useState(prefersDarkMode);

  const theme = useMemo(() => {
    return getTheme(darkModeState);
  }, [darkModeState]);

  useEffect(() => {
    /* In case the server and client has different opinions on which mode to use */
    setDarkModeState(getInitialDarkMode(prefersDarkMode));
  }, [prefersDarkMode]);

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
    <CacheProvider value={cache ?? browserCache}>
      <ThemeProvider theme={theme}>
        <EmotionThemeProvider theme={theme}>
          {process.env.NODE_ENV === 'production' && (
            <>
              {/* Google Ads */}
              <Script
                async
                strategy="afterInteractive"
                id="ads"
                src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
              />
              {/* Global site tag (gtag.js) - Google Analytics  */}
              <Script
                async
                strategy="afterInteractive"
                id="analytics"
                src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
              />
              <Script
                dangerouslySetInnerHTML={{
                  __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', '${gtag.GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
            `,
                }}
              />
            </>
          )}
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
          </Head>
          <CssBaseline />
          <Header
            toggleDarkMode={() => {
              setDarkModeState((prevValue) => {
                const newValue = !prevValue;
                setStoredDarkModeValue(newValue);
                return newValue;
              });
            }}
          />
          <main
            css={css`
              margin-bottom: 1rem;
              display: flex;
              flex-direction: column;
              flex-grow: 1;
            `}
          >
            <Component {...pageProps} />
          </main>
          <Footer />
          <ToTopButton />
          <CookieBanner />
        </EmotionThemeProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
