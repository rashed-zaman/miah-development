import Document, { Html, Head, Main, NextScript } from "next/document";
import { FB_PIXEL_ID } from '../lib/fpixel'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <meta name="robots" content="max-image-preview:large"/>
          <meta name="viewport" content="height=device-height, 
                      width=device-width, initial-scale=1.0, 
                      minimum-scale=1.0, maximum-scale=1.0, 
                      user-scalable=no, target-densitydpi=device-dpi"/>
          <link
            rel="stylesheet"
            href="/plugins/font-awesome/css/font-awesome.min.css"
          />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Jost:400,500,600,700&amp;display=swap&amp;ver=1621600324"
          />
          <link
            rel="stylesheet"
            href="/plugins/bootstrap4/css/bootstrap.min.css"
          />
          <link
            rel="stylesheet"
            href="/plugins/owl-carousel/assets/owl.carousel.css"
          />
          <link rel="stylesheet" href="/plugins/slick/slick/slick.css" />
          <link
            rel="stylesheet"
            href="/plugins/lightGallery/dist/css/lightgallery.min.css"
          />
          <link
            rel="stylesheet"
            href="/plugins/jquery-bar-rating/dist/themes/fontawesome-stars.css"
          />
          <link
            rel="stylesheet"
            href="/plugins/select2/dist/css/select2.min.css"
          />
          <link
            rel="stylesheet"
            href="/plugins/lightGallery/dist/css/lightgallery.min.css"
          />
          <link rel="stylesheet" href="/plugins/noUiSlider/nouislider.css" />
          <link rel="stylesheet" href="/css/style.css" />
          <link rel="stylesheet" href="/css/home-1.css" />
          <link rel="stylesheet" href="/css/home-7.css" />
          <link rel="stylesheet" href="/css/home-4.css" />
          <noscript>
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
            />
          </noscript>
        </Head>
        <body>
          <Main />
          <NextScript />
          <script
            src="/plugins/jquery.min.js"
            strategy="beforeInteractive"
          ></script>
          <script
            src="/plugins/popper.min.js"
            strategy="beforeInteractive"
          ></script>
          <script
            src="/plugins/bootstrap4/js/bootstrap.min.js"
            strategy="beforeInteractive"
          ></script>
          <script
            src="/plugins/select2/dist/js/select2.full.min.js"
            strategy="beforeInteractive"
          ></script>
          <script
            src="/plugins/owl-carousel/owl.carousel.min.js"
            strategy="beforeInteractive"
          ></script>
          <script
            src="/plugins/jquery-bar-rating/dist/jquery.barrating.min.js"
            strategy="beforeInteractive"
          ></script>
          <script
            src="/plugins/lightGallery/dist/js/lightgallery-all.min.js"
            strategy="beforeInteractive"
          ></script>
          <script
            src="/plugins/slick/slick/slick.min.js"
            strategy="beforeInteractive"
          ></script>
          <script
            src="/plugins/noUiSlider/nouislider.min.js"
            strategy="beforeInteractive"
          ></script>

          {/* <script src="https://www.googletagmanager.com/gtag/js?id=G-5J2Z1D8SVS"></script>

          <script id="google-analytics" strategy="afterInteractive">
            {`
             window.dataLayer = window.dataLayer || [];
             function gtag(){dataLayer.push(arguments);}
             gtag('js', new Date());
           
             gtag('config', 'G-5J2Z1D8SVS');
            `}
          </script>

          <script id="facebook-pixel" strategy="afterInteractive">
            {`
             !function(f,b,e,v,n,t,s)
             {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
             n.callMethod.apply(n,arguments):n.queue.push(arguments)};
             if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
             n.queue=[];t=b.createElement(e);t.async=!0;
             t.src=v;s=b.getElementsByTagName(e)[0];
             s.parentNode.insertBefore(t,s)}(window, document,'script',
             'https://connect.facebook.net/en_US/fbevents.js');
             fbq('init', '330840281572775');
             fbq('track', 'PageView');
            `}
          </script> */}

          <script src="js/main.js" strategy="beforeInteractive"></script>

          <script id="fb-chat-plugin" strategy="afterInteractive">
            {`
              window.fbAsyncInit = function() {
                FB.init({
                  xfbml            : true,
                  version          : 'v9.0'
                });
              };

              (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
                fjs.parentNode.insertBefore(js, fjs);
              }(document, 'script', 'facebook-jssdk'));
            `}
          </script>

          {/* ================= this is noscript part of tag manager ============= */}
          {/* <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.facebook.com/tr?id=3659681794077514&ev=PageView&noscript=1"  height="1" width="1" style="display:none" visibility: hidden;" />`,
            }}
          /> */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
