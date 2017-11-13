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
    const baseUrl = "https://phantomtype.com";
    // const baseUrl = "http://localhost:8080"
    const res = await fetch(baseUrl + "/hello");
    const json = await res.json();
    console.log(baseUrl);
    console.log(json);
    return {photos: json};
  }

  scroll() {
    var scroll = Scroll.animateScroll;
    scroll.scrollTo(screen.height, {duration: 500, delay: 100, smooth: true});
  }

  render () {
    return (
      <Layout title="PHANTOM TYPE">
        <section className="splash">
          <img className="splash"
               src="https://storage.googleapis.com/phantomtype-180814.appspot.com/splash/splash-1.jpg"/>
          <div className="title">
            <Logomark className="logo" />
            <h1>PHANTOM TYPE </h1>
          </div>
          <button onClick={this.scroll} className="arrow">▽</button>
        </section>
        <section className="photo-container">
          <h2>KYOTO - 京都</h2>
          <p className="desc">THE HISTORY OF JAPAN.</p>
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
      .title {
        display: inline-flex;
        flex-direction: column;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%, -60%, 0);
        justify-content: center;
        align-items: center;
      }
      h1 {
        margin: 1vh 0;
        color: #fff;
        font-size: 5.52768vw;
        font-weight: 200;
      }
      .arrow {
        position: absolute;
        font-size: 4vw;
        bottom: 10vh;
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
      .photo-container {
        margin: 150px 0;
      }
      h2 {
        text-align: center;
        font-size: 4vw;
      }
      .desc {
        text-align: center;
        font-size: 3.5vw;
        color: #999;
      }
    `}</style>
      </Layout>
    );
  }
}

export default Index;