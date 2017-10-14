import React from 'react'
import 'isomorphic-fetch'

import Layout from '../components/layout'
import Logomark from '../resouces/images/logomark-white.svg'

const photosA = (photos) => (
  photos.photos.map((p) =>
    <div key={p.size} className="mdc-layout-grid__cell">
      <img className="tmb" src={"https://storage.googleapis.com/phantomtype-180814.appspot.com/" + p.name} />
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
      <div className="mdc-layout-grid">
        <div className="mdc-layout-grid__inner">
          {photosA(photos)}
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
      img.tmb {
        max-width: 92vw;
      }
    `}</style>
  </Layout>
)

Index.getInitialProps = async ({ req }) => {
  // const baseUrl = `${req.protocol}://${req.get('Host')}`;
  console.log("hello")
  const baseUrl = "http://localhost:8080"
  const res = await fetch(baseUrl + "/hello")
  const json = await res.json()
  console.log(json)
  return { photos: json }
}

export default Index
