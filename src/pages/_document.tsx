import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

import createCache, { EmotionCache } from '@emotion/cache';

import createEmotionServer from '@emotion/server/create-instance';

import { FB_PIXEL_ID } from '../lib/fbPixel';

const getCache = (): EmotionCache => {
  const cache = createCache({ key: 'css', prepend: true });
  cache.compat = true;
  return cache;
};

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="sv" style={{ height: '100%' }}>
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="apple-touch-icon" sizes="180x180" href="/static/icons/apple-touch-icon.png" />
          <link rel="icon" type="image/png" href="/static/icons/favicon-32x32.png" sizes="32x32" />
          <link rel="icon" type="image/png" href="/static/icons/favicon-16x16.png" sizes="16x16" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link rel="mask-icon" href="/static/icons/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="manifest" href="/manifest.webmanifest" />

          <meta property="og:image" content="/static/images/partiguiden_logo.png" />
          <meta name="theme-color" content="#00796B" media="(prefers-color-scheme: light)" />
          <meta name="theme-color" content="#383939" media="(prefers-color-scheme: dark)" />
          <style>
            {`
            #__next {     
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
              -ms-flex-direction: column;
              flex-direction: column;
              min-height: 100%; 
            }
            a:not(:hover) {
              text-decoration: none;
            }
          `}
          </style>
          {process.env.NODE_ENV === 'production' && (
            <>
              {/* Meta Pixel Code  */}
              <noscript>
                {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
                <img
                  height="1"
                  width="1"
                  style={{ display: 'none' }}
                  src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
                />
              </noscript>
            </>
          )}
          {process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' && (
            <>
              {/* Disable indexing of all non-production sites */}
              <meta name="robots" content="noindex" />
            </>
          )}
        </Head>
        <body style={{ height: '100%' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with static-site generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  const originalRenderPage = ctx.renderPage;

  const cache = getCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      // Take precedence over the CacheProvider in our custom _app.js

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line react/display-name
      enhanceApp: (App) => (props) => <App {...props} emotionCache={cache} />,
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);

  const emotionStyleTags = emotionStyles.styles.map(
    (style: { key: React.Key | null | undefined; ids: string[]; css: string }) => (
      <style
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        key={style.key}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    )
  );

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), ...emotionStyleTags],
  };
};

export default MyDocument;
