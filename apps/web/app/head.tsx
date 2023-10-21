import Script from "next/script";

import { ADSENSE_CLIENT_ID } from "@lib/constants";
import * as gtag from "@lib/gtag";

export default function Head() {
  return (
    <head>
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
