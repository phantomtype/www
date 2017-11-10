import React from "react";
import Scroll from "react-scroll";
import "isomorphic-fetch";

import Layout from "../components/layout";
import Logomark from "../resouces/images/logomark-white.svg";

import PhotosA from "../components/photo";

class Photos extends React.Component {
  render() {
    return (
      this.props.photos.photos.map((p, i) => {
        const src = "https://storage.googleapis.com/phantomtype-180814.appspot.com/" + p.name;
        return <PhotosA key={i} photo={p} src={src} align={i % 2} />;
      })
    );
  }
}

class Index extends React.Component {
  static async getInitialProps () {
    // const baseUrl = "https://phantomtype.com"
    const baseUrl = "http://localhost:8080"
    const res = await fetch(baseUrl + "/hello")
    const json = await res.json()
    console.log(baseUrl)
    console.log(json)
    return {photos: json};
  }

  scroll() {
    var scroll = Scroll.animateScroll;
    scroll.scrollTo(500, {duration: 500, delay: 100, smooth: true})
  }

  render () {
    return (
      <Layout title="PHANTOM TYPE">
        <section className="splash">
          <img className="splash"
               src="https://storage.googleapis.com/phantomtype-180814.appspot.com/splash/splash-1.jpg"/>
          <h1>PHANTOM TYPE <Logomark/></h1>
          <button onClick={this.scroll} className="arrow">▽</button>
        </section>
        <section>
          <div className="photos">
            <Photos photos={this.props.photos} />
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
      .arrow {
        position: absolute;
        font-size: 30px;
        bottom: 15vh;
        left: 50%;
        color: #fff;
        text-decoration: none;
        cursor: pointer;
        transform: translate3d(-50%, 0, 0);
      }
      button {
        background-color: initial;
        cursor: pointer;
        border: none;
      }
    `}</style>
      </Layout>
    );
  }
}

export default Index;