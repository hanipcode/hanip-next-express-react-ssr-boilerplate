import React from 'react';
import Head from 'next/head';
import { Helmet } from 'react-helmet';
import Link from 'next/link';

export default ({ children, title = 'Your Next Web' }) => (
  <div>
    <Head />
    {children}

    <Helmet>
      <script>
        {`
        $(document).ready(function() {
          M.AutoInit();
          $(".sidenav li a").click(function() {
            $(".sidenav").sidenav("close");
          });
        });
      `}
      </script>
    </Helmet>
  </div>
);
