import Head from "next/head";
import React from "react";

export default (props) => (
  <div>
    <Head>
      <title>{props.title}</title>
      <meta charSet='utf-8'/>
      <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" />
      <link rel="stylesheet" href="http://fonts.googleapis.com/earlyaccess/notosansjp.css"/>
    </Head>
    {props.children}
    <footer>(C) PHANTOM TYPE.   <a href="https://twitter.com/phantomtype" rel="noopener noreferrer" target="_blank">Contact us</a></footer>
    <style jsx global>{`
      body {
        font-family: 'Noto Sans JP', Helvetica, sans-serif;
        font-size: 100%;
        background: #000;
      }
      svg.logo {
        width: 25vw;
      }
      footer {
        text-align: center;
        margin: 50px 0;
      }
    `}
    </style>
  </div>
);