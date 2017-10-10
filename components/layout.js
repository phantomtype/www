import React from 'react'
import Head from 'next/head'

import style from 'styles/main.scss'


export default (props) => (
  <div>
    <Head>
      <title>{props.title}</title>
      <meta charSet='utf-8'/>
      <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
      <style dangerouslySetInnerHTML={{__html: style}}></style>
    </Head>
    {props.children}
  </div>
)