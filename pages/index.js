import React from 'react'
import 'isomorphic-fetch'

import Layout from '../components/layout'
import Logomark from '../resouces/images/logomark-white.svg'

const photosA = (photos) => (
  photos.photos.map((p, i) =>
    <div key={i} className={`photo-container align-${i % 2}`}>
      <div className="photo">
        <img className="tmb" src={"https://storage.googleapis.com/phantomtype-180814.appspot.com/" + p.name}/>
      </div>
      <div className="exif">
        <p>X-Pro2</p>
      </div>
      <style jsx>{`
      div.photo-container {
        display: flex;
        margin: 90px 0px;
      }
      .align-0 {
        justify-content: flex-start;
      }
      .align-1 {
        justify-content: flex-end;
      }
      .align-1 .photo {
        order: 1;
      }
      .exif {
        margin: 0 15px;
      }
      img.tmb {
        width: 100%;
      }
    `}</style>
    </div>
  )
)

const Index = ({photos}) => (
  <Layout title="PHANTOM TYPE">
    <section className="splash">
      <img className="splash"
           src="https://storage.googleapis.com/phantomtype-180814.appspot.com/splash/splash-1.jpg"/>
      <h1>PHANTOM TYPE <Logomark/></h1>
    </section>
    <section>
      <div className="photos">
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
      .photos {
        margin: 0 50px;
      }
    `}</style>
  </Layout>
)

Index.getInitialProps = async ({req}) => {
  // const baseUrl = "https://phantomtype.com"
  const baseUrl = "http://localhost:8080"
  const res = await fetch(baseUrl + "/hello")
  const json = await res.json()
  console.log(json)
  return {photos: json}
}

export default Index
