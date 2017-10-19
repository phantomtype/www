import React from 'react'
import 'isomorphic-fetch'

import Layout from '../components/layout'
import Logomark from '../resouces/images/logomark-white.svg'

const photosA = (photos) => (
  photos.photos.map((p, i) =>
      <div className="mdc-layout-grid__inner">
    <div className="mdc-layout-grid__cell mdc-layout-grid__cell--span-4">
      <img className="tmb" src={"https://storage.googleapis.com/phantomtype-180814.appspot.com/" + p.name} />
    </div>
        <div className="mdc-layout-grid__cell">
          <p>X-Pro2</p>
        </div>
        <style jsx>{`
      img.tmb {
        width: 100%;
        right: 0;
      }
    `}</style>
    </div>
  )
)

const Index = ({ photos }) => (
  <Layout title="PHANTOM TYPE">
    <section className="splash">
        <img className="splash"
             src="https://storage.googleapis.com/phantomtype-180814.appspot.com/splash/splash-1.jpg"/>
      <h1>PHANTOM TYPE <Logomark/></h1>
    </section>
    <section>
      <div className="mdc-layout-grid mdc-layout-grid--fixed-column-width mdc-layout-grid--align-right">
          {photosA(photos)}
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
    `}</style>
  </Layout>
)

Index.getInitialProps = async ({ req }) => {
  const baseUrl = "https://phantomtype.com"
  // const baseUrl = "http://localhost:8080"
  const res = await fetch(baseUrl + "/hello")
  const json = await res.json()
  console.log(json)
  return { photos: json }
}

export default Index
