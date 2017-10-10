import React from 'react'

import Layout from '../components/layout'

export default () => (
  <Layout title="PHANTOM TYPE">
    <section>
      <div className="mdc-layout-grid">
        <div className="mdc-layout-grid__inner">
          <div className="mdc-layout-grid__cell">
            <div className="mdc-card card__big-image">
              <section className="mdc-card__media shimogamo"></section>
              <section className="mdc-card__primary">
                <h1 className="mdc-card__title mdc-card__title--large">Shimogamo</h1>
                <h2 className="mdc-card__subtitle">Kyoto</h2>
              </section>
            </div>
          </div>
          <div className="mdc-layout-grid__cell">
            <div className="mdc-card">
              <section className="mdc-card__media shimogamo2"></section>
              <section className="mdc-card__primary">
                <h1 className="mdc-card__title mdc-card__title--large">Shimogamo</h1>
                <h2 className="mdc-card__subtitle">Kyoto</h2>
              </section>
            </div>
          </div>
          <div className="mdc-layout-grid__cell">
            <div className="mdc-card">
              <section className="mdc-card__media kitano"></section>
              <section className="mdc-card__primary">
                <h1 className="mdc-card__title mdc-card__title--large">Nijo</h1>
                <h2 className="mdc-card__subtitle">Kyoto</h2>
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>
    <style jsx>{`
      h1 {
        text-align: center;
      }
      .mdc-card {
        width: 380px;
      }
      .shimogamo {
        background-image: url("https://storage.googleapis.com/phantomtype-180814.appspot.com/photos/kyoto/DSCF8041_tmb.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        height: 220px;
      }
      .shimogamo2 {
        background-image: url("https://storage.googleapis.com/phantomtype-180814.appspot.com/photos/kyoto/DSCF8084_tmb.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        height: 220px;
      }
      .kitano {
        background-image: url("https://storage.googleapis.com/phantomtype-180814.appspot.com/photos/kyoto/DSCF8269_tmb.jpg");
        background-size: cover;
        background-repeat: no-repeat;
        height: 220px;
      }
    `}</style>
  </Layout>
)
