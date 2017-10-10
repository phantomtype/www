import React from 'react'

import Layout from '../components/layout'
import Logomark from '../resouces/images/logomark-white.svg'

export default () => (
  <Layout title="PHANTOM TYPE">
    <section className="splash">
        <img className="splash"
             src="https://storage.googleapis.com/phantomtype-180814.appspot.com/photos/kyoto/DSCF8041.jpg"/>
      <h1>PHANTOM TYPE <Logomark/><span className="soon">coming soon...</span></h1>
    </section>
    <style jsx>{`
      section.splash {
        width: 100%;
        height: 100vh;
      }
      img.splash {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      h1 {
        position: fixed;
        top: 50%;
        left: 50%;
        color: #fff;
        font-size: 6.52768vw;
      }
      .soon {
        font-size: 1.5vw;
      }
    `}</style>
  </Layout>
)
