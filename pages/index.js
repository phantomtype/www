import React from 'react'
import 'isomorphic-fetch'

import Layout from '../components/layout'
import Logomark from '../resouces/images/logomark-white.svg'

import PhotosA from '../components/photo'


class Index extends React.Component {
  static async getInitialProps () {
    // const baseUrl = "https://phantomtype.com"
    const baseUrl = "http://localhost:8080"
    const res = await fetch(baseUrl + "/hello")
    const json = await res.json()
    console.log(json)
    return {photos: json}
  }

  render () {
    return (
      <Layout title="PHANTOM TYPE">
        <section className="splash">
          <img className="splash"
               src="https://storage.googleapis.com/phantomtype-180814.appspot.com/splash/splash-1.jpg"/>
          <h1>PHANTOM TYPE <Logomark/></h1>
        </section>
        <section>
          <div className="photos">
            <PhotosA photos={this.props.photos} />
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
  }
}

export default Index