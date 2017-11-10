import Head from "next/head";
import React from "react";

export default (props) => (
  <div>
    <Head>
      <title>{props.title}</title>
      <meta charSet='utf-8'/>
      <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" />
    </Head>
    {props.children}
  </div>
)