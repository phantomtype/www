import React from 'react'
import Head from 'next/head'

import style from 'styles/main.scss'

import Logomark from '../resouces/images/logomark.svg'

export default (props) => (
  <div>
    <Head>
      <title>{props.title}</title>
      <meta charSet='utf-8'/>
      <meta name='viewport' content='initial-scale=1.0, width=device-width'/>
      <style dangerouslySetInnerHTML={{__html: style}}></style>
    </Head>
    <header className="mdc-toolbar">
      <div className="mdc-toolbar__row">
        <section className="mdc-toolbar__section mdc-toolbar__section--align-center">
          <Logomark style={{height: "60px"}} />
          <span className="mdc-toolbar__title">PHANTOM TYPE</span>
        </section>
      </div>
    </header>
    {props.children}
  </div>
)