import Script from "next/script";
import * as gtag from "../src/lib/gtag";
import { ADSENSE_CLIENT_ID } from "../src/lib/adsense";

export default function Head() {
  return (
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/icons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        href="/static/icons/favicon-32x32.png"
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href="/static/icons/favicon-16x16.png"
        sizes="16x16"
      />
      <link
        rel="mask-icon"
        href="/static/icons/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <link rel="manifest" href="/manifest.webmanifest" />

      <meta property="og:image" content="/static/images/partiguiden_logo.png" />
      <meta
        name="theme-color"
        content="#1e293b"
        media="(prefers-color-scheme: light)"
      />
      <meta
        name="theme-color"
        content="#1e293b"
        media="(prefers-color-scheme: dark)"
      />
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
      {process.env.NEXT_PUBLIC_VERCEL_ENV !== "production" && (
        <>
          {/* Disable indexing of all non-production sites */}
          <meta name="robots" content="noindex" />
        </>
      )}
      <Script
        id="twttr-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.twttr = (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0],
                t = window.twttr || {};
              if (d.getElementById(id)) return t;
              js = d.createElement(s);
              js.id = id;
              js.src = "https://platform.twitter.com/widgets.js";
              fjs.parentNode.insertBefore(js, fjs);
            
              t._e = [];
              t.ready = function(f) {
                t._e.push(f);
              };
            
              return t;
            }(document, "script", "twitter-wjs"));
          `,
        }}
      />
      {process.env.NODE_ENV === "production" && (
        <>
          {/* Google Ads */}
          <Script
            id="ads-init"
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
          />
          {/* Global site tag (gtag.js) - Google Analytics  */}
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
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
    </head>
  );
}
