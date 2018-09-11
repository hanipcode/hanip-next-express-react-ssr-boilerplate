import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { Helmet } from 'react-helmet';

export default class MyDocument extends Document {
  render() {
    return (
      <div>
        <html lang="en">
          <Head>
            <link
              rel="stylesheet"
              type="text/css"
              href="https://unpkg.com/nprogress@0.2.0/nprogress.css"
            />
            <script src="https://unpkg.com/jquery@3.3.1/dist/jquery.min.js" />

            <link
              rel="stylesheet"
              href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/css/materialize.min.css"
            />

            <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
            <link rel="stylesheet" href="/_next/static/style.css" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Head>
          <body>
            <Main />
            <NextScript />

            <div className="custom-overlay" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0-rc.2/js/materialize.min.js" />
            <Helmet>
              <script>
                {`
        $(document).ready(function() {
          M.AutoInit();
      `}
              </script>
            </Helmet>
          </body>
        </html>
      </div>
    );
  }
}
