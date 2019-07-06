import axios from 'axios'
import path from 'path'
import React from "react";
// import { Post } from './types'

// Typescript support in static.config.js is not yet supported, but is coming in a future update!

export default {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  getRoutes: async () => {
    const { data: photos } = await axios.get( 'https://phantomtype.com/photo' )
    console.log(photos)
    return [
      {
        path: '/',
        getData: () => ({ photos }),
      }
    ]
  },
  Document: ({ Html, Head, Body, children, siteDate, renderMeta }) => (
    <Html>
      <Head>
      <title>PHANTOM TYPE</title>
      <meta charSet='utf-8'/>
      <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/7.0.0/normalize.min.css" />
      <link rel="stylesheet" href="http://fonts.googleapis.com/earlyaccess/notosansjp.css"/>
      </Head>
      <Body>{children}</Body>
    </Html>
  ),
  plugins: [
    'react-static-plugin-typescript',
    [
      require.resolve('react-static-plugin-source-filesystem'),
      {
        location: path.resolve('./src/pages'),
      },
    ],
    require.resolve('react-static-plugin-reach-router'),
    require.resolve('react-static-plugin-sitemap'),
  ],
}
