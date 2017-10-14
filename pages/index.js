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
    <section>
      <div className="mdc-layout-grid">
        <div className="mdc-layout-grid__inner">
          <div className="mdc-layout-grid__cell">
            <img className="tmb" src="https://storage.googleapis.com/phantomtype-180814.appspot.com/photos/kyoto/DSCF0369_tmb.jpg" />
          </div>
          <div className="mdc-layout-grid__cell">
            <img className="tmb" src="https://storage.googleapis.com/phantomtype-180814.appspot.com/photos/kyoto/DSCF0966_tmb.jpg" />
          </div>
          <div className="mdc-layout-grid__cell">
            <img className="tmb" src="https://storage.googleapis.com/phantomtype-180814.appspot.com/photos/kyoto/DSCF1066_tmb.jpg" />
          </div>
          <div className="mdc-layout-grid__cell">
            <img className="tmb" src="https://storage.googleapis.com/phantomtype-180814.appspot.com/photos/kyoto/DSCF1183_tmb.jpg" />
          </div>
          <div className="mdc-layout-grid__cell">
            <img className="tmb" src="https://storage.googleapis.com/phantomtype-180814.appspot.com/photos/kyoto/DSCF1205_tmb.jpg" />
          </div>
          <div className="mdc-layout-grid__cell">
            <img className="tmb" src="https://storage.googleapis.com/phantomtype-180814.appspot.com/photos/kyoto/DSCF1225_tmb.jpg" />
          </div>
        </div>
      </div>
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
        position: absolute;
        top: 50%;
        left: 50%;
        color: #fff;
        font-size: 6.52768vw;
      }
      .soon {
        font-size: 1.5vw;
      }
      img.tmb {
        max-width: 92vw;
      }
    `}</style>
  </Layout>
)
